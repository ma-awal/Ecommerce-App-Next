import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import AdminShell from "@/components/admin/AdminShell";
import StatusSelect from "@/components/admin/StatusSelect";
import Link from "next/link";
import { notFound } from "next/navigation";

const PAYMENT_LABELS = {
  bkash: "bKash",
  nagad: "Nagad",
  cod: "Cash on Delivery",
};

export default async function AdminOrderDetailPage({ params }) {
  const { id } = await params;

  await connectDB();
  const order = await Order.findById(id).lean();

  if (!order) {
    notFound();
  }

  const isOnlinePayment = order.paymentMethod !== "cod";

  return (
    <AdminShell>
      <Link
        href="/admin/orders"
        className="text-sm text-ink-soft hover:text-accent mb-6 inline-block"
      >
        ← Back to Orders
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl text-ink">{order.orderCode}</h1>
          <p className="text-xs text-ink-soft font-mono mt-1">
            {new Date(order.createdAt).toLocaleString("en-BD", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>
        <StatusSelect orderId={order._id.toString()} initialStatus={order.status} />
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div className="border border-line rounded-xl p-5">
          <p className="font-mono text-[11px] tracking-widest text-ink-soft mb-3">
            CUSTOMER
          </p>
          <p className="text-ink font-medium">{order.customer.name}</p>
          <p className="text-sm text-ink-soft mt-1">{order.customer.phone}</p>
          <p className="text-sm text-ink-soft mt-1">
            {order.customer.address}, {order.customer.city}
          </p>
        </div>

        <div
          className={`rounded-xl p-5 border ${
            isOnlinePayment ? "border-accent bg-sand" : "border-line"
          }`}
        >
          <p
            className={`font-mono text-[11px] tracking-widest mb-3 ${
              isOnlinePayment ? "text-accent" : "text-ink-soft"
            }`}
          >
            PAYMENT — {PAYMENT_LABELS[order.paymentMethod].toUpperCase()}
          </p>

          {!isOnlinePayment ? (
            <p className="text-sm text-ink-soft">
              Cash on delivery — kono online payment verify korar dorkar nai.
            </p>
          ) : (
            <>
              <div className="mb-3">
                <p className="text-xs text-ink-soft mb-0.5">Transaction ID</p>
                <p className="text-ink font-mono text-base font-medium">
                  {order.paymentInfo?.transactionId || "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-ink-soft mb-0.5">Sender Number</p>
                <p className="text-ink font-mono text-base">
                  {order.paymentInfo?.senderNumber || "—"}
                </p>
              </div>
              <p className="text-xs text-ink-soft mt-4 leading-relaxed">
                {PAYMENT_LABELS[order.paymentMethod]} app e giye upore deya
                Transaction ID ta খুঁজে verify koro. Match korle status
                &quot;confirmed&quot; e paltao.
              </p>
            </>
          )}
        </div>
      </div>

      <div className="border border-line rounded-xl p-5">
        <p className="font-mono text-[11px] tracking-widest text-ink-soft mb-4">
          ITEMS
        </p>
        {order.items.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between text-sm py-2 border-b border-line last:border-0"
          >
            <span className="text-ink">
              {item.name} — {item.colorName}, Size {item.size} × {item.qty}
            </span>
            <span className="text-ink-soft">৳{item.price * item.qty}</span>
          </div>
        ))}
        <div className="flex justify-between pt-3 mt-2 font-medium">
          <span className="text-ink">Total</span>
          <span className="text-ink">৳{order.totalAmount}</span>
        </div>
      </div>
    </AdminShell>
  );
}