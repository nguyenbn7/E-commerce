import UserButton from "@/features/auth/components/user-button";
import Navigation from "./navigation";
import StoreSwicher from "@/features/stores/components/store-swicher";
import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export default async function Navbar() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  const stores = await db
    .selectFrom("store as s")
    .where("s.user_id", "=", user.id)
    .select([
      "s.id",
      "s.name",
      "s.created_at as createdAt",
      "s.updated_at as updatedAt",
      "s.user_id as userId",
    ])
    .execute();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwicher items={stores} />

        <Navigation className="mx-6" />

        <div className="ml-auto flex items-center space-x-4">
          <UserButton />
        </div>
      </div>
    </div>
  );
}
