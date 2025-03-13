import { Hono } from "hono";
import { setCookie, getCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";
import { loginSchema } from "../schemas";
import { authenticate } from "./user-manager.server";
import {
  generateAccessToken,
  generateExpiresAt,
  validateAccessToken,
} from "./service";
import { ACCESS_TOKEN } from "./constants";

const app = new Hono();

const routes = app
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
  .post("/logout", async (c) => {
    const accessToken = getCookie(c, ACCESS_TOKEN);
    if (!accessToken)
      return c.json({ success: false, error: "Unauthorized" }, 401);

    const user = await validateAccessToken(accessToken);

    if (!user) {
      return c.json({ success: false, error: "Unauthorized" }, 401);
    }
    
    setCookie(c, ACCESS_TOKEN, "", {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: 0,
      path: "/",
    });

    return c.json({ success: true, error: "Unauthorized" }, 401);
  });

export default routes;
