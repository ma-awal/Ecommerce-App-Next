import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema(
  {
    color: { type: String, required: true },
    colorName: { type: String, required: true },
    colorHex: { type: String, required: true },
    size: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: "৳" },
    description: { type: String, required: true },
    variants: { type: [VariantSchema], required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);