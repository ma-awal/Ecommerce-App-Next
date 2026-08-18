// Ei route ekbar call korle product + stock data database e bosbe.
// /api/admin/... er bhitore thakay middleware ei route ke protect kore -
// admin login chara call kora jabe na.

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function POST() {
  await connectDB();

  const product = await Product.findOneAndUpdate(
    { slug: "anchor-tee" },
    {
      slug: "anchor-tee",
      name: "Anchor Tee",
      price: 850,
      currency: "৳",
      description:
        "One design, cut from 240gsm combed cotton. No seasonal drops, no seventeen fits to choose from — just the shirt done right.",
      variants: [
        { color: "ink-black", colorName: "Ink Black", colorHex: "#1A1A17", size: "S", stock: 10 },
        { color: "ink-black", colorName: "Ink Black", colorHex: "#1A1A17", size: "M", stock: 15 },
        { color: "ink-black", colorName: "Ink Black", colorHex: "#1A1A17", size: "L", stock: 15 },
        { color: "ink-black", colorName: "Ink Black", colorHex: "#1A1A17", size: "XL", stock: 8 },
        { color: "bone-white", colorName: "Bone White", colorHex: "#F1EFE9", size: "S", stock: 10 },
        { color: "bone-white", colorName: "Bone White", colorHex: "#F1EFE9", size: "M", stock: 15 },
        { color: "bone-white", colorName: "Bone White", colorHex: "#F1EFE9", size: "L", stock: 15 },
        { color: "bone-white", colorName: "Bone White", colorHex: "#F1EFE9", size: "XL", stock: 8 },
      ],
    },
    { upsert: true, new: true }
  );

  return NextResponse.json({ success: true, product });
}