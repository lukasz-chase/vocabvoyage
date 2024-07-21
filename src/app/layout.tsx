import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import { ExitModal } from "@/components/modals/exitModal";
import { HeartsModal } from "@/components/modals/heartsModal";
import { PracticeModal } from "@/components/modals/practiceModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VocabVoyage",
  description: "Learn new languages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={cn("h-screen", inter.className)}>
          <Toaster />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
