// src/middleware/corsConfig.js
import cors from "cors";

const allowedOrigins = [
  "https://tu-frontend.vercel.app", // dominio de producción
  "http://localhost:5173",          // entorno local (por ejemplo, Vite)
];

export const corsConfig = cors({
  origin: (origin, callback) => {
    // Permitir peticiones sin 'origin' (por ejemplo, desde Postman o cURL)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Origen no permitido por CORS"));
    }
  },
  credentials: true, // permite enviar cookies o headers de autenticación
});
