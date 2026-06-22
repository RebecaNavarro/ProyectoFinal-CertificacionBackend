import mongoose from "mongoose";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const clothesSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true, min: 0 },
  size: { type: String, required: true, enum: SIZES },
  stock: { type: Number, required: true, min: 0, default: 0 },
  color: { type: String, default: "" },
  imageURL: { type: String, default: "" },
  active: { type: Boolean, default: true }
});

export const Clothes = mongoose.model("Clothes", clothesSchema);