// Header nijei Server Component - navigation, links shob static,
// tai kono "use client" lagbe na. Shudhu CartIcon (interactive part)
// alada file e client component hishebe import kora hoyeche.

import Link from "next/link";
 import CartIcon from "./CartIcon";

const NAV_LINKS = [
  { href: "/", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/care", label: "Care Guide" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-bone/95 backdrop-blur border-b border-line">
      <div className="bg-accent text-bone text-center text-[11px] tracking-wide font-mono py-1.5 px-4">
        FREE DELIVERY IN DHAKA · COD, BKASH &amp; NAGAD AVAILABLE
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-xl tracking-tight text-ink">
          Anchor Tee
        </Link>

        <nav className="hidden sm:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink-soft hover:text-ink transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <CartIcon />
      </div>
    </header>
  );
}