 "use client";

import { useState, useMemo } from "react";
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
  const colors = useMemo(() => {
    const seen = new Map();
    for (const v of product.variants) {
      if (!seen.has(v.color)) {
        seen.set(v.color, { slug: v.color, name: v.colorName, hex: v.colorHex });
      }
    }
    return Array.from(seen.values());
  }, [product.variants]);

  const defaultColor =
    colors.find((c) => c.slug === initialColorSlug) || colors[0];

  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [stockError, setStockError] = useState("");
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const sizesForColor = useMemo(() => {
    return product.variants.filter((v) => v.color === selectedColor.slug);
  }, [product.variants, selectedColor]);

  const selectedVariant = sizesForColor.find((v) => v.size === selectedSize);
  const availableStock = selectedVariant?.stock ?? 0;

  function handleColorChange(color) {
    setSelectedColor(color);
    setSelectedSize(null);
    setStockError("");
  }

  function handleAddToCart() {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);

    if (availableStock < qty) {
      setStockError(
        availableStock === 0
          ? "Ei size ta stock e nai."
          : `Shudhu ${availableStock} ta baki ache ei size e.`
      );
      return;
    }
    setStockError("");

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
            {colors.map((color) => (
              <button
                key={color.slug}
                type="button"
                onClick={() => handleColorChange(color)}
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
          <div className="flex gap-2 flex-wrap">
            {sizesForColor.map((variant) => {
              const outOfStock = variant.stock === 0;
              return (
                <button
                  key={variant.size}
                  type="button"
                  disabled={outOfStock}
                  onClick={() => {
                    setSelectedSize(variant.size);
                    setSizeError(false);
                    setStockError("");
                  }}
                  className={`h-11 min-w-11 px-3 rounded-lg border text-sm font-medium transition-colors relative ${
                    outOfStock
                      ? "border-line text-ink-soft/40 cursor-not-allowed line-through"
                      : selectedSize === variant.size
                      ? "bg-ink text-bone border-ink"
                      : "border-line text-ink hover:border-accent"
                  }`}
                >
                  {variant.size}
                </button>
              );
            })}
          </div>
          {selectedVariant && selectedVariant.stock > 0 && selectedVariant.stock <= 5 && (
            <p className="text-xs text-accent mt-2">
              Shudhu {selectedVariant.stock} ta baki ache.
            </p>
          )}
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

        {stockError && <p className="text-sm text-accent">{stockError}</p>}

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