import { validateCategoryBody } from "../utils/categoryValidator.js";
import { 
    getAllCategories,
    getCategoryById,
    addCategory,
    editCategory,
    removeCategory
} from "../services/categoryService.js";


export async function findAllCategories(req, res, next) {
    try {
        const { active } = req.query;
        const filter = { active: active === undefined ? true : active === "true" };
        const categories = await getAllCategories(filter);
        res.json(categories);
    } catch (error) {
        next(error);
    }
};

export async function findCategoryById(req, res, next) {
    try {
        const category = await getCategoryById(req.params.id);
        if (!category) {
            const error = new Error("Categoría no encontrada");
            error.statusCode = 404;
            return next(error);
        }
        res.json(category);
    } catch (error) {
        next(error);
    }
};

export async function createCategory(req, res, next) {
    try {
        const errors = validateCategoryBody(req.body);
        if (errors.length > 0) {
            const error = Error(errors.join(", "));
            error.statusCode = 400;
            return next(error);
        }
        const categoryCreated = await addCategory(req.body);
        res.status(201).json(categoryCreated);
    } catch (error) {
        next(error);
    }
};

export async function updateCategory(req, res, next) {
    try {
        const categoryUpdated = await editCategory(req.params.id, req.body);
        if (!categoryUpdated) {
            const error = Error("Categoría no encontrada");
            error.statusCode = 404;
            return next(error);
        }
        res.json(categoryUpdated);
    } catch (error) {
        next(error);
    }
};

export async function deleteCategory(req, res, next) {
    try {
        const categoryDeleted = await removeCategory(req.params.id);
        if (!categoryDeleted) {
            const error = Error("Categoría no encontrada");
            error.statusCode = 404;
            return next(error);
        }
        res.json({ message: "Categoría eliminada correctamente" });
    } catch (error) {
        next(error);
    }
};