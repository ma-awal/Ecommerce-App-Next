 // Age eikhane static array chilo. Ekhon MongoDB theke fetch kortesi -
// kintu function er naam (getProductBySlug) same rekhe disi, tai
// eita call kora onno kono file (page.js, ProductView.js) e kono
// change lagbe na - shudhu "async" hoye geche, tai await lagbe.

import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function getProductBySlug(slug) {
  await connectDB();
  const product = await Product.findOne({ slug }).lean();
  if (!product) return null;

  return {
    ...product,
    _id: product._id.toString(),
  };
}