import {Router} from "express";
import {
    findAllCategories,
    findCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} from '../controllers/categoryController.js';

const router = Router();

router.get("/", findAllCategories);
router.get("/:id", findCategoryById);
router.post("/", createCategory);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;