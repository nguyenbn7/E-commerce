import { cookies } from "next/headers";
import { ACCESS_TOKEN } from "./constants";
import { validateAccessToken } from "./server/service";

export async function getCurrent() {
  const accessToken = (await cookies()).get(ACCESS_TOKEN);

  if (!accessToken) return;

  return validateAccessToken(accessToken.value);
}
