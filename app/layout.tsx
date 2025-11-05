import React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { GameProvider } from "@/lib/providers/GameProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bihar Election 2025 Simulation",
  description: "Election simulation: Outsmart Bihar netas. Test your Chanakya skills.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
