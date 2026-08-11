// Ekhon eta static mock data. MongoDB connect korar por
// eta lib/db.js diye replace hobe - kintu function shape (getProductBySlug)
// same thakbe, tai baki code change korte hobe na. Eita "data layer"
// abstraction er ekta simple example.

export const PRODUCTS = [
  {
    slug: "anchor-tee",
    name: "Anchor Tee",
    price: 850,
    currency: "৳",
    description:
      "One design, cut from 240gsm combed cotton. No seasonal drops, no seventeen fits to choose from — just the shirt done right.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Ink Black", slug: "ink-black", hex: "#1A1A17" },
      { name: "Bone White", slug: "bone-white", hex: "#F1EFE9" },
    ],
  },
];

export function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || null;
}