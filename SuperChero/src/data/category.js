import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, default: "" },
  active: { type: Boolean, default: true },
});

export const Category = mongoose.model("Category", categorySchema);