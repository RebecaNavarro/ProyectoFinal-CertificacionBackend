import { verifyToken } from "../utils/token.js";

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = Error("Token no proporcionado");
    error.statusCode = 401;
    return next(error);
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = verifyToken(token);
    req.user = payload; // { id, role }
    next();
  } catch (err) {
    const error = Error("Token inválido o expirado");
    error.statusCode = 401;
    return next(error);
  }
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      const error = Error("No tienes permiso para realizar esta acción");
      error.statusCode = 403;
      return next(error);
    }
    next();
  };
}