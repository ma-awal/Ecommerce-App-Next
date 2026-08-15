import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminShell({ children }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-56 bg-ink text-bone flex flex-col p-6 gap-6 shrink-0">
        <p className="font-display text-lg">Anchor Tee — Admin</p>
        <nav className="flex flex-col gap-2 text-sm">
          <Link href="/admin/orders" className="hover:text-accent transition-colors">
            Orders
          </Link>
        </nav>
        <div className="mt-auto">
          <LogoutButton />
        </div>
      </aside>
      <div className="flex-1 p-8 overflow-x-auto">{children}</div>
    </div>
  );
}