import Link from "next/link";

const COLORWAYS = [
  { name: "Ink Black", slug: "ink-black", hex: "#1A1A17" },
  { name: "Bone White", slug: "bone-white", hex: "#F1EFE9" },
];

function Swatch({ hex }) {
  return (
    <svg viewBox="0 0 200 220" className="w-full h-auto max-w-[220px] mx-auto">
      <path
        d="M60 20 L85 10 Q100 22 115 10 L140 20 L165 45 L145 65 L135 58 L135 200 Q100 210 65 200 L65 58 L55 65 L35 45 Z"
        fill={hex}
        stroke="#1A1A17"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ColorShowcase() {
  return (
    <section id="colors" className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
      <p className="font-mono text-xs tracking-widest text-ink-soft text-center mb-2">
        TWO COLORWAYS
      </p>
      <h2 className="font-display text-3xl text-ink text-center mb-12">
        Pick your shade
      </h2>

      <div className="grid sm:grid-cols-2 gap-6">
        {COLORWAYS.map((c) => (
          <Link
            key={c.slug}
            href={`/product/anchor-tee?color=${c.slug}`}
            className="group border border-line rounded-2xl p-8 bg-white/40 hover:border-accent transition-colors"
          >
            <Swatch hex={c.hex} />
            <div className="mt-6 flex items-center justify-between">
              <span className="font-display text-lg text-ink">{c.name}</span>
              <span className="text-sm text-ink-soft group-hover:text-accent transition-colors">
                Select →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}