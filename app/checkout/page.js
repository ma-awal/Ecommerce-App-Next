"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
 
import { useCartStore } from "../../store/cartStore";

const PAYMENT_METHODS = [
  { id: "bkash", label: "bKash", number: "01712345678" },
  { id: "nagad", label: "Nagad", number: "01712345678" },
  { id: "cod", label: "Cash on Delivery", number: null },
];

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [transactionId, setTransactionId] = useState("");
  const [senderNumber, setSenderNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const selectedMethod = PAYMENT_METHODS.find((m) => m.id === paymentMethod);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.phone || !form.address || !form.city) {
      setError("Shob field fill up koro.");
      return;
    }

    if (paymentMethod !== "cod" && !transactionId) {
      setError("Transaction ID din — payment verify korte lagbe.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: items.map((i) => ({
            slug: i.slug,
            name: i.name,
            price: i.price,
            color: i.color,
            colorName: i.colorName,
            size: i.size,
            qty: i.qty,
          })),
          paymentMethod,
          paymentInfo:
            paymentMethod === "cod" ? {} : { transactionId, senderNumber },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Order place kora jayni. Abar try koro.");
        setSubmitting(false);
        return;
      }

      clearCart();
      router.push(`/order-confirmation/${data.order.orderCode}`);
    } catch (err) {
      console.error(err);
      setError("Network error. Abar try koro.");
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <main className="max-w-2xl mx-auto px-5 py-24 text-center flex flex-col items-center gap-4">
        <p className="font-display text-2xl text-ink">Your cart is empty</p>
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
      <h1 className="font-display text-2xl text-ink mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="bg-sand rounded-xl p-4 border border-line">
          {items.map((item) => (
            <div key={item.lineId} className="flex justify-between text-sm py-1.5">
              <span className="text-ink-soft">
                {item.name} ({item.colorName}, {item.size}) × {item.qty}
              </span>
              <span className="text-ink">৳{item.price * item.qty}</span>
            </div>
          ))}
          <div className="flex justify-between pt-2 mt-2 border-t border-line font-medium">
            <span className="text-ink">Total</span>
            <span className="text-ink">৳{totalPrice}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-mono text-[11px] tracking-widest text-ink-soft">
            DELIVERY DETAILS
          </p>
          <input
            type="text"
            placeholder="Full name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="border border-line rounded-lg px-4 py-3 text-sm bg-white/60 focus:outline-none focus:border-accent"
          />
          <input
            type="tel"
            placeholder="Phone number"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className="border border-line rounded-lg px-4 py-3 text-sm bg-white/60 focus:outline-none focus:border-accent"
          />
          <textarea
            placeholder="Full address"
            value={form.address}
            onChange={(e) => updateField("address", e.target.value)}
            rows={2}
            className="border border-line rounded-lg px-4 py-3 text-sm bg-white/60 focus:outline-none focus:border-accent resize-none"
          />
          <input
            type="text"
            placeholder="City"
            value={form.city}
            onChange={(e) => updateField("city", e.target.value)}
            className="border border-line rounded-lg px-4 py-3 text-sm bg-white/60 focus:outline-none focus:border-accent"
          />
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-mono text-[11px] tracking-widest text-ink-soft">
            PAYMENT METHOD
          </p>
          <div className="flex gap-2">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id)}
                className={`flex-1 py-3 rounded-lg text-sm border transition-colors ${
                  paymentMethod === method.id
                    ? "bg-ink text-bone border-ink"
                    : "border-line text-ink hover:border-accent"
                }`}
              >
                {method.label}
              </button>
            ))}
          </div>

          {selectedMethod.number && (
            <div className="bg-sand border border-line rounded-lg p-4 text-sm text-ink-soft flex flex-col gap-3">
              <p>
                Send <span className="text-ink font-medium">৳{totalPrice}</span> to{" "}
                <span className="font-mono text-ink">{selectedMethod.number}</span>{" "}
                ({selectedMethod.label} — Personal/Send Money), তারপর নিচে
                Transaction ID দিন।
              </p>
              <input
                type="text"
                placeholder="Transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="border border-line rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-accent"
              />
              <input
                type="text"
                placeholder="Your bKash/Nagad number (optional)"
                value={senderNumber}
                onChange={(e) => setSenderNumber(e.target.value)}
                className="border border-line rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-accent"
              />
            </div>
          )}
        </div>

        {error && <p className="text-sm text-accent">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="bg-ink text-bone px-6 py-3.5 rounded-full text-sm font-medium hover:bg-accent transition-colors disabled:opacity-50"
        >
          {submitting ? "Placing order…" : `Place Order — ৳${totalPrice}`}
        </button>
      </form>
    </main>
  );
}