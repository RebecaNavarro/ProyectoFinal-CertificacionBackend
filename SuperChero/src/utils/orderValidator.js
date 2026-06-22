export function validateOrderBody(body) {
  const errors = [];
  if (!Array.isArray(body.items) || body.items.length === 0) {
    errors.push("El pedido debe contener al menos una prenda en 'items'.");
    return errors;
  }
  body.items.forEach((item, i) => {
    if (!item.clothes) {
      errors.push(`El item ${i + 1} debe incluir el id de la prenda en 'clothes'.`);
    }
    if (typeof item.quantity !== "number" || !Number.isInteger(item.quantity) || item.quantity < 1) {
      errors.push(`El item ${i + 1} debe tener una 'quantity' entera mayor o igual a 1.`);
    }
  });
  return errors;
}