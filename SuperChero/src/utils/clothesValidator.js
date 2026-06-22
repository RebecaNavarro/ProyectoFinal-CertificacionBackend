const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export function validateClothBody(body) {

  const errors = [];

  if (!body.name || typeof body.name !== "string" || body.name.trim() === "") {
    errors.push("El campo nombre es obligatorio y debe ser una cadena no vacía.");
  }

  if (!body.description || typeof body.description !== "string") {
    errors.push("El campo descripción es obligatorio y debe ser una cadena.");
  }

  if (!body.category) {
    errors.push("El campo categoría es obligatorio.");
  }

  if (typeof body.price !== "number" || body.price <= 0) {
    errors.push("El campo precio es obligatorio y debe ser un número mayor a 0.");
  }

  if (!body.size || !SIZES.includes(body.size)) {
    errors.push(`El campo talla debe ser uno de: ${SIZES.join(", ")}.`);
  }

  if (typeof body.stock !== "number" || !Number.isInteger(body.stock) || body.stock < 0) {
    errors.push("El campo stock debe ser un entero mayor o igual a 0.");
  }

  if (body.color !== undefined && typeof body.color !== "string") {
    errors.push("El campo color es obligatorio y debe ser una cadena.");
  }
  
  if (body.imageURL !== undefined && typeof body.imageURL !== "string") {
    errors.push("El campo imageURL es obligatorio y debe ser una cadena.");
  }

  return errors;
}