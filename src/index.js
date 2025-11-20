import express from "express";
import helmet from "helmet";
import { corsConfig } from "./middleware/corsConfig.js";
import { rateLimiter } from "./middleware/rateLimit.js";
import { errorHandler } from "./middleware/errorHandler.js";
import usersRouter from "./routes/users.js";

const app = express();

// 🛡️ Middlewares globales
app.use(corsConfig);
app.use(helmet());
app.use(rateLimiter);
app.disable("x-powered-by");
app.use(express.json());

// 🧭 Rutas
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Auth Admin Backend running 🚀" });
});

app.use("/users", usersRouter);

// ⚠️ Middleware de manejo global de errores (último siempre)
app.use(errorHandler);

export default app;
