// src/middleware/errorHandler.js

// Middleware global de manejo de errores
export const errorHandler = (err, req, res, next) => {
  console.error("⚠️ Error atrapado por middleware:", err);

  // Si el error viene de Supabase o algo con .message
  const message = err.message || "Error interno del servidor";

  // Si el error tiene status personalizado, úsalo; si no, 500
  const status = err.status || 500;

  res.status(status).json({
    success: false,
    error: message,
  });
};
