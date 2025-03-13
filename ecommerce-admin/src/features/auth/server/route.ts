import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";
import { loginSchema } from "../schemas";
import { authenticate } from "./user-manager.server";
import { generateAccessToken, generateExpiresAt } from "./service";
import { ACCESS_TOKEN } from "../constants";
import { sessionMiddleware } from "@/lib/session-middleware";

const app = new Hono();

const routes = app
  .get("/current", sessionMiddleware, (c) => {
    // TODO: exclude password field
    const user = c.get("user");

    return c.json({ data: user });
  })
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { username, password } = c.req.valid("json");

    const user = await authenticate(username, password);

    if (!user) return c.json({ error: "Unauthorized" }, { status: 401 });

    const expiresAt = generateExpiresAt();
    const accessToken = await generateAccessToken(user, expiresAt);

    setCookie(c, ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: expiresAt,
      path: "/",
    });

    return c.json({ success: true });
  })
  .post("/logout", sessionMiddleware, async (c) => {
    setCookie(c, ACCESS_TOKEN, "", {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: 0,
      path: "/",
    });

    return c.json({ success: true });
  });

export default routes;
