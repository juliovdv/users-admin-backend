import { createClient } from "@supabase/supabase-js";
// import dotenv from "dotenv";
// dotenv.config();

// Cliente con SERVICE_ROLE_KEY para operaciones de administrador (bypass RLS)
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Cliente público con ANON_KEY para validación de tokens y operaciones que respetan RLS
export const supabasePublic = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
