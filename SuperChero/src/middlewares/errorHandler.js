export function errorHandler(err, req, res, next) {
  if (err.name === "CastError") {
    return res.status(400).json({ error: `Valor inválido para el campo '${err.path}'` });
  }
  if (err.name === "ValidationError") {
    const mensajes = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ error: mensajes.join(" ") });
  }
  if (err.code === 11000) {
    const campo = Object.keys(err.keyValue)[0];
    return res.status(409).json({ error: `Ya existe un registro con ese '${campo}'` });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ error: err.message || "Error interno del servidor" });
}