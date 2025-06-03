// app/layout.tsx
import "./globals.css"; // Your global styles
import { AuthProvider } from "@/components/auth/AuthContext"; // Your AuthProvider
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"; // Or your preferred toaster
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar"; // <<< IMPORT THE NEW NAVBAR
import Footer from "@/components/Footer"; // Your Footer component
import { ReactNode } from "react";
import { cn } from "@/lib/utils"; // Utility function for classnames

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "goArful - Live through art",
  description: "Find and explore events happening around you",
  icons: {
    icon: "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1748969808/Artful_Icon_n7sv2v.png",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system" // Or your preferred default
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar /> {/* <<< USE THE NEW NAVBAR HERE */}
              <main className="flex-grow pt-0">
                {" "}
                {/* Adjusted main */}
                {/* Content from page.tsx will go here. */}
                {/* The container for page content should be in individual page.tsx files or a sub-layout */}
                {children}
              </main>
              <Footer />
            </div>
            <Toaster richColors position="top-right" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
