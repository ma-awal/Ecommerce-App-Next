import Link from "next/link";

const FOOTER_COLUMNS = [
  {
    heading: "Shop",
    links: [
      { href: "/", label: "The T-Shirt" },
      { href: "/#colors", label: "Colorways" },
    ],
  },
  {
    heading: "Help",
    links: [
      { href: "/size-guide", label: "Size Guide" },
      { href: "/returns", label: "Returns" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-sand border-t border-line mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div className="col-span-2 sm:col-span-2">
          <p className="font-display text-lg text-ink mb-2">Anchor Tee</p>
          <p className="text-sm text-ink-soft max-w-xs">
            One t-shirt, made properly. Heavyweight cotton, two colorways, no seasonal noise.
          </p>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.heading}>
            <p className="font-mono text-[11px] tracking-wide text-ink-soft mb-3">
              {col.heading.toUpperCase()}
            </p>
            <ul className="flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-ink-soft font-mono">
            © {new Date().getFullYear()} Anchor Tee. Dhaka, Bangladesh.
          </p>
          <p className="text-xs text-ink-soft font-mono">COD · BKASH · NAGAD</p>
        </div>
      </div>
    </footer>
  );
}