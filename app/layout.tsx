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
import Image from "next/image";

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
      <script
        dangerouslySetInnerHTML={{
          __html: `
              !function(f,b,e,v,n,t,s) {
                if (f.fbq) return;
                n=f.fbq=function(){
                  n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                };
                if (!f._fbq) f._fbq=n;
                n.push=n;
                n.loaded=!0;
                n.version='2.0';
                n.queue=[];
                t=b.createElement(e);
                t.async=!0;
                t.src=v;
                s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)
              }(window, document,'script', 'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1271271444528924');
              fbq('track', 'PageView');
            `,
        }}
      />
      <noscript>
        <Image
          height="1"
          width="1"
          alt="Facebook Pixel"
          className="hidden"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1271271444528924&ev=PageView&noscript=1"
        />
      </noscript>
      {/* End Meta Pixel Code */}
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
