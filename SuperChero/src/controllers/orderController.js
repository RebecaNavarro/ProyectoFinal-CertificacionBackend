import {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  getOrderById,
  updateOrderStatus,
  cancelOrder
} from "../services/orderService.js";
import { validateOrderBody } from "../utils/orderValidator.js";

export async function addOrder(req, res, next) {
  try {
    const errors = validateOrderBody(req.body);
    if (errors.length > 0) {
      const error = Error(errors.join(" "));
      error.statusCode = 400;
      return next(error);
    }
    const order = await createOrder(req.user.id, req.body.items);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
}

export async function findOrders(req, res, next) {
  try {
    res.json(await getAllOrders());
  } catch (error) {
    next(error);
  }
}

export async function findMyOrders(req, res, next) {
  try {
    res.json(await getOrdersByUser(req.user.id));
  } catch (error) {
    next(error);
  }
}

export async function findOrderById(req, res, next) {
  try {
    const order = await getOrderById(req.params.id);
    if (!order) {
      const error = Error("Pedido no encontrado");
      error.statusCode = 404;
      return next(error);
    }
    if (req.user.role !== "admin" && order.user._id.toString() !== req.user.id) {
      const error = Error("No puedes ver un pedido que no es tuyo.");
      error.statusCode = 403;
      return next(error);
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
}

export async function findOrdersByUser(req, res, next) {
  try {
    const orders = await getOrdersByUser(req.params.userId);
    res.json(orders);
  } catch (error) {
    next(error);
  }
}

export async function changeOrderStatus(req, res, next) {
  try {
    const { status } = req.body;
    if (!status) {
      const error = Error("El campo 'status' es obligatorio.");
      error.statusCode = 400;
      return next(error);
    }
    const order = await updateOrderStatus(req.params.id, status);
    if (!order) {
      const error = Error("Pedido no encontrado");
      error.statusCode = 404;
      return next(error);
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
}

export async function cancelMyOrder(req, res, next) {
  try {
    const order = await cancelOrder(req.params.id, req.user);
    if (!order) {
      const error = Error("Pedido no encontrado");
      error.statusCode = 404;
      return next(error);
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
}