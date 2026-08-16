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

export default function StatusSelect({ orderId, initialStatus }) {
  const [status, setStatus] = useState(initialStatus);
  const [updating, setUpdating] = useState(false);

  async function handleChange(newStatus) {
    const prevStatus = status;
    setStatus(newStatus);
    setUpdating(true);

    const res = await fetch(`/api/admin/orders/${orderId}`, {
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
    <select
      value={status}
      disabled={updating}
      onChange={(e) => handleChange(e.target.value)}
      className={`text-xs px-2 py-1.5 rounded-full border-0 font-medium cursor-pointer ${STATUS_COLORS[status]}`}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}