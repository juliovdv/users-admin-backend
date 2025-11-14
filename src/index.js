// index.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import usersRouter from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Auth Admin Backend running 🚀" });
});

// Rutas protegidas
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Exportar la app para Vercel
export default app;