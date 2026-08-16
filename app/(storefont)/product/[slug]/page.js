// Ei file er path: app/product/[slug]/page.js
// [slug] bracket mane eta dynamic route - URL theke slug value ashbe.
// e.g. /product/anchor-tee -> params.slug === "anchor-tee"

import { notFound } from "next/navigation";
 import { getProductBySlug } from "@/lib/product";
 
import ProductView from "@/components/product/ProductView";
// Next.js 15+ e params/searchParams Promise - tai await lagbe
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return { title: "Product not found" };

  return {
    title: `${product.name} — Anchor Tee`,
    description: product.description,
  };
}

export default async function ProductPage({ params, searchParams }) {
  const { slug } = await params;
  const { color } = await searchParams;

  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductView product={product} initialColorSlug={color} />;
}