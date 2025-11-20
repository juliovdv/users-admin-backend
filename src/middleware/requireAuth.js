// src/middleware/requireAuth.js
import { supabasePublic } from "../lib/supabase.js";

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw { status: 401, message: "Falta el token de autorización" };
    }

    const token = authHeader.replace("Bearer ", "").trim();
    if (!token) {
      throw { status: 401, message: "Token inválido o vacío" };
    }

    const { data, error } = await supabasePublic.auth.getUser(token);

    if (error) {
      console.error("Supabase error (requireAuth):", error.message);
      throw { status: 401, message: "Error al validar el token" };
    }

    if (!data?.user) {
      throw { status: 401, message: "Token no válido o usuario inexistente" };
    }

    // Si todo está bien, guardamos el usuario autenticado en req.user
    req.user = data.user;
    next();
  } catch (err) {
    next(err); // pasa el error al middleware global
  }
};
