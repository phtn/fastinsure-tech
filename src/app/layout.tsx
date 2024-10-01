"use client";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Inter } from "next/font/google";
import { Providers } from "./_ctx/providers";
import { type ReactElement } from "react";
import { useAuthState } from "@/lib/auth/useAuthState";
import { auth } from "@/lib/db";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

interface RootProps {
  authd: ReactElement;
  guest: ReactElement;
}

export default function RootLayout({ authd, guest }: Readonly<RootProps>) {
  const { user } = useAuthState(auth);
  return (
    <html
      lang="en"
      className={`font-sans ${inter.variable} ${GeistSans.variable} antialiased`}
    >
      <body className="bg-background text-foreground light">
        <Providers>{user?.uid ? authd : guest}</Providers>
      </body>
    </html>
  );
}
