import { Clothes } from "../data/clothes.js";

export async function getClothes({ filter = {}, sortBy, order, page = 1, limit = 10 }) {
  const sort = {};
  if (sortBy) {
    sort[sortBy] = order === "desc" ? -1 : 1;
  }
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Clothes.find(filter).populate("category", "name").sort(sort).skip(skip).limit(limit),
    Clothes.countDocuments(filter)
  ]);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
}

export async function getClothById(id) {
  return await Clothes.findById(id).populate("category", "name");
}

export async function createCloth(data) {
  return await Clothes.create(data);
}

export async function updateClothById(id, data) {
  return await Clothes.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export async function softDeleteClothById(id) {
  return await Clothes.findByIdAndUpdate(id, { active: false }, { new: true });
}