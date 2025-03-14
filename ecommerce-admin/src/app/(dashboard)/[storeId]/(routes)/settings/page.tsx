import { getCurrent } from "@/features/auth/actions";
import SettingsForm from "@/features/settings/components/settings-form";
import { db } from "@/lib/db";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Settings",
};

interface SettingsPageProps {
  params: Promise<{ storeId: string }>;
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  const { storeId } = await params;

  const store = await db
    .selectFrom("store as s")
    .where("s.id", "=", Number(storeId))
    .where("s.user_id", "=", user.id)
    .select([
      "s.id",
      "s.name",
      "s.created_at as createdAt",
      "s.updated_at as updatedAt",
      "s.user_id as userId",
    ])
    .executeTakeFirst();

  if (!store) redirect("/");

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
}
