import mongoose from "mongoose";

const STATUSES = ["pendiente", "en proceso", "enviado", "entregado", "cancelado"];

const orderItemSchema = new mongoose.Schema({
  clothes: { type: mongoose.Schema.Types.ObjectId, ref: "Clothes", required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: { type: [orderItemSchema], required: true },
  totalPrice: { type: Number, required: true, min: 0 },
  status: { type: String, enum: STATUSES, default: "pendiente" },
  date: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

export const Order = mongoose.model("Order", orderSchema);