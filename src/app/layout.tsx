import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { Inter, JetBrains_Mono, Instrument_Sans } from "next/font/google";
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
      className={`${instrument.variable} ${inter.variable} ${jet.variable} ${GeistSans.variable} antialiased`}
    >
      <body className={`bg-background text-foreground light`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
