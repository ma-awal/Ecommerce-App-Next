"use client";

import { useState } from "react";

const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

function OrderRow({ order }) {
  const [status, setStatus] = useState(order.status);
  const [updating, setUpdating] = useState(false);

  async function handleStatusChange(newStatus) {
    const prevStatus = status;
    setStatus(newStatus);
    setUpdating(true);

    const res = await fetch(`/api/admin/orders/${order._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!res.ok) {
      setStatus(prevStatus);
    }
    setUpdating(false);
  }

  return (
    <tr className="border-b border-line">
      <td className="py-3 pr-4 font-mono text-sm text-ink whitespace-nowrap">
        {order.orderCode}
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
        <select
          value={status}
          disabled={updating}
          onChange={(e) => handleStatusChange(e.target.value)}
          className={`text-xs px-2 py-1.5 rounded-full border-0 font-medium cursor-pointer ${STATUS_COLORS[status]}`}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
}

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
            <OrderRow key={order._id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
}