import "server-only";

import type { User as UserModel} from "@prisma/client";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { ACCESS_TOKEN } from "@/features/auth/constants";
import { validateAccessToken } from "@/features/auth/server/service";

type User = Omit<UserModel, "password">;

type SessionEnv = {
  Variables: {
    user: User;
  };
};

export const sessionMiddleware = createMiddleware<SessionEnv>(
  async (c, next) => {
    const accessToken = getCookie(c, ACCESS_TOKEN);
    if (!accessToken) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const user = await validateAccessToken(accessToken);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    c.set("user", user);

    await next();
  }
);
