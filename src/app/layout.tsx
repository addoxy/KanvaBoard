import "@/styles/globals.css";
import Providers from "@/utils/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { cn } from "../utils/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KanvaBoard",
  description:
    "A minimal project management app that lets you keep track of and sort your tasks using a drag and drop interface.",
  authors: [{ name: "Addoxy" }],
  category: "Project management",
  colorScheme: "dark",
  keywords: [
    "project",
    "project-management",
    "productivity",
    "productivity-app",
    "productivity-tool",
  ],
  metadataBase: new URL("https://kanvaboard.addoxy.me"),
  openGraph: {
    title: "KanvaBoard",
    description:
      "A minimal project management app that lets you keep track of and sort your tasks using a drag and drop interface.",
    url: "https://kanvaboard.addoxy.me",
    siteName: "KanvaBoard",
    images: [
      {
        url: "https://kanvaboard.addoxy.me/logo.png",
        width: 180,
        height: 180,
      },
    ],
    locale: "en-US",
    type: "website",
  },
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
