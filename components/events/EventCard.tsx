"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3Icon,
  MapPinIcon,
  CheckCircle2Icon,
  HeartIcon,
  StarIcon,
  TicketIcon,
  Share2Icon, // --- (1) IMPORT: Added Share icon ---
} from "lucide-react";
import { Event } from "@/lib/types/event";
import { cn, formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  isPast,
  isToday,
  isTomorrow, // --- (2) IMPORT: Added isTomorrow for enhanced date formatting ---
  parseISO,
  format as formatDateFns,
  isValid as isValidDate,
} from "date-fns";

// --- Assume Event type might have totalCapacity ---
// interface Event {
//   // ... other properties
//   ticketsLeft?: number;
//   totalCapacity?: number;
// }

interface EventCardProps {
  event: Event;
  className?: string;
}

export function EventCard({ event, className }: EventCardProps) {
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [eventStatusLabel, setEventStatusLabel] = useState<string | null>(null);
  const [isEventPast, setIsEventPast] = useState<boolean>(false);

  useEffect(() => {
    let statusLabel: string | null = null;
    let past = false;
    const effectiveDate = event.date ? parseISO(event.date) : null;

    if (effectiveDate && isValidDate(effectiveDate)) {
      if (isPast(effectiveDate) && !isToday(effectiveDate)) {
        statusLabel = "Concluded";
        past = true;
      } else if (event.status === "cancelled") {
        statusLabel = "Cancelled";
        past = true;
      } else if (
        event.status === "sold-out" ||
        (typeof event.ticketsLeft === "number" && event.ticketsLeft === 0)
      ) {
        statusLabel = "Sold Out";
      } else if (event.price === 0) {
        statusLabel = "Free";
      }
    }
    setEventStatusLabel(statusLabel);
    setIsEventPast(past);
  }, [event.date, event.status, event.ticketsLeft, event.price]);

  // --- (3) REFACTOR: Memoized and improved date/time formatting ---
  const formattedDateTime = useMemo(() => {
    if (!event.date) return "Date TBD";
    const date = parseISO(event.date);
    if (!isValidDate(date)) return "Invalid Date";

    let datePart;
    if (isToday(date)) {
      datePart = "Today";
    } else if (isTomorrow(date)) {
      datePart = "Tomorrow";
    } else {
      datePart = formatDateFns(date, "E, MMM d"); // Format: "Thu, Feb 5"
    }

    return `${datePart} • ${event.startTime || "Time TBD"}`;
  }, [event.date, event.startTime]);

  const handleWishlistClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    // console.log("Toggled wishlist for event:", event.id, !isWishlisted);
  };

  // --- (4) FEATURE: Added Share handler ---
  const handleShareClick = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();
    const shareData = {
      title: event.name,
      text: event.shortDescription,
      url: `${window.location.origin}/events/${event.slug}`,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for desktop or unsupported browsers
        await navigator.clipboard.writeText(shareData.url);
        alert("Event link copied to clipboard!");
      }
    } catch (err) {
      console.error("Share failed:", err);
      // Fallback for failed share
      await navigator.clipboard.writeText(shareData.url);
      alert("Sharing failed. Link copied to clipboard instead!");
    }
  };


  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    hover: {
      y: -5,
      boxShadow: "0px 8px 25px -5px hsl(var(--primary) / 0.15), 0px 5px 10px -6px hsl(var(--primary) / 0.1)",
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  const linkHref = isEventPast ? `/events/${event.slug}?status=past_gallery` : `/events/${event.slug}`;

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className={cn("h-full", className, "group")}
    >
      <Link href={linkHref} className="block h-full" passHref>
        <Card
          className={cn(
            "h-full flex flex-col overflow-hidden rounded-xl border bg-card group transition-shadow duration-300 hover:border-primary/50",
            isEventPast && "opacity-70 hover:opacity-90"
          )}
        >
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <Image
              src={event.heroImage.url || "/placeholder-event.jpg"}
              alt={event.heroImage.alt || event.name}
              fill
              className={cn(
                "object-cover transition-transform duration-500 ease-in-out group-hover:scale-105",
                isEventPast && "grayscale group-hover:grayscale-0"
              )}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={event.isFeatured}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {event.category?.name && (
              <Badge variant="secondary" className="absolute top-3 left-3 z-10 bg-black/50 text-white backdrop-blur-sm text-xs border-none">
                {event.category.name}
              </Badge>
            )}

            {eventStatusLabel && (
              <Badge
                variant={isEventPast && eventStatusLabel !== "Sold Out" ? "outline" : "destructive"}
                className="absolute bottom-3 right-3 z-10 bg-black/60 text-white backdrop-blur-sm text-xs border-white/30"
              >
                {eventStatusLabel}
              </Badge>
            )}

            {/* --- (5) UI-CHANGE: Container for stacked action buttons --- */}
            <TooltipProvider delayDuration={100}>
              <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200">
                {/* Wishlist Button */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background"
                      onClick={handleWishlistClick}
                      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <HeartIcon
                        className={cn(
                          "h-5 w-5 transition-all",
                          isWishlisted ? "fill-primary text-primary" : "text-foreground/70"
                        )}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>{isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}</p></TooltipContent>
                </Tooltip>

                {/* Share Button */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background"
                      onClick={handleShareClick}
                      aria-label="Share event"
                    >
                      <Share2Icon className="h-5 w-5 text-foreground/70" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Share Event</p></TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>

            {event.host?.[0] && (
              <div className="absolute bottom-3 left-3 flex items-center gap-2.5 text-white max-w-[calc(100%-8rem)]">
                <div className="relative h-9 w-9 rounded-full overflow-hidden border-2 border-background/70 shrink-0">
                  <Image
                    src={event.host[0].avatar.url || "/placeholder-avatar.jpg"}
                    alt={event.host[0].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold truncate flex items-center">
                    {event.host[0].name}
                    {event.host[0].verified && (
                      <CheckCircle2Icon className="ml-1.5 h-4 w-4 fill-blue-500 text-white shrink-0" />
                    )}
                  </p>
                  {event.averageRating && event.reviewCount > 0 && !isEventPast && (
                    <div className="flex items-center gap-1 text-xs opacity-90">
                      <StarIcon className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 shrink-0" />
                      <span className="truncate">{`${event.averageRating.toFixed(1)} (${event.reviewCount} reviews)`}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <CardContent className="p-5 flex flex-col flex-grow pb-4">
            <CardTitle
              className="text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors duration-200"
              style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            >
              {event.name}
            </CardTitle>
            
            <p className="text-base text-muted-foreground mt-2 mb-4 line-clamp-2 leading-relaxed">
              {event.shortDescription}
            </p>

            <div className="space-y-3 text-sm text-muted-foreground mt-auto">
              {/* --- (6) UI-CHANGE: Combined Date & Time --- */}
              <div className="flex items-center gap-3">
                <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground/70" />
                <span className="font-medium">{formattedDateTime}</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPinIcon className="h-4 w-4 shrink-0 text-muted-foreground/70" />
                <span className="line-clamp-1 font-medium">{`${event.venue.name}, ${event.venue.city}`}</span>
              </div>
              
              {/* --- (7) FEATURE: Added Ticket/Capacity information --- */}
              {typeof event.ticketsLeft === "number" && !isEventPast && event.status !== "cancelled" && (
                <div className="flex items-center gap-3">
                  <TicketIcon className="h-4 w-4 shrink-0 text-muted-foreground/70" />
                  <span
                    className={cn(
                      "font-medium",
                      event.ticketsLeft > 0 && event.ticketsLeft <= 10 && "text-destructive"
                    )}
                  >
                    {event.ticketsLeft === 0
                      ? "Sold Out"
                      : (event.capacity === null || event.capacity === undefined)
                        ? `${event.ticketsLeft} spot${event.ticketsLeft !== 1 ? "s" : ""} left (Unlimited)`
                        : `${event.ticketsLeft} (${event.capacity}) spots left`}
                  </span>
                </div>
              )}
              {event.ticketsLeft == null && !isEventPast && event.status !== "cancelled" && (
                <div className="flex items-center gap-3">
                  <TicketIcon className="h-4 w-4 shrink-0 text-muted-foreground/70" />
                  <span className="font-medium">Unlimited</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}