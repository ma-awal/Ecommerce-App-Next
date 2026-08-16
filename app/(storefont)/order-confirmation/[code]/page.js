import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Link from "next/link";
import { notFound } from "next/navigation";

const PAYMENT_LABELS = {
  bkash: "bKash",
  nagad: "Nagad",
  cod: "Cash on Delivery",
};

export default async function OrderConfirmationPage({ params }) {
  const { code } = await params;

  await connectDB();
  const order = await Order.findOne({ orderCode: code }).lean();

  if (!order) {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto px-5 sm:px-8 py-16 w-full">
      <div className="text-center mb-10">
        <p className="font-mono text-xs tracking-widest text-accent mb-2">
          ORDER CONFIRMED
        </p>
        <h1 className="font-display text-3xl text-ink mb-2">Dhonnobad, {order.customer.name}!</h1>
        <p className="text-ink-soft text-sm">
          Order ID: <span className="font-mono text-ink">{order.orderCode}</span>
        </p>
      </div>

      <div className="bg-sand rounded-xl border border-line p-5 mb-6">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between text-sm py-1.5">
            <span className="text-ink-soft">
              {item.name} ({item.colorName}, {item.size}) × {item.qty}
            </span>
            <span className="text-ink">৳{item.price * item.qty}</span>
          </div>
        ))}
        <div className="flex justify-between pt-2 mt-2 border-t border-line font-medium">
          <span className="text-ink">Total</span>
          <span className="text-ink">৳{order.totalAmount}</span>
        </div>
      </div>

      <div className="border border-line rounded-xl p-5 mb-10 text-sm text-ink-soft flex flex-col gap-1.5">
        <p>
          <span className="text-ink-soft">Delivery to:</span>{" "}
          <span className="text-ink">{order.customer.address}, {order.customer.city}</span>
        </p>
        <p>
          <span className="text-ink-soft">Phone:</span>{" "}
          <span className="text-ink">{order.customer.phone}</span>
        </p>
        <p>
          <span className="text-ink-soft">Payment:</span>{" "}
          <span className="text-ink">{PAYMENT_LABELS[order.paymentMethod]}</span>
        </p>
        <p className="pt-2 text-xs">
          Amra shiggroi phone e call kore order ta confirm korbo.
        </p>
      </div>

      <Link
        href="/"
        className="block text-center bg-ink text-bone px-6 py-3.5 rounded-full text-sm font-medium hover:bg-accent transition-colors"
      >
        Continue Shopping
      </Link>
    </main>
  );
}