 import Link from "next/link";
import StatusSelect from "@/components/admin/StatusSelect";

export default function OrdersTable({ orders }) {
  if (orders.length === 0) {
    return <p className="text-ink-soft text-sm">No orders yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-line text-xs text-ink-soft font-mono">
            <th className="py-2 pr-4">ORDER</th>
            <th className="py-2 pr-4">CUSTOMER</th>
            <th className="py-2 pr-4">ITEMS</th>
            <th className="py-2 pr-4">TOTAL</th>
            <th className="py-2 pr-4">PAYMENT</th>
            <th className="py-2 pr-4">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b border-line">
              <td className="py-3 pr-4 font-mono text-sm whitespace-nowrap">
                <Link
                  href={`/admin/orders/${order._id}`}
                  className="text-ink hover:text-accent underline underline-offset-2"
                >
                  {order.orderCode}
                </Link>
              </td>
              <td className="py-3 pr-4 text-sm text-ink">
                {order.customer.name}
                <br />
                <span className="text-ink-soft text-xs">{order.customer.phone}</span>
              </td>
              <td className="py-3 pr-4 text-sm text-ink-soft max-w-xs">
                {order.items
                  .map((i) => `${i.name} (${i.colorName}, ${i.size}) x${i.qty}`)
                  .join(", ")}
              </td>
              <td className="py-3 pr-4 text-sm text-ink whitespace-nowrap">
                ৳{order.totalAmount}
              </td>
              <td className="py-3 pr-4 text-sm text-ink-soft uppercase whitespace-nowrap">
                {order.paymentMethod}
              </td>
              <td className="py-3 pr-4">
                <StatusSelect orderId={order._id} initialStatus={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}