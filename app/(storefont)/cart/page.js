"use client";
// Puro page e interactivity lagbe (qty change, remove) tai
// "use client" root e e dilam - eta chhoto scope e thik ache,
// boro dashboard hole individual row ke client banano better hoto.

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

function CartItemRow({ item }) {
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex items-center gap-4 py-5 border-b border-line">
      <div
        className="h-16 w-16 rounded-lg border border-line shrink-0"
        style={{ backgroundColor: item.colorHex }}
      />

      <div className="flex-1 min-w-0">
        <p className="font-display text-base text-ink">{item.name}</p>
        <p className="text-xs text-ink-soft font-mono mt-0.5">
          {item.colorName} · SIZE {item.size}
        </p>
      </div>

      <div className="flex items-center gap-2 border border-line rounded-lg px-2 py-1">
        <button
          type="button"
          onClick={() => updateQty(item.lineId, item.qty - 1)}
          className="px-1.5 text-ink-soft hover:text-ink"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-5 text-center text-sm">{item.qty}</span>
        <button
          type="button"
          onClick={() => updateQty(item.lineId, item.qty + 1)}
          className="px-1.5 text-ink-soft hover:text-ink"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <p className="w-16 text-right text-sm text-ink">
        ৳{item.price * item.qty}
      </p>

      <button
        type="button"
        onClick={() => removeItem(item.lineId)}
        className="text-ink-soft hover:text-accent text-sm"
        aria-label={`Remove ${item.name}`}
      >
        ✕
      </button>
    </div>
  );
}

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const totalPrice = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  if (items.length === 0) {
    return (
      <main className="max-w-2xl mx-auto px-5 py-24 text-center flex flex-col items-center gap-4">
        <p className="font-display text-2xl text-ink">Your cart is empty</p>
        <p className="text-ink-soft text-sm">
          Add the tee in your size and it&apos;ll show up here.
        </p>
        <Link
          href="/product/anchor-tee"
          className="mt-2 bg-ink text-bone px-6 py-3 rounded-full text-sm font-medium hover:bg-accent transition-colors"
        >
          Shop the Tee
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-5 sm:px-8 py-12 w-full">
      <h1 className="font-display text-2xl text-ink mb-6">Your Cart</h1>

      <div>
        {items.map((item) => (
          <CartItemRow key={item.lineId} item={item} />
        ))}
      </div>

      <div className="flex items-center justify-between pt-6">
        <span className="text-ink-soft text-sm">Total</span>
        <span className="font-display text-xl text-ink">৳{totalPrice}</span>
      </div>

      <Link
        href="/checkout"
        className="mt-6 block text-center bg-ink text-bone px-6 py-3.5 rounded-full text-sm font-medium hover:bg-accent transition-colors"
      >
        Proceed to Checkout
      </Link>
    </main>
  );
}