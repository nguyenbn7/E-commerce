import type { Metadata } from "next";
import SetupPrompt from "@/features/stores/components/setup-prompt";

export const metadata: Metadata = {
  title: "Setup",
};

export default async function SetupPage() {
  return <SetupPrompt />;
}
