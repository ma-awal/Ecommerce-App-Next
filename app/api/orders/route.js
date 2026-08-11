import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

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

    const order = await Order.create({
      orderCode: generateOrderCode(),
      customer,
      items,
      paymentMethod,
      paymentInfo: paymentInfo || {},
      totalAmount,
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error("Order creation failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}