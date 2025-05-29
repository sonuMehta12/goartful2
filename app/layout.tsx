// app/layout.tsx
import "./globals.css";
// import { AuthProvider } from "@/components/auth/AuthContext"; // We'll create a placeholder
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { Toaster } from "@/components/ui/toaster"; // Ensure you've added toaster via shadcn/ui
// import { ThemeProvider } from "@/components/ThemeProvider"; // We'll create this
// import Navbar from "@/components/Navbar"; // We'll create a placeholder
// import Footer from "@/components/Footer"; // We'll create a placeholder
import { ReactNode } from "react";

// Assuming these components will be created or already exist:
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/components/auth/AuthContext"; // Placeholder path
import { Toaster } from "@/components/ui/sonner"; // shadcn/ui default is Sonner for new projects, or Toaster if you chose that. I'll assume Sonner.
                                                  // If you added `toast` via `shadcn-ui add toast`, it likely set up Sonner.

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" }); // Added variable for Tailwind

export const metadata: Metadata = {
  title: "goArful - Live through art",
  description: "Find and explore events happening around you",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}> {/* Added font-sans and antialiased */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system" /* Recommendation: Use "system" */
          enableSystem /* Recommendation: Enable system preference */
          disableTransitionOnChange
        >
          <AuthProvider> {/* Placeholder AuthProvider */}
            <div className="relative flex min-h-screen flex-col"> {/* Added for sticky footer */}
              <Navbar /> {/* Placeholder Navbar */}
              <main className="container mx-auto max-w-7xl flex-grow px-4 py-8"> {/* Adjusted padding */}
                {children}
              </main>
              <Footer /> {/* Placeholder Footer */}
            </div>
            <Toaster richColors /> {/* Assuming Sonner Toaster */}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}