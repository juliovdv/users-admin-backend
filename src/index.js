import express from "express";
import cors from "cors";
import usersRouter from "./routes/users.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Auth Admin Backend running 🚀" });
});

app.use("/users", usersRouter);

// ❗ NO app.listen() — Vercel lo maneja automáticamente

export default app;
