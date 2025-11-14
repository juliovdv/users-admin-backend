// middleware/requireAdmin.js
import { supabase } from "../lib/supabase.js";

export const requireAdmin = async (req, res, next) => {
  const userId = req.user.id;
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("auth_user_id", userId)
    .single();

  if (error || !data)
    return res.status(403).json({ error: "No tienes perfil válido" });

  if (data.role !== "admin" && data.role !== "super_admin")
    return res.status(403).json({ error: "No tienes permisos" });

  next();
};
