"use client";
// Eikhane color/size/qty select korle UI update hote hobe real-time -
// tai "use client" lagbe. Product data (name, price, colors list) shob
// server theke prop hishebe ashe - shudhu "kon ta select kora ache" eita
// client-side state.
import { useState } from "react";
 import { useCartStore } from "@/store/cartStore";

function TeeIllustration({ color }) {
  return (
    <svg viewBox="0 0 200 220" className="w-full h-auto max-w-sm mx-auto">
      <path
        d="M60 20 L85 10 Q100 22 115 10 L140 20 L165 45 L145 65 L135 58 L135 200 Q100 210 65 200 L65 58 L55 65 L35 45 Z"
        fill={color}
        stroke="#1A1A17"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProductView({ product, initialColorSlug }) {
  const defaultColor =
    product.colors.find((c) => c.slug === initialColorSlug) ||
    product.colors[0];

  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  function handleAddToCart() {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);

    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      color: selectedColor.slug,
      colorName: selectedColor.name,
      colorHex: selectedColor.hex,
      size: selectedSize,
      qty,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 grid sm:grid-cols-2 gap-12">
      <div className="bg-sand rounded-2xl py-16 px-6 border border-line">
        <TeeIllustration color={selectedColor.hex} />
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <p className="font-mono text-xs tracking-widest text-ink-soft mb-2">
            {product.currency}
            {product.price}
          </p>
          <h1 className="font-display text-3xl text-ink">{product.name}</h1>
        </div>

        <p className="text-ink-soft leading-relaxed">{product.description}</p>

        <div>
          <p className="font-mono text-[11px] tracking-widest text-ink-soft mb-3">
            COLOR — {selectedColor.name.toUpperCase()}
          </p>
          <div className="flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color.slug}
                type="button"
                onClick={() => setSelectedColor(color)}
                aria-label={color.name}
                aria-pressed={selectedColor.slug === color.slug}
                className={`h-10 w-10 rounded-full border-2 transition-all ${
                  selectedColor.slug === color.slug
                    ? "border-accent scale-110"
                    : "border-line"
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-widest text-ink-soft mb-3">
            SIZE {sizeError && <span className="text-accent">— please select a size</span>}
          </p>
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => {
                  setSelectedSize(size);
                  setSizeError(false);
                }}
                className={`h-11 w-11 rounded-lg border text-sm font-medium transition-colors ${
                  selectedSize === size
                    ? "bg-ink text-bone border-ink"
                    : "border-line text-ink hover:border-accent"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-widest text-ink-soft mb-3">
            QUANTITY
          </p>
          <div className="flex items-center gap-3 border border-line rounded-lg px-3 py-2 w-fit">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-2 text-lg text-ink-soft hover:text-ink"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-6 text-center">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              className="px-2 text-lg text-ink-soft hover:text-ink"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-2 bg-ink text-bone px-6 py-3.5 rounded-full text-sm font-medium hover:bg-accent transition-colors"
        >
          {added ? "Added ✓" : `Add to Cart — ${product.currency}${product.price * qty}`}
        </button>
      </div>
    </div>
  );
}