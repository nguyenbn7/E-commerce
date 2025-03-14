import Navbar from "@/components/navbar";
import { getCurrent } from "@/features/auth/actions";
import { storeIdSchema } from "@/features/stores/schemas";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: Promise<{ storeId: string }>;
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  const { storeId } = await params;

  const result = await storeIdSchema.safeParseAsync(storeId);

  if (!result.success) redirect("/");

  const store = await db
    .selectFrom("store as s")
    .where("s.id", "=", result.data)
    .select(["s.id"])
    .executeTakeFirst();

  if (!store) redirect("/");

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
