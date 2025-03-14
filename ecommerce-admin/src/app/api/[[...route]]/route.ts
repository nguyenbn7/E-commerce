import { Hono } from "hono";
import { handle } from "hono/vercel";

import auth from "@/features/auth/server/route";
import stores from "@/features/stores/server/route";

const app = new Hono()
  .basePath("/api")
  .route("/auth", auth)
  .route("/stores", stores);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof app;
