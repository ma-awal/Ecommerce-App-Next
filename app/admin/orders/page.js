import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import AdminShell from "@/components/admin/AdminShell";
import OrdersTable from "@/components/admin/OrdersTable";

export default async function AdminOrdersPage() {
  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 }).lean();

  const serialized = orders.map((o) => ({
    ...o,
    _id: o._id.toString(),
    createdAt: o.createdAt.toISOString(),
  }));

  return (
    <AdminShell>
      <h1 className="font-display text-2xl text-ink mb-6">Orders</h1>
      <OrdersTable orders={serialized} />
    </AdminShell>
  );
}