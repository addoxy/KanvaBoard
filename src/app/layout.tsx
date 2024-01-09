import "@/styles/globals.css";
import Providers from "@/utils/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { cn } from "../utils/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KanvaBoard",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-zinc-950",
          inter.className,
          process.env.NODE_ENV === "development" && "debug-screens"
        )}
      >
        <Toaster position="top-right" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
