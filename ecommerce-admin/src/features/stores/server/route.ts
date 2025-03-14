import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { setupSchema } from "../schemas";
import { db } from "@/lib/db";
import { sql } from "kysely";

const app = new Hono().post(
  "/",
  sessionMiddleware,
  zValidator("json", setupSchema),
  async (c) => {
    const { name } = c.req.valid("json");
    const user = c.get("user");

    await db
      .insertInto("store")
      .values({
        name,
        user_id: user.id,
        updated_at: sql`CURRENT_TIMESTAMP`, // TODO: remove this
      })
      .execute();

    return c.json({});
  }
);

export default app;
