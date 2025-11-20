// src/middleware/rateLimit.js
import rateLimit from "express-rate-limit";

// ⏱️ Configuración base del limitador global
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // ⏰ 15 minutos
  max: 100, // 🔢 máximo de requests por IP en ese período
  message: { success: false, error: "Demasiadas solicitudes desde esta IP. Intenta de nuevo más tarde." },
  standardHeaders: true, // ✅ Cabeceras informativas ('RateLimit-*')
  legacyHeaders: false, // ❌ Evita cabeceras obsoletas ('X-RateLimit-*')
  handler: (req, res, next, options) => {
    console.warn(
      `🚫 Rate limit alcanzado: IP=${req.ip}, ruta=${req.originalUrl}`
    );
    res.status(options.statusCode).json(options.message);
  },
});
