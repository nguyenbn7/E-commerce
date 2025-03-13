import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4 min-h-screen flex flex-col items-center justify-center">
        {children}
      </div>
    </main>
  );
}
