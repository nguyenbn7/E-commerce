import type { Metadata } from "next";
import { Card, CardTitle } from "@/components/ui/card";
import SignInForm from "@/features/auth/components/sign-in-form";
import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign in",
};

export default async function SignInPage() {
  const user = await getCurrent();
  if (user) redirect("/");

  return (
    <Card className="p-6 space-y-4 md:space-y-6 sm:p-8 w-full md:w-[487px]">
      <CardTitle className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        E-commerce Dashboard
      </CardTitle>
      <SignInForm />
    </Card>
  );
}
