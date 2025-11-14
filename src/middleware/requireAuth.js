// middleware/requireAuth.js
import { supabasePublic } from "../lib/supabase.js";

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ error: "Falta el token" });

  const token = authHeader.replace("Bearer ", "");

  const { data, error } = await supabasePublic.auth.getUser(token);

  if (error || !data.user)
    return res.status(401).json({ error: "Token inválido" });

  req.user = data.user;
  next();
};
