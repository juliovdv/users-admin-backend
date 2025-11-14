import express from "express";
import { supabase } from "../lib/supabase.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = express.Router();

// Crear usuario
router.post("/create", requireAuth, requireAdmin, async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  });

  if (error) return res.status(400).json({ error });

  res.json({ user: data.user });
});

// Listar usuarios (solo admins)
router.get("/", requireAuth, requireAdmin, async (req, res) => {
  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) return res.status(400).json({ error });

  res.json(data.users);
});

// Borrar usuario (si lo necesitás)
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  const userId = req.params.id;

  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) return res.status(400).json({ error });

  res.json({ deleted: true });
});

export default router;

