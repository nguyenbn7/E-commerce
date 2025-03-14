import { getCurrent } from "@/features/auth/actions";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface SetupLayoutProps {
  children: React.ReactNode;
}

export default async function SetupLayout({ children }: SetupLayoutProps) {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  const store = await db
    .selectFrom("store as s")
    .where("s.user_id", "=", user.id)
    .select(["s.id"])
    .executeTakeFirst();

  if (store) redirect(`/${store.id}`);

  return <>{children}</>;
}
