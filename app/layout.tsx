// app/layout.tsx
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactNode, Suspense } from "react"; // <<< IMPORT Suspense
import { cn } from "@/lib/utils";
import GoogleTagManager from "@/components/GoogleTagManager"; // <<< IMPORT THE GTM COMPONENT

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "goVibeful - Live through art",
  description: "Find and explore artful events happening around you",
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
      {/* The GTM script component does not need to be in the <head> here */}
      {/* The `next/script` component will handle placement correctly. */}
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        {/* Wrap body contents in Suspense */}
        <Suspense>
          <GoogleTagManager />
        </Suspense>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-grow pt-0">{children}</main>
              <Footer />
            </div>
            <Toaster richColors position="top-right" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}