import { Router } from "express";
import {
    findAllCategories,
    findCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} from '../controllers/categoryController.js';
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", findAllCategories);
router.get("/:id", findCategoryById);
router.post("/", authenticate, authorize("admin"), createCategory);
router.patch("/:id", authenticate, authorize("admin"), updateCategory);
router.delete("/:id", authenticate, authorize("admin"), deleteCategory);

export default router;