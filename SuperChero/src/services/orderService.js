import { Order } from "../data/order.js";
import { Clothes } from "../data/clothes.js";

export async function createOrder(userId, items) {
  const detalle = [];
  const errores = [];

  for (const item of items) {
    const cloth = await Clothes.findById(item.clothes);
    if (!cloth || !cloth.active) {
      errores.push(`La prenda ${item.clothes} no existe o no está disponible.`);
      continue;
    }
    if (cloth.stock < item.quantity) {
      errores.push(`Stock insuficiente de "${cloth.name}" (disponible: ${cloth.stock}, solicitado: ${item.quantity}).`);
      continue;
    }
    detalle.push({
      clothes: cloth._id,
      name: cloth.name,
      quantity: item.quantity,
      unitPrice: cloth.price
    });
  }

  if (errores.length > 0) {
    const error = Error(errores.join(" "));
    error.statusCode = 400;
    throw error;
  }

  const totalPrice = detalle.reduce((sum, d) => sum + d.unitPrice * d.quantity, 0);

  const order = await Order.create({ user: userId, items: detalle, totalPrice });

  for (const d of detalle) {
    await Clothes.findByIdAndUpdate(d.clothes, { $inc: { stock: -d.quantity } });
  }

  return order;
}

export async function getAllOrders() {
  return await Order.find().populate("user", "name email").sort({ date: -1 });
}

export async function getOrdersByUser(userId) {
  return await Order.find({ user: userId }).sort({ date: -1 });
}

export async function getOrderById(id) {
  return await Order.findById(id).populate("user", "name email");
}

export async function updateOrderStatus(id, newStatus) {
  const order = await Order.findById(id);
  if (!order) return null;

  if (order.status === "cancelado" || order.status === "entregado") {
    const error = Error(`Un pedido '${order.status}' ya no puede cambiar de estado.`);
    error.statusCode = 400;
    throw error;
  }
  if (!["en proceso", "enviado", "entregado"].includes(newStatus)) {
    const error = Error("El admin solo puede avanzar el pedido a 'en proceso', 'enviado' o 'entregado'.");
    error.statusCode = 400;
    throw error;
  }

  order.status = newStatus;
  await order.save();
  return order;
}

export async function cancelOrder(id, requester) {
  const order = await Order.findById(id);
  if (!order) return null;

  if (requester.role !== "admin" && order.user.toString() !== requester.id) {
    const error = Error("No puedes cancelar un pedido que no es tuyo.");
    error.statusCode = 403;
    throw error;
  }

  if (!["pendiente", "en proceso"].includes(order.status)) {
    const error = Error(`No se puede cancelar un pedido en estado '${order.status}'.`);
    error.statusCode = 400;
    throw error;
  }

  for (const item of order.items) {
    await Clothes.findByIdAndUpdate(item.clothes, { $inc: { stock: item.quantity } });
  }

  order.status = "cancelado";
  await order.save();
  return order;
}