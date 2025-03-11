import { db } from "@/lib/db";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

app.get("/test", async (c) => {
  return c.json(await db.test.findMany());
});

export const GET = handle(app);
export const POST = handle(app);
