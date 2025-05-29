// components/Footer.tsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} goArful. All rights reserved.
        </p>
        {/* Add other footer content like social media links if desired */}
        <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Explore Art. Live Artfully.</span>
        </div>
      </div>
    </footer>
  );
}