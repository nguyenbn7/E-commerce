import "server-only";

import { db } from "@/lib/db";
import bcrypt from "bcrypt";

function normalizeUsername(username: string) {
  return username.trim().normalize("NFKC");
}

async function makePassword(
  password: string,
  saltOrRounds: string | number = 12
) {
  return bcrypt.hash(password, saltOrRounds);
}

async function checkPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export async function createUser(
  user: { username: string; name: string },
  password: string
) {
  password = await makePassword(password);

  return db
    .insertInto("user")
    .values({
      username: normalizeUsername(user.username),
      name: user.name.trim(),
      password,
      is_active: true,
    })
    .returningAll()
    .executeTakeFirst();
}

export async function createSuperuser(
  user: { username: string; name: string },
  password: string
) {
  password = await makePassword(password);

  return db
    .insertInto("user")
    .values({
      username: normalizeUsername(user.username),
      name: user.name.trim(),
      password,
      is_active: true,
      is_staff: true,
      is_superuser: true,
    })
    .returningAll()
    .executeTakeFirst();
}

async function getUserByUsername(username: string) {
  return db
    .selectFrom("user as u")
    .where("u.username", "=", normalizeUsername(username))
    .select([
      "u.id",
      "u.username",
      "u.name",
      "u.password",
      "u.is_active as isActive",
      "u.is_superuser as isSuperuser",
      "u.is_staff as isStaff",
      "u.created_at as createdAt",
    ])
    .executeTakeFirst();
}

export async function authenticate(username: string, password: string) {
  const user = await getUserByUsername(username);

  if (!user) return null;

  const sameAsHashedPassword = await checkPassword(password, user.password);
  if (!sameAsHashedPassword) return null;

  return user;
}
