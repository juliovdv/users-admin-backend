// src/middleware/validateRequest.js
import { z } from "zod";

// ✨ Validación para POST /users/create
export const validateCreateUser = (req, res, next) => {
  const schema = z.object({
    email: z.string().email({ message: "Email inválido" }),
    password: z
      .string()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  });

  try {
    schema.parse(req.body); // lanza error si no pasa validación
    next();
  } catch (err) {
    // err.errors es un array de errores de Zod
    const message = err.errors ? err.errors.map(e => e.message).join(", ") : "Datos inválidos";
    next({ status: 400, message });
  }
};

// ✨ Validación para DELETE /users/:id
export const validateDeleteUser = (req, res, next) => {
  const schema = z.object({
    id: z.string().uuid({ message: "ID de usuario inválido" }),
  });

  try {
    schema.parse(req.params);
    next();
  } catch (err) {
    const message = err.errors ? err.errors.map(e => e.message).join(", ") : "Datos inválidos";
    next({ status: 400, message });
  }
};
