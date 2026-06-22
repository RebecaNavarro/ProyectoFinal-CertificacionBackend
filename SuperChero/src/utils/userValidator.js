const ROLES = ["admin", "cliente"];

export function validateRegisterBody(body) {

  const errors = [];

  if (!body.name || typeof body.name !== "string" || body.name.trim() === "") {
    errors.push("El campo nombre es obligatorio.");
  }

  if (!body.email || typeof body.email !== "string" || !body.email.includes("@")) {
    errors.push("El campo email es obligatorio y debe ser un correo válido.");
  }

  if (!body.password || typeof body.password !== "string" || body.password.length < 6) {
    errors.push("El campo contraseña es obligatorio y debe tener al menos 6 caracteres.");
  }

  if (body.role !== undefined && !ROLES.includes(body.role)) {
    errors.push("El campo rol debe ser 'admin' o 'cliente'.");
  }

  return errors;
}

export function validateLoginBody(body) {
  
  const errors = [];

  if (!body.email || typeof body.email !== "string") {
    errors.push("El campo email es obligatorio.");
  }

  if (!body.password || typeof body.password !== "string") {
    errors.push("El campo contraseña es obligatorio.");
  }

  return errors;
}