import app from "./server.js";

/**
 * HTTP entrypoint module.
 *
 * Starts the Express application using Cloud Run compatible defaults.
 * @module index
 */

const DEFAULT_PORT = 8080;

/**
 * Start the HTTP server.
 *
 * @param {number|string} [port=process.env.PORT || 8080] - Port to bind.
 * @returns {object} Active Node.js HTTP server.
 */
export function startServer(port = process.env.PORT || DEFAULT_PORT) {
  const resolvedPort = Number(port) || DEFAULT_PORT;
  return app.listen(resolvedPort, () => {
    console.log(`Server listening on ${resolvedPort}`);
  });
}

// Prevent accidental auto-start when the module is imported by tests/tools.
if (process.env.NODE_ENV !== "test") {
  startServer();
}
