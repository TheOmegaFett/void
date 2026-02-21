import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true, env: process.env.NODE_ENV || "unknown" });
});

app.use(express.static(path.join(__dirname, "..", "public")));

export default app;
