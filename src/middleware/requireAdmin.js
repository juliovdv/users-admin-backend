// src/middleware/requireAdmin.js
import { supabase } from "../lib/supabase.js";

export const requireAdmin = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      // el usuario no está autenticado correctamente
      throw { status: 401, message: "Usuario no autenticado" };
    }

    // ✅ Nueva forma
    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
            id,
            display_name,
            profile_roles (
              role_id,
              roles (
                name
              )
            )
          `
      )
      .eq("auth_user_id", user.id)
      .single();

    if (error) {
      console.error("Supabase error (requireAdmin):", error.message);
      throw { status: 500, message: "Error al verificar el rol de usuario" };
    }

    if (!data) {
      throw { status: 403, message: "No tienes perfil válido" };
    }

    if (data.role !== "admin" && data.role !== "super_admin") {
      throw { status: 403, message: "No tienes permisos suficientes" };
    }

    // Si todo está bien, continúa
    next();
  } catch (err) {
    next(err); // pasa el error al middleware global
  }
};
