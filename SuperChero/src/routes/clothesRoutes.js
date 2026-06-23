import { Router } from "express";
import {
  findClothes,
  findClothById,
  addCloth,
  editCloth,
  removeCloth,
  getClothPrice
} from "../controllers/clothesController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", findClothes);
router.get("/:id", findClothById);
router.get("/:id/price", getClothPrice);
router.post("/", authenticate, authorize("admin"), addCloth);
router.patch("/:id", authenticate, authorize("admin"), editCloth);
router.delete("/:id", authenticate, authorize("admin"), removeCloth);
export default router;