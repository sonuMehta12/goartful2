// components/event-detail/FloatingBookingBarClient.tsx
"use client";

import { Button } from "@/components/ui/button";
import { TicketIcon as Ticket, Heart, Share2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import type { Event } from "@/lib/types/event";
import { formatCurrency, cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";

interface FloatingBookingBarClientProps {
  event: Pick<
    Event,
    | "name"
    | "price"
    | "currency"
    | "isFree"
    | "upcomingDates" // To determine if generally bookable
    | "policies"
    | "slug"
  >;
  // Removed mainBookingCardId as we simplify scroll logic
}

export default function FloatingBookingBarClient({
  event,
}: FloatingBookingBarClientProps) {
  const [isVisible, setIsVisible] = useState(false);
  const isMounted = useRef(false);
  const [isWishlisted, setIsWishlisted] = useState(false); // Local wishlist state

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Simplified visibility logic: show when scrolled past a certain point (e.g., 300px or hero height)
  useEffect(() => {
    const heroElement = document.getElementById("event-hero-media"); // Assuming hero has this ID

    const toggleVisibility = () => {
      if (!isMounted.current) return;
      const scrollY = window.pageYOffset;
      const heroHeight = heroElement ? heroElement.offsetHeight : 300; // Default if hero not found

      // Show if scrolled past ~70% of hero or a fixed amount, and on screens smaller than lg
      if (scrollY > heroHeight * 0.7 && window.innerWidth < 1024) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility(); // Initial check
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleBookViaWhatsApp = () => {
    const firstAvailableSession = event.upcomingDates?.find(
      (s) =>
        (s.spotsLeft ?? Infinity) > 0 &&
        s.status !== "sold-out" &&
        s.status !== "cancelled"
    );
    const sessionDetail = firstAvailableSession
      ? ` for ${format(parseISO(firstAvailableSession.date), "MMM dd")} at ${
          firstAvailableSession.startTime
        }`
      : " (general inquiry)";

    const message = `Hi! I'd like to inquire about booking the event "${event.name}"${sessionDetail}.`;
    const whatsappNumber = "919650779490"; // YOUR WHATSAPP NUMBER
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShare = async () => {
    /* ... (keep your existing handleShare logic) ... */
    const shareUrl = `${window.location.origin}/events/${event.slug}`;
    const shareTitle = event.name;
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: `Check out this event: ${shareTitle}`,
          url: shareUrl,
        });
      } catch (error) {
        navigator.clipboard
          .writeText(shareUrl)
          .then(() => alert("Event link copied to clipboard!"));
      }
    } else {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => alert("Event link copied to clipboard!"));
    }
  };

  if (!isMounted.current || !isVisible) {
    return null;
  }

  const isCurrentlyBookable =
    event.isFree ||
    event.upcomingDates?.some(
      (s) =>
        (s.spotsLeft ?? Infinity) > 0 &&
        s.status !== "sold-out" &&
        s.status !== "cancelled"
    );

  const policyText =
    event.policies?.cancellation?.split(".")[0] || // First sentence
    (event.policies?.cancellation?.toLowerCase().includes("rain or shine")
      ? "Event is rain or shine."
      : "See cancellation policy.");

  return (
    <div className="fixed bottom-0 left-0 right-0 lg:hidden z-50 p-3 bg-background border-t border-border shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-2.5">
        {/* Price Info */}
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">
            {event.isFree ? "Entry" : "From"}
          </span>
          <span className="text-lg font-bold text-foreground leading-tight">
            {event.isFree
              ? "FREE"
              : formatCurrency(event.price, event.currency)}
          </span>
        </div>

        {/* Save and Share Icons */}
        <div className="flex items-center space-x-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="h-9 w-9 text-muted-foreground hover:text-primary"
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-colors",
                isWishlisted && "fill-primary text-primary"
              )}
            />
            <span className="sr-only">{isWishlisted ? "Saved" : "Save"}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            className="h-9 w-9 text-muted-foreground hover:text-primary"
          >
            <Share2 className="h-5 w-5" />
            <span className="sr-only">Share</span>
          </Button>
        </div>
      </div>

      {/* Main CTA Button */}
      <Button
        onClick={handleBookViaWhatsApp}
        className={cn(
          "w-full font-semibold py-2.5 text-[15px] shadow-md h-11", // Slightly smaller text
          !isCurrentlyBookable &&
            "bg-muted text-muted-foreground hover:bg-muted cursor-not-allowed"
        )}
        size="lg"
        disabled={!isCurrentlyBookable}
      >
        <Ticket className="w-4 h-4 mr-1.5" />
        {!isCurrentlyBookable
          ? "Currently Unavailable"
          : event.isFree
          ? "Register / Inquire"
          : "Book / Inquire"}
      </Button>

      {/* Policy Text */}
      {policyText && (
        <p className="text-[11px] text-muted-foreground text-center mt-1.5 leading-tight px-1">
          {policyText}
        </p>
      )}
    </div>
  );
}
