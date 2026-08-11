 "use client";
// Cart e item thakle count dekhate hobe - eta store theke live update hoy.

import Link from "next/link";
 import { useCartStore } from "../store/cartStore";

export default function CartIcon() {
  const items = useCartStore((state) => state.items);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-1.5 group"
      aria-label={`Cart, ${count} items`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-ink group-hover:text-accent transition-colors"
      >
        <path d="M6 7h12l-1 13H7L6 7Z" strokeLinejoin="round" />
        <path d="M9 7V6a3 3 0 0 1 6 0v1" strokeLinecap="round" />
      </svg>

      {count > 0 && (
        <span className="absolute -top-2 -right-2 flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-accent text-bone text-[10px] font-mono leading-none">
          {count}
        </span>
      )}
    </Link>
  );
}