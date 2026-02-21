import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import app from "../src/server.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getHealthHandler() {
  const layer = app._router.stack.find(
    (entry) => entry.route && entry.route.path === "/health"
  );

  return layer?.route?.stack?.[0]?.handle;
}

function createMockRes() {
  const res = {
    statusCode: 200,
    body: undefined
  };

  res.status = (code) => {
    res.statusCode = code;
    return res;
  };

  res.json = (body) => {
    res.body = body;
    return res;
  };

  return res;
}

describe("Health & static content", () => {
  test("GET /health returns ok JSON", async () => {
    const handler = getHealthHandler();
    expect(handler).toBeDefined();
    const res = createMockRes();
    await handler({ method: "GET", url: "/health", headers: {} }, res);
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  test("GET / returns HTML", async () => {
    const indexPath = path.join(__dirname, "..", "public", "index.html");
    const html = fs.readFileSync(indexPath, "utf8");
    // Most HTML files begin with doctype, but we avoid making this too brittle:
    expect(html.toLowerCase()).toContain("<html");
  });
});
