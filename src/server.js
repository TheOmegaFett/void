import express from "express";
import path from "path";
import { fileURLToPath } from "url";

/**
 * Express application module.
 *
 * Responsibilities:
 * - Expose a lightweight health endpoint for monitoring.
 * - Serve static assets from the public directory.
 *
 * @module server
 */

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, "..", "public");

/**
 * Build the JSON payload returned by the health endpoint.
 *
 * @param {string|undefined} [nodeEnv=process.env.NODE_ENV] - Current runtime environment.
 * @returns {{ok: boolean, env: string}} Health payload for load balancers and smoke tests.
 */
export function getHealthPayload(nodeEnv = process.env.NODE_ENV) {
  return { ok: true, env: nodeEnv || "unknown" };
}

/**
 * Express route handler for health checks.
 *
 * @param {object} _req - Incoming request.
 * @param {object} res - HTTP response object.
 * @returns {object} JSON response with health status.
 */
export function handleHealthCheck(_req, res) {
  return res.status(200).json(getHealthPayload());
}

app.get("/health", handleHealthCheck);

// Serve the visual app and all static assets.
app.use(express.static(PUBLIC_DIR));

export default app;
