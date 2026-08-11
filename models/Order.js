 import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    colorName: { type: String, required: true },
    size: { type: String, required: true },
    qty: { type: Number, required: true },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    orderCode: { type: String, required: true, unique: true },

    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },

    items: { type: [OrderItemSchema], required: true },

    paymentMethod: {
      type: String,
      enum: ["bkash", "nagad", "cod"],
      required: true,
    },

    paymentInfo: {
      transactionId: { type: String, default: "" },
      senderNumber: { type: String, default: "" },
    },

    totalAmount: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);