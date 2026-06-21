import { Category } from "../data/category.js";

export async function getAllCategories() {
    const categoriesList = await Category.find();
    return categoriesList;
}

export async function getCategoryById(id) {
    const categoryById = await Category.findById(id);
    return categoryById;
}

export async function addCategory(data) {
    const categoryCreated = await Category.create(data);
    return categoryCreated;
}

export async function editCategory(id, data) {
    const categoryUpdated = await Category.findByIdAndUpdate(id, data, { new: true });
    return categoryUpdated;
}

export async function removeCategory(id) {
    const categoryDeleted = await Category.findByIdAndUpdate(id, { active: false }, { new: true });
    return categoryDeleted;
}