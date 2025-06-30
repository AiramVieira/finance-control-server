import { Hono } from "hono";
import { cors } from "hono/cors";
import { connectDatabase } from "./database/connection.ts";
import finances from "./routes/finances.ts";
import health from "./routes/health-check.ts";

connectDatabase();

const app = new Hono();

app.use("/*", cors());

app.route("/api/health", health);

app.route("/api/finances", finances);

Bun.serve({
  fetch: app.fetch,
  port: process.env.PORT || 3000,
});
