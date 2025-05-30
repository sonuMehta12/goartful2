"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  User,
  Bell,
  Heart,
  CalendarDays,
  BarChart2,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
  Menu as MenuIcon,
  Briefcase,
  LogIn,
  Sparkles,
} from "lucide-react"; // Ensure all used icons are imported
import { useAuth } from "@/components/auth/AuthContext";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import GoogleIcon from "@/components/icons/GoogleIcon";
import type { UserProfile } from "@/components/auth/AuthContext"; // Or from lib/types/user.ts

export default function UserMenu() {
  const { user, userProfile, loading, signOut, signInWithGoogle } = useAuth();

  // Type assertion is okay here if you are confident userProfile will conform,
  // but often safer to access properties with optional chaining if they might be missing
  // from a partially loaded profile. However, your AuthContext logic aims to provide a full UserProfile.
  const safeUserProfile = userProfile as UserProfile | null;

  if (loading) {
    return (
      // Placeholder for the combined Avatar + MenuIcon trigger
      <div className="flex items-center gap-x-2 px-2.5 py-1.5 h-10 rounded-full border">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-5 w-5 ml-1" />
      </div>
    );
  }

  // --- LOGGED-OUT STATE ---
  if (!user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 border"
            aria-label="Open menu"
          >
            <MenuIcon className="h-5 w-5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end" forceMount>
          <DropdownMenuItem
            onClick={signInWithGoogle}
            className="cursor-pointer font-semibold text-primary focus:text-primary focus:bg-primary/10" // Made font-semibold for prominence
          >
            <GoogleIcon className="mr-2 h-4 w-4" />
            Login / Sign Up
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/join-artful">
              <Briefcase className="mr-2 h-4 w-4" />
              <span>Become a Host</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/how-it-works">
              <Sparkles className="mr-2 h-4 w-4" />
              <span>How GoArtful Works</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/help-center">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help Center</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // --- LOGGED-IN STATE ---
  const getInitials = (name?: string | null, email?: string | null): string => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return "U";
  };

  const displayName =
    safeUserProfile?.displayName || user.displayName || "User";
  const displayEmail = safeUserProfile?.email || user.email || ""; // Default to empty string if no email
  const displayAvatar = safeUserProfile?.photoURL || user.photoURL;
  const initials = getInitials(displayName, displayEmail);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline" // Changed to outline for consistency
          className="relative flex items-center gap-x-2 px-2 py-1.5 h-10 rounded-full hover:bg-accent focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1"
          aria-label="User menu"
        >
          <Avatar className="h-8 w-8">
            {displayAvatar && (
              <AvatarImage src={displayAvatar} alt={displayName} />
            )}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="h-full flex items-center border-l border-border pl-2 ml-1">
            {" "}
            {/* Adjusted padding/margin */}
            <MenuIcon className="h-5 w-5 text-muted-foreground" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-3 p-1">
            {" "}
            {/* Reduced padding a bit */}
            <Avatar className="h-9 w-9">
              {displayAvatar && (
                <AvatarImage src={displayAvatar} alt={displayName} />
              )}
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-0.5">
              <p className="text-sm font-medium leading-none truncate">
                {displayName}
              </p>
              <p className="text-xs leading-none text-muted-foreground truncate">
                {displayEmail}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile/me">
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/wishlist">
              <Heart className="mr-2 h-4 w-4" />
              <span>Wishlist</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/notifications">
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
              {/* TODO: Add notification count badge if needed */}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/my-experiences">
              {" "}
              {/* Renamed for clarity */}
              <CalendarDays className="mr-2 h-4 w-4" />
              <span>My Experiences</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        {/* Artist Specific Section */}
        {safeUserProfile?.role === "artist" &&
          safeUserProfile?.profileComplete && (
            <>
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1.5">
                  Artist Tools
                </DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/artist">
                    <BarChart2 className="mr-2 h-4 w-4" />
                    <span>Artist Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/create-event">
                    {" "}
                    {/* Or your specific artist event creation path */}
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Create Experience</span>
                  </Link>
                </DropdownMenuItem>
                {/* Link for hosted experiences might be same as dashboard or a sub-page */}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </>
          )}

        {/* Become a Host / Complete Artist Profile Section */}
        {(safeUserProfile?.role !== "artist" ||
          (safeUserProfile?.role === "artist" &&
            !safeUserProfile?.profileComplete)) && (
          <>
            <DropdownMenuItem asChild>
              <Link
                href={
                  safeUserProfile?.role === "artist" &&
                  !safeUserProfile?.profileComplete
                    ? "/onboarding/artist/profile"
                    : "/join-artful"
                }
              >
                <Briefcase className="mr-2 h-4 w-4" />
                <span>
                  {safeUserProfile?.role === "artist" &&
                  !safeUserProfile?.profileComplete
                    ? "Complete Artist Profile"
                    : "Become a Host"}
                </span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/help-center">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help Center</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={signOut}
          className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
