import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ComingSoonProvider } from "@/components/ui/ComingSoonContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Antoine Battle",
  description: "Antoine Battle is a global education expert and founder of Global Education Alliance. He is dedicated to advancing global education across borders and empowering individuals to achieve their full potential",
  keywords: [
    "Antoine Battle",
    "global education",
    "education expert",
    "global education alliance",
    "global education expert",
    "global education leader",
    "global education advocate",
    "global education ambassador",
    "global education pioneer",
    "global education innovator",
  ],
  authors: [{ name: "Antoine Battle" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ComingSoonProvider>
          {children}
        </ComingSoonProvider>
      </body>
    </html>
  );
}
