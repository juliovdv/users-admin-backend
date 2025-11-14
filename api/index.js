// api/index.js
import app from "../src/index.js";
import { createServer } from "@vercel/node";

export default createServer(app);
