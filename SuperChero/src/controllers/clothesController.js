import {
  getClothes,
  getClothById,
  createCloth,
  updateClothById,
  softDeleteClothById
} from "../services/clothesService.js";
import { getCategoryById } from "../services/categoryService.js";
import { validateClothBody } from "../utils/clothesValidator.js";

export async function findClothes(req, res, next) {
  try {
    const { category, size, color, active, page, limit, sortBy, order } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (size) filter.size = size;
    if (color) filter.color = color;
    if (active !== undefined) filter.active = active === "true";

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    if (pageNumber <= 0 || limitNumber <= 0) {
      const error = Error("Los parámetros de paginación deben ser mayores a 0");
      error.statusCode = 400;
      return next(error);
    }

    const result = await getClothes({
      filter, sortBy, order, page: pageNumber, limit: limitNumber
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function findClothById(req, res, next) {
  try {
    const cloth = await getClothById(req.params.id);
    if (!cloth) {
      const error = Error("Prenda no encontrada");
      error.statusCode = 404;
      return next(error);
    }
    res.json(cloth);
  } catch (error) {
    next(error);
  }
}

export async function addCloth(req, res, next) {
  try {
    const errors = validateClothBody(req.body);
    if (errors.length > 0) {
      const error = Error(errors.join(" "));
      error.statusCode = 400;
      return next(error);
    }

    const category = await getCategoryById(req.body.category);
    if (!category || !category.active) {
      const error = Error("La categoría indicada no existe o está inactiva");
      error.statusCode = 400;
      return next(error);
    }

    const newCloth = await createCloth(req.body);
    res.status(201).json(newCloth);
  } catch (error) {
    next(error);
  }
}

export async function editCloth(req, res, next) {
  try {
    const updated = await updateClothById(req.params.id, req.body);
    if (!updated) {
      const error = Error("Prenda no encontrada");
      error.statusCode = 404;
      return next(error);
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
}

export async function removeCloth(req, res, next) {
  try {
    const deleted = await softDeleteClothById(req.params.id);
    if (!deleted) {
      const error = Error("Prenda no encontrada");
      error.statusCode = 404;
      return next(error);
    }
    res.json(deleted);
  } catch (error) {
    next(error);
  }
}