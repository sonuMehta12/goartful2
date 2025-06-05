// components/event-detail/FloatingBookingBarClient.tsx
"use client";

import { Button } from "@/components/ui/button";
import { TicketIcon as Ticket, Heart, Share2, Calendar } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import type { Event } from "@/lib/types/event";
import { formatCurrency, cn } from "@/lib/utils";
import { format, parseISO, isPast, isToday } from "date-fns";

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
}

export default function FloatingBookingBarClient({
  event,
}: FloatingBookingBarClientProps) {
  const [isVisible, setIsVisible] = useState(false);
  const isMounted = useRef(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const heroElement = document.getElementById("event-hero-media");

    const toggleVisibility = () => {
      if (!isMounted.current) return;
      const scrollY = window.pageYOffset;
      const heroHeight = heroElement ? heroElement.offsetHeight : 300;

      if (scrollY > heroHeight * 0.7 && window.innerWidth < 1024) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Enhanced logic to determine event status
  const getEventStatus = () => {
    if (!event.upcomingDates || event.upcomingDates.length === 0) {
      return { status: "past", message: "This event has concluded" };
    }

    const now = new Date();
    const futureDates = event.upcomingDates.filter((session) => {
      const sessionDate = parseISO(session.date);
      return !isPast(sessionDate) || isToday(sessionDate);
    });

    // All dates are in the past
    if (futureDates.length === 0) {
      return {
        status: "past",
        message: "This event has concluded. Thanks for your interest!",
      };
    }

    // Check if any future dates are bookable
    const bookableDates = futureDates.filter(
      (session) =>
        (session.spotsLeft ?? Infinity) > 0 &&
        session.status !== "sold-out" &&
        session.status !== "cancelled"
    );

    if (bookableDates.length === 0) {
      // Future dates exist but all are sold out/cancelled
      return {
        status: "unavailable",
        message: "Currently unavailable",
      };
    }

    return {
      status: "available",
      message: event.isFree ? "Register / Inquire" : "Book / Inquire",
    };
  };

  const eventStatus = getEventStatus();

  const handleBookViaWhatsApp = () => {
    if (eventStatus.status === "past") {
      // For past events, send a general inquiry message
      const message = `Hi! I saw the event "${event.name}" and I'm interested in similar events or future occurrences. Could you let me know about upcoming events?`;
      const whatsappNumber = "919650779490";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank");
      return;
    }

    // Original logic for available events
    const firstAvailableSession = event.upcomingDates?.find(
      (s) =>
        !isPast(parseISO(s.date)) &&
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
    const whatsappNumber = "919650779490";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShare = async () => {
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

  const policyText =
    event.policies?.cancellation?.split(".")[0] ||
    (event.policies?.cancellation?.toLowerCase().includes("rain or shine")
      ? "Event is rain or shine."
      : "See cancellation policy.");

  return (
    <div className="fixed bottom-0 left-0 right-0 lg:hidden z-50 p-3 bg-background border-t border-border shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-2.5">
        {/* Price Info */}
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">
            {eventStatus.status === "past"
              ? "Was"
              : event.isFree
              ? "Entry"
              : "From"}
          </span>
          <span
            className={cn(
              "text-lg font-bold leading-tight",
              eventStatus.status === "past"
                ? "text-muted-foreground"
                : "text-foreground"
            )}
          >
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
          "w-full font-semibold py-2.5 text-[15px] shadow-md h-11",
          eventStatus.status === "past" &&
            "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          eventStatus.status === "unavailable" &&
            "bg-muted text-muted-foreground hover:bg-muted cursor-not-allowed"
        )}
        size="lg"
        disabled={eventStatus.status === "unavailable"}
      >
        {eventStatus.status === "past" ? (
          <>
            <Calendar className="w-4 h-4 mr-1.5" />
            Inquire About Similar Events
          </>
        ) : (
          <>
            <Ticket className="w-4 h-4 mr-1.5" />
            {eventStatus.message}
          </>
        )}
      </Button>

      {/* Status Message for Past Events */}
      {eventStatus.status === "past" ? (
        <p className="text-[11px] text-muted-foreground text-center mt-1.5 leading-tight px-1">
          {eventStatus.message} We&apos;d love to help you find similar upcoming
          events.
        </p>
      ) : policyText ? (
        <p className="text-[11px] text-muted-foreground text-center mt-1.5 leading-tight px-1">
          {policyText}
        </p>
      ) : null}
    </div>
  );
}
