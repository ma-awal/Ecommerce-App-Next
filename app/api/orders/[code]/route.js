import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET(request, { params }) {
  const { code } = await params;

  await connectDB();
  const order = await Order.findOne({ orderCode: code }).lean();

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ order });
}