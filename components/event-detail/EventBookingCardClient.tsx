// components/event-detail/EventBookingCardClient.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card"; // Removed CardHeader, CardTitle if not used directly
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, parseISO, isPast } from "date-fns";
import { cn, formatCurrency } from "@/lib/utils";
import { Heart, TicketIcon, Share2, Info, Minus, Plus } from "lucide-react";
import type { Event, UpcomingDateSession } from "@/lib/types/event";
import { Badge } from "@/components/ui/badge"; // Keep for "spots left"

interface EventBookingCardClientProps {
  event: Pick<
    Event,
    | "name"
    | "price"
    | "currency"
    | "upcomingDates"
    | "capacity"
    | "isFree"
    | "policies"
    | "slug"
    | "date" // Add date to check if event is past
  >;
  className?: string;
}

export default function EventBookingCardClient({
  event,
  className,
}: EventBookingCardClientProps) {
  const [isClient, setIsClient] = useState(false);
  const [selectedSessionKey, setSelectedSessionKey] = useState<
    string | undefined
  >(undefined);
  const [guestCount, setGuestCount] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const isPastEvent = useMemo(() => {
    const eventDate = parseISO(event.date);
    return isPast(eventDate);
  }, [event.date]);

  useEffect(() => {
    setIsClient(true);
    // Auto-select the first available upcoming session
    if (!isPastEvent && event.upcomingDates && event.upcomingDates.length > 0) {
      const today = format(new Date(), "yyyy-MM-dd");
      const futureSessions = event.upcomingDates
        .filter(
          (s) =>
            format(parseISO(s.date), "yyyy-MM-dd") >= today &&
            s.status !== "cancelled" &&
            s.status !== "sold-out" &&
            (s.spotsLeft ?? Infinity) > 0
        )
        .sort(
          (a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime()
        );

      if (futureSessions.length > 0) {
        setSelectedSessionKey(
          `${futureSessions[0].date}_${futureSessions[0].startTime}`
        );
      } else {
        // If no available future sessions, select the first upcoming one if any (even if sold out, to show info)
        const firstUpcoming = event.upcomingDates.sort(
          (a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime()
        )[0];
        if (firstUpcoming)
          setSelectedSessionKey(
            `${firstUpcoming.date}_${firstUpcoming.startTime}`
          );
      }
    }
  }, [event.upcomingDates, isPastEvent]);

  const availableSessions = useMemo(() => {
    const today = format(new Date(), "yyyy-MM-dd");
    return (
      event.upcomingDates
        ?.map((session) => ({
          ...session,
          key: `${session.date}_${session.startTime}`,
          label: `${format(parseISO(session.date), "EEEE, MMM d")} • ${
            session.startTime
          }`, // Format as in image
          dateObj: parseISO(session.date),
        }))
        .filter(
          (session) =>
            format(session.dateObj, "yyyy-MM-dd") >= today &&
            session.status !== "cancelled"
        )
        .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime()) ?? []
    );
  }, [event.upcomingDates]);

  const selectedSession = useMemo(() => {
    return availableSessions.find((s) => s.key === selectedSessionKey);
  }, [selectedSessionKey, availableSessions]);

  const spotsLeftForSelectedSession = selectedSession?.spotsLeft;
  const isSelectedSessionSoldOut =
    selectedSession?.status === "sold-out" ||
    (spotsLeftForSelectedSession !== undefined &&
      spotsLeftForSelectedSession === 0);

  // Max guests: If free, allow event.capacity or default to 10. If not free, use spotsLeft or event.capacity.
  const maxGuests = useMemo(() => {
    if (event.isFree) return event.capacity || 10; // For free events, maybe a higher default if no specific session spots
    return spotsLeftForSelectedSession ?? event.capacity ?? 1;
  }, [event.isFree, event.capacity, spotsLeftForSelectedSession]);

  useEffect(() => {
    if (isSelectedSessionSoldOut) {
      setGuestCount(0); // Or 1 if you want to show price for 1 guest even if sold out
    } else if (guestCount > maxGuests) {
      setGuestCount(Math.max(1, maxGuests));
    } else if (guestCount === 0 && !isSelectedSessionSoldOut && maxGuests > 0) {
      setGuestCount(1);
    }
  }, [isSelectedSessionSoldOut, maxGuests, guestCount]);

  const handleGuestChange = (increment: number) => {
    const newCount = guestCount + increment;
    if (newCount >= 1 && newCount <= maxGuests) {
      setGuestCount(newCount);
    }
  };

  const { subtotal, serviceFee, total } = useMemo(() => {
    if (event.isFree || guestCount === 0)
      return { subtotal: 0, serviceFee: 0, total: 0 };
    const basePrice = event.price * guestCount;
    const serviceFee = Math.round(basePrice * 0.05); // 5% service fee example
    return { subtotal: basePrice, serviceFee, total: basePrice + serviceFee };
  }, [event.price, guestCount, event.isFree]);

  const handleBooking = () => {
    if (!selectedSession && !event.isFree && availableSessions.length > 0) {
      // If not free and sessions exist, one must be selected
      alert("Please select an available date and time for the event.");
      return;
    }
    if (guestCount === 0 && !event.isFree) {
      alert("Please select at least one guest.");
      return;
    }
    if (isSelectedSessionSoldOut && !event.isFree) {
      alert(`Sorry, the session on ${selectedSession?.label} is sold out.`);
      return;
    }

    const sessionLabel = selectedSession
      ? ` on ${selectedSession.label}`
      : availableSessions.length === 0 && event.isFree
      ? ""
      : " for the selected session";
    const message = `Hi! I'd like to book ${guestCount} ticket(s) for "${event.name}"${sessionLabel}.`;
    const whatsappNumber = "919650779490"; // Replace with your number
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

  // Extract first sentence of cancellation policy or provide a default
  const cancellationPolicyText =
    event.policies?.cancellation?.match(/^[^.!?]+[.!?]/)?.[0] || // First sentence
    "Free cancellation available."; // Default

  const isBookable =
    !isPastEvent &&
    ((selectedSession && !isSelectedSessionSoldOut && guestCount > 0) ||
      (event.isFree &&
        (availableSessions.length === 0 ||
          (selectedSession && !isSelectedSessionSoldOut)) &&
        guestCount > 0));

  if (!isClient) {
    // Basic Skeleton
    return (
      <Card className={cn("p-6 shadow-xl border animate-pulse", className)}>
        {isPastEvent ? (
          <div className="text-center text-muted-foreground">
            This event has already occurred.
          </div>
        ) : (
          <>
            <div className="h-10 bg-muted rounded w-1/2 mb-1"></div>{" "}
            {/* Price */}
            <div className="h-6 bg-muted rounded w-1/3 mb-6"></div>{" "}
            {/* /person */}
            <div className="space-y-4">
              <div className="h-6 bg-muted rounded w-1/4 mb-1"></div>{" "}
              {/* Label */}
              <div className="h-10 bg-muted rounded w-full"></div>{" "}
              {/* Select */}
              <div className="h-6 bg-muted rounded w-1/4 mb-1"></div>{" "}
              {/* Label */}
              <div className="h-10 bg-muted rounded w-full"></div>{" "}
              {/* Guest Input */}
              {!event.isFree && (
                <div className="h-16 bg-muted rounded w-full pt-4 border-t"></div>
              )}{" "}
              {/* Price breakdown */}
              <div className="h-12 bg-primary/80 rounded-md w-full"></div>{" "}
              {/* Book button */}
            </div>
            <div className="mt-6 pt-4 border-t">
              <div className="h-8 bg-muted rounded w-full mb-2"></div>{" "}
              {/* Save/Share */}
              <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>{" "}
              {/* Policy text */}
            </div>
          </>
        )}
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "p-4 sm:p-6 shadow-lg border border-border bg-card",
        className
      )}
    >
      {isPastEvent ? (
        <CardContent className="p-0 space-y-4 text-center">
          <p className="text-lg font-semibold text-muted-foreground">
            This event has already taken place.
          </p>
          <p className="text-sm text-muted-foreground">
            Thank you for your interest!
          </p>
          {/* Optional: Add a newsletter signup or similar */}
        </CardContent>
      ) : (
        <>
          {/* Header with Price and Spots Left Badge */}
          <div className="flex items-start justify-between pb-4 mb-4 border-b">
            <div>
              {event.isFree ? (
                <span className="text-3xl font-bold text-emerald-600">
                  FREE
                </span>
              ) : (
                <>
                  <span className="text-3xl font-bold text-foreground">
                    {formatCurrency(event.price, event.currency)}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">
                    / person
                  </span>
                </>
              )}
            </div>
            {selectedSession &&
              spotsLeftForSelectedSession !== undefined &&
              spotsLeftForSelectedSession > 0 &&
              spotsLeftForSelectedSession <= 10 && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-green-100 text-green-700 border-green-200 dark:bg-green-500/20 dark:text-green-300 dark:border-green-500/30"
                >
                  {spotsLeftForSelectedSession} spot
                  {spotsLeftForSelectedSession !== 1 ? "s" : ""} left
                </Badge>
              )}
            {isSelectedSessionSoldOut && !event.isFree && (
              <Badge
                variant="outline"
                className="text-destructive border-destructive text-xs"
              >
                Sold Out
              </Badge>
            )}
          </div>

          <CardContent className="p-0 space-y-4">
            {/* Date & Time Selection */}
            {(availableSessions.length > 0 || !event.isFree) && ( // Show if sessions or if paid (to show "no sessions")
              <div className="grid gap-1.5">
                <Label htmlFor="session-select" className="text-sm font-medium">
                  Select Date & Time
                </Label>
                <Select
                  value={selectedSessionKey}
                  onValueChange={setSelectedSessionKey}
                  disabled={availableSessions.length === 0}
                >
                  <SelectTrigger id="session-select" className="h-11 text-sm">
                    <SelectValue
                      placeholder={
                        availableSessions.length > 0
                          ? "Choose available session"
                          : "No sessions available"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSessions.map((session) => (
                      <SelectItem
                        key={session.key}
                        value={session.key}
                        disabled={
                          session.status === "sold-out" ||
                          (session.spotsLeft ?? 0) === 0
                        }
                      >
                        {session.label} -{" "}
                        {(session.spotsLeft ?? 0) > 0
                          ? `${session.spotsLeft} spot${
                              session.spotsLeft !== 1 ? "s" : ""
                            } left`
                          : "Sold Out"}
                      </SelectItem>
                    ))}
                    {availableSessions.length === 0 && (
                      <p className="p-2 text-center text-xs text-muted-foreground">
                        Currently no upcoming sessions.
                      </p>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Tickets (Guests) -  Show if not free, OR if free and there's a session selected/available, OR if free and no sessions (general registration) */}
            {(!event.isFree ||
              (event.isFree &&
                (selectedSession || availableSessions.length === 0))) &&
              !isSelectedSessionSoldOut && (
                <div className="grid gap-1.5">
                  <Label htmlFor="guest-count" className="text-sm font-medium">
                    Tickets
                  </Label>
                  <div className="flex items-center justify-between border rounded-md h-11 px-1">
                    <span className="text-sm text-muted-foreground pl-2">
                      Adults
                    </span>
                    <div className="flex items-center">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleGuestChange(-1)}
                        disabled={guestCount <= 1}
                        className="h-8 w-8"
                        aria-label="Decrease ticket count"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span
                        id="guest-count"
                        className="w-8 text-center text-sm font-medium tabular-nums"
                      >
                        {guestCount}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleGuestChange(1)}
                        disabled={guestCount >= maxGuests}
                        className="h-8 w-8"
                        aria-label="Increase ticket count"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

            {/* Price Breakdown */}
            {!event.isFree && guestCount > 0 && !isSelectedSessionSoldOut && (
              <div className="space-y-1.5 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {formatCurrency(event.price, event.currency)} × {guestCount}
                  </span>
                  <span>{formatCurrency(subtotal, event.currency)}</span>
                </div>
                {serviceFee > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center">
                      Service fee{" "}
                      <Info className="w-3 h-3 ml-1 text-muted-foreground/70 cursor-help" />
                    </span>
                    <span>{formatCurrency(serviceFee, event.currency)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span className="text-foreground">
                    Total ({event.currency})
                  </span>
                  <span className="text-foreground">
                    {formatCurrency(total, event.currency)}
                  </span>
                </div>
              </div>
            )}

            <Button
              className="w-full text-base font-semibold h-12 mt-2"
              size="lg"
              onClick={handleBooking}
              disabled={!isBookable}
            >
              <TicketIcon className="mr-2 h-5 w-5" />
              {!isBookable && isSelectedSessionSoldOut
                ? "Sold Out"
                : "Book Experience"}
            </Button>
          </CardContent>

          <CardFooter className="p-0 pt-5 mt-5 flex-col items-stretch space-y-3 border-t">
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="text-sm text-muted-foreground hover:text-primary group px-1 h-auto rounded-md"
              >
                <Heart
                  className={cn(
                    "mr-1.5 h-4 w-4 group-hover:fill-primary/10 transition-colors",
                    isWishlisted && "fill-primary text-primary"
                  )}
                />
                {isWishlisted ? "Saved" : "Save"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="text-sm text-muted-foreground hover:text-primary group px-1 h-auto rounded-md"
              >
                <Share2 className="mr-1.5 h-4 w-4" />
                Share
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground leading-snug px-1">
              {cancellationPolicyText}
            </p>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
