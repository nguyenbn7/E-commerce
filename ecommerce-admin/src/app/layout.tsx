import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import QueryProviders from "./query-providers";

const inter = Inter({ subsets: ["latin"] });

const { NEXT_PUBLIC_APP_NAME } = process.env;
const APP_NAME = NEXT_PUBLIC_APP_NAME ?? "E-commerce";

export const metadata: Metadata = {
  title: {
    template: `%s - ${APP_NAME}`,
    default: `Admin Dashboard - ${APP_NAME}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "antialiased md:subpixel-antialiased min-h-screen bg-gray-50 dark:bg-gray-900"
        )}
      >
        <QueryProviders>{children}</QueryProviders>
      </body>
    </html>
  );
}
