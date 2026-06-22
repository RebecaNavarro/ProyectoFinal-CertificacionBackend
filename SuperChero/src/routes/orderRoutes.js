import { Router } from "express";
import {
  addOrder,
  findOrders,
  findMyOrders,
  findOrderById,
  changeOrderStatus,
  cancelMyOrder
} from "../controllers/orderController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authenticate);

router.post("/", authorize("cliente"), addOrder);                  // cliente crea pedido
router.get("/", authorize("admin"), findOrders);                   // admin ve todos
router.get("/mine", authorize("cliente"), findMyOrders);           // cliente ve su historial
router.get("/:id", findOrderById);                                 // dueño o admin
router.patch("/:id/status", authorize("admin"), changeOrderStatus);// admin avanza el estado
router.patch("/:id/cancel", cancelMyOrder);                        // cliente dueño o admin

export default router;