import type { Metadata } from "next";
import { getCurrent } from "@/features/auth/actions";
import SetupPrompt from "@/features/stores/components/setup-prompt";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Setup",
};

export default async function SetupPage() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");
  
  return <SetupPrompt />;
}
