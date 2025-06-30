// components/Navbar.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import UserMenu from "./UserMenu";
import Logo from "./Logo";
import { useAuth } from "@/components/auth/AuthContext";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { ThemeToggle } from "./ThemeToggle";
import React, { FC } from "react"; // Explicitly import FC if not already

const Navbar: FC = () => {
  const { user, loading, signInWithGoogle } = useAuth();

  const renderMainAuthAction = () => {
    if (loading) {
      return (
        <Button
          disabled
          className="hidden sm:flex w-48 h-10 animate-pulse bg-muted rounded-md"
        ></Button>
      );
    }

    if (!user) {
      // return (
      //   <Button
      //     onClick={signInWithGoogle}
      //     size="lg"
      //     className="hidden sm:flex items-center gap-2"
      //     type="button"
      //   >
      //     <GoogleIcon className="h-5 w-5" />
      //     <span>Login / Sign Up</span>
      //   </Button>
      // );
    }
    return null;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop Navigation Links (Optional - can be added here) */}
          {/* 
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link href="/explore" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Explore
            </Link>
            <Link href="/create" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Create
            </Link>
          </nav>
          */}
          {renderMainAuthAction()}
          <ThemeToggle /> {/* ThemeToggle integrated here */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
