import "@/styles/globals.css";
import { Inter, JetBrains_Mono, Instrument_Sans, Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./ctx/providers";
import { type PropsWithChildren } from "react";
import { type Metadata } from "next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jet = JetBrains_Mono({
  variable: "--font-jet",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const instrument = Instrument_Sans({
  variable: "--font-inst",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FastInsure Technologies",
  description: "v10",
  icons: [{ rel: "icon", url: "/svg/logo_v2.svg" }],
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${inter.variable} ${jet.variable} ${geist.variable} ${mono.variable} antialiased`}
    >
      <link rel="dns-prefetch" href="https://identitytoolkit.googleapis.com" />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
