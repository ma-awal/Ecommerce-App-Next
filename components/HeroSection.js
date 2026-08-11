import Link from "next/link";

// Simple flat illustration - photo asholey shoot hoye gele
// eita shudhu <img src="/product/hero.jpg" ...> diye replace kore dio.
function TeeIllustration({ color = "#33415C" }) {
  return (
    <svg viewBox="0 0 200 220" className="w-full h-auto max-w-xs mx-auto">
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

export default function HeroSection() {
  return (
    <section className="max-w-6xl mx-auto w-full px-5 sm:px-8 pt-14 pb-20 grid sm:grid-cols-2 gap-10 items-center">
      <div className="flex flex-col gap-5 order-2 sm:order-1 text-center sm:text-left">
        <p className="font-mono text-xs tracking-widest text-ink-soft">
          THE ONLY SHIRT YOU NEED
        </p>
        <h1 className="font-display text-4xl sm:text-5xl leading-tight text-ink">
          Heavyweight cotton.
          <br />
          Two colors. Zero noise.
        </h1>
        <p className="text-ink-soft max-w-sm mx-auto sm:mx-0">
          One design, cut from 240gsm combed cotton. No seasonal drops,
          no seventeen fits to choose from — just the shirt done right.
        </p>
        <div className="flex items-center gap-4 justify-center sm:justify-start">
          <Link
            href="/product/anchor-tee"
            className="bg-ink text-bone px-6 py-3 rounded-full text-sm font-medium hover:bg-accent transition-colors"
          >
            Shop the Tee — ৳850
          </Link>
        </div>
      </div>

      <div className="order-1 sm:order-2 bg-sand rounded-2xl py-12 px-6 border border-line">
        <TeeIllustration />
      </div>
    </section>
  );
}