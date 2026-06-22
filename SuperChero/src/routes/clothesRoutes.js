import { Router } from "express";
import {
  findClothes,
  findClothById,
  addCloth,
  editCloth,
  removeCloth
} from "../controllers/clothesController.js";

const router = Router();

router.get("/", findClothes);
router.get("/:id", findClothById);
router.post("/", addCloth);
router.patch("/:id", editCloth);
router.delete("/:id", removeCloth);

export default router;