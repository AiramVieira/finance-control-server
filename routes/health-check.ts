import { Hono } from "hono";
import { getDatabaseStatus } from "../database/connection";

const health = new Hono();

health.get("/check", (c) => {
  const dbStatus = getDatabaseStatus();
  return c.text(
    JSON.stringify({
      status: "ok",
      database: dbStatus,
      timestamp: new Date().toISOString(),
    })
  );
});

export default health;
