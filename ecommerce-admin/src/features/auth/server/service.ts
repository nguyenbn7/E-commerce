import "server-only";
import type { User } from "@prisma/client";
import * as jose from "jose";
import { db } from "@/lib/db";

const alg = "HS256";
const { NEXT_PUBLIC_APP_NAME, SECRET } = process.env;

const secret = new TextEncoder().encode(SECRET);

export function generateExpiresAt(seconds: number = 3600 /** 1 hour */) {
  const expiresAtMillis = Date.now() + seconds * 1000;
  return new Date(expiresAtMillis);
}

export async function generateAccessToken(user: User, expiresAt: Date) {
  return new jose.SignJWT({ id: user.id })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer(NEXT_PUBLIC_APP_NAME!)
    .setAudience(NEXT_PUBLIC_APP_NAME!)
    .setExpirationTime(expiresAt)
    .sign(secret);
}

export async function validateAccessToken(token: string) {
  try {
    const verifiedToken = await jose.jwtVerify(token, secret, {
      issuer: NEXT_PUBLIC_APP_NAME,
      audience: NEXT_PUBLIC_APP_NAME,
    });

    const userId = Number(verifiedToken.payload.id) ?? -1;

    return db
      .selectFrom("user as u")
      .where("u.id", "=", userId)
      .select([
        "u.id",
        "u.username",
        "u.name",
        "u.is_active as isActive",
        "u.is_superuser as isSuperuser",
        "u.is_staff as isStaff",
        "u.created_at as createdAt",
      ])
      .executeTakeFirst();
  } catch (err) {
    // TODO: handle error or smth
    console.error("validateAuthToken():", err);
  }
  return;
}
