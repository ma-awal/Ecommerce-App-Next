const FEATURES = [
  {
    label: "FABRIC",
    detail: "240gsm combed cotton — heavier than your average tee, won't go sheer.",
  },
  {
    label: "FIT",
    detail: "Boxy, relaxed cut. True to size — check the size guide before ordering.",
  },
  {
    label: "STITCH",
    detail: "Double-stitched hems and collar. Built to survive the wash, not just the photo.",
  },
];

export default function FeatureStrip() {
  return (
    <section className="border-y border-line bg-sand">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 grid sm:grid-cols-3 gap-8">
        {FEATURES.map((f) => (
          <div key={f.label} className="flex flex-col gap-1.5">
            <p className="font-mono text-[11px] tracking-widest text-accent">
              {f.label}
            </p>
            <p className="text-sm text-ink-soft leading-relaxed">{f.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}