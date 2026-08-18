 import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";

function generateOrderCode() {
  return `ORD-${Date.now().toString().slice(-6)}`;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { customer, items, paymentMethod, paymentInfo } = body;

    if (!customer?.name || !customer?.phone || !customer?.address || !customer?.city) {
      return NextResponse.json(
        { error: "Customer details incomplete" },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    if (!["bkash", "nagad", "cod"].includes(paymentMethod)) {
      return NextResponse.json(
        { error: "Invalid payment method" },
        { status: 400 }
      );
    }

    if (
      (paymentMethod === "bkash" || paymentMethod === "nagad") &&
      !paymentInfo?.transactionId
    ) {
      return NextResponse.json(
        { error: "Transaction ID required for bKash/Nagad" },
        { status: 400 }
      );
    }

    const totalAmount = items.reduce((sum, i) => sum + i.price * i.qty, 0);

    await connectDB();

    const session = await mongoose.startSession();
    let createdOrder;

    try {
      await session.withTransaction(async () => {
        for (const item of items) {
          const result = await Product.updateOne(
            {
              slug: item.slug,
              variants: {
                $elemMatch: {
                  color: item.color,
                  size: item.size,
                  stock: { $gte: item.qty },
                },
              },
            },
            {
              $inc: { "variants.$[variant].stock": -item.qty },
            },
            {
              arrayFilters: [
                { "variant.color": item.color, "variant.size": item.size },
              ],
              session,
            }
          );

          if (result.modifiedCount === 0) {
            throw new Error(
              `${item.name} (${item.colorName}, ${item.size}) - stock nai ba proyojoner cheye kom ache`
            );
          }
        }

        const [order] = await Order.create(
          [
            {
              orderCode: generateOrderCode(),
              customer,
              items,
              paymentMethod,
              paymentInfo: paymentInfo || {},
              totalAmount,
            },
          ],
          { session }
        );

        createdOrder = order;
      });
    } finally {
      session.endSession();
    }

    return NextResponse.json({ order: createdOrder }, { status: 201 });
  } catch (error) {
    console.error("Order creation failed:", error);
    const message = error.message?.includes("stock")
      ? error.message
      : "Something went wrong. Please try again.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}