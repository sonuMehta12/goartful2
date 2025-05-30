// components/Logo.tsx
"use client"; // Required because of useTheme hook

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react"; // For handling theme on client
import { cn } from "@/lib/utils"; // Assuming you have a utility for classNames
export default function Logo({ className }: { className?: string }) {
  const { theme, systemTheme } = useTheme();
  const [currentLogo, setCurrentLogo] = useState("/logo.png"); // Default to light logo

  useEffect(() => {
    // Determine the effective theme (system, light, or dark)
    // 'theme' can be 'system', 'light', or 'dark'
    // 'systemTheme' is the actual theme if 'theme' is 'system'
    const effectiveTheme = theme === "system" ? systemTheme : theme;

    if (effectiveTheme === "dark") {
      setCurrentLogo("/image/logo-dark.png");
    } else {
      setCurrentLogo("/image/logo-light.png");
    }
  }, [theme, systemTheme]);

  return (
    <Link
      href="/"
      aria-label="GoArtful Home"
      className={cn("flex items-center group", className)}
    >
      <div className="relative">
        {" "}
        {/* Added for potential layout needs, though not strictly necessary for just Image */}
        <Image
          key={currentLogo} // Adding a key helps React re-render the Image component correctly when src changes
          src={currentLogo}
          alt="GoArtful Logo"
          width={150} // Base width of your logo image file (e.g., the dimensions of your largest version)
          height={60} // Base height of your logo image file (maintaining aspect ratio)
          className="h-8 w-auto sm:h-9 md:h-10 transition-opacity duration-300 group-hover:opacity-90"
          priority // Good for LCP if logo is prominent
        />
      </div>
      {/* If you want the text "goArtful" next to the logo: */}
      {/* <span className="font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-200 ease-in-out ml-2">
        goArtful
      </span> */}
    </Link>
  );
}
