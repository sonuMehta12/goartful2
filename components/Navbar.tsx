// components/Navbar.tsx
import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-7xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          {/* You can add an SVG logo here if you have one */}
          <span className="font-bold">goArful</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-4">
          {/* Example nav link */}
          {/* <Link href="/events" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Events
          </Link> */}
        </nav>
        <div className="flex items-center justify-end space-x-2">
          <ThemeToggle />
          {/* Placeholder for Auth Button if needed */}
        </div>
      </div>
    </header>
  );
}