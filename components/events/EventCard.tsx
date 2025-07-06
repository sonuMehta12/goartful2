"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3Icon,
  MapPinIcon,
  AccessibilityIcon,
  CheckCircle2Icon,
  HeartIcon,
  StarIcon,
  TicketIcon,
  Info, // For past event indication
} from "lucide-react";
import { Event } from "@/lib/types/event";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  isPast,
  isFuture,
  isToday,
  parseISO,
  format as formatDateFns,
  isValid as isValidDate,
} from "date-fns"; // For date checking

interface EventCardProps {
  event: Event;
  className?: string;
}

export function EventCard({ event, className }: EventCardProps) {
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [eventStatusLabel, setEventStatusLabel] = useState<string | null>(null);
  const [isEventPast, setIsEventPast] = useState<boolean>(false);

  useEffect(() => {
    // Determine event status based on the primary event.date and potentially upcomingDates
    let statusLabel: string | null = null;
    let past = false;

    // Consider the *last* date if upcomingDates are present and span multiple days
    let effectiveLastDate: Date | null = null;
    if (event.upcomingDates && event.upcomingDates.length > 0) {
      const dates = event.upcomingDates
        .map((s) => parseISO(s.date))
        .sort((a, b) => b.getTime() - a.getTime());
      if (dates.length > 0) {
        effectiveLastDate = dates[0];
      }
    } else if (event.date) {
      effectiveLastDate = parseISO(event.date);
    }

    if (effectiveLastDate && isValidDate(effectiveLastDate)) {
      if (isPast(effectiveLastDate) && !isToday(effectiveLastDate)) {
        // Strictly past
        statusLabel = "Event Concluded";
        past = true;
      } else if (event.status === "cancelled") {
        statusLabel = "Cancelled";
        past = true; // Treat cancelled as non-bookable/past for card display
      } else if (
        event.status === "sold-out" &&
        (!event.ticketsLeft || event.ticketsLeft === 0)
      ) {
        statusLabel = "Sold Out";
        // 'past' remains false if it's upcoming but sold out
      }
      // Could add "Ongoing" if start is past but end is future (more complex with timezones and specific times)
    }
    setEventStatusLabel(statusLabel);
    setIsEventPast(past);
  }, [event.date, event.upcomingDates, event.status, event.ticketsLeft]);

  const handleWishlistClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    console.log("Toggled wishlist for event:", event.id, !isWishlisted);
  };

  const cardVariants = {
    /* ... your existing variants ... */ initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: {
      y: -5,
      boxShadow:
        "0px 8px 25px -5px hsl(var(--primary) / 0.15), 0px 5px 10px -6px hsl(var(--primary) / 0.1)",
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  const formattedMainDate = event.date ? formatDate(event.date) : "Date TBD";
  const linkHref =
    isEventPast && event.status !== "past"
      ? `/events/${event.slug}?status=past_gallery`
      : `/events/${event.slug}`;

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className={cn("h-full", className)}
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
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent",
                isEventPast && "from-black/80 via-black/50"
              )}
            />

            {/* Category/Type Badge */}
            {(event.category?.name || event.type) && (
              <Badge
                variant="secondary"
                className="absolute top-3 left-3 z-10 bg-black/50 text-white backdrop-blur-sm text-xs border-none"
              >
                {event.category?.name || event.type}
              </Badge>
            )}

            {/* Status Badge for Past/Cancelled/Sold Out Events */}
            {eventStatusLabel && (
              <Badge
                variant={
                  isEventPast && eventStatusLabel !== "Sold Out"
                    ? "outline"
                    : "destructive"
                }
                className="absolute bottom-3 right-3 z-10 bg-black/60 text-white backdrop-blur-sm text-xs border-white/30"
              >
                {eventStatusLabel}
              </Badge>
            )}

            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background"
                    onClick={handleWishlistClick}
                    aria-label={
                      isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                    }
                    style={
                      eventStatusLabel
                        ? { right: "calc(0.75rem + 2.5rem + 0.5rem)" }
                        : {}
                    } // Adjust if status badge is present
                  >
                    <HeartIcon
                      className={cn(
                        "h-5 w-5 transition-all",
                        isWishlisted
                          ? "fill-primary text-primary"
                          : "text-foreground/70 group-hover:text-primary/80"
                      )}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Host Info - Keep it subtle if event is past */}
            {event.host && event.host.length > 0 && (
              <div
                className={cn(
                  "absolute bottom-3 left-3 right-12 flex items-center gap-2.5 text-white",
                  eventStatusLabel
                    ? "w-auto max-w-[calc(100%-4rem-10px)]"
                    : "w-auto",
                  isEventPast && "opacity-70"
                )}
              >
                <div className="relative h-9 w-9 rounded-full overflow-hidden border-2 border-background/70 shrink-0">
                  <Image
                    src={event.host[0].avatar.url || "/placeholder-avatar.jpg"}
                    alt={event.host[0].avatar.alt || event.host[0].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="overflow-hidden">
                  {/* To handle text truncation */}
                  <p className="text-sm font-semibold truncate flex items-center">
                    {event.host[0].name}
                    {event.host[0].verified && (
                      <CheckCircle2Icon className="ml-1.5 h-4 w-4 fill-blue-500 text-white shrink-0" />
                    )}
                  </p>
                                  {event.averageRating &&
                  event.reviewCount > 0 &&
                  !isEventPast && (
                    <div className="flex items-center gap-1 text-xs opacity-90">
                      <StarIcon className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 shrink-0" />
                      <span className="truncate">
                        {event.averageRating.toFixed(1)} ({event.reviewCount}{" "}
                        reviews)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <CardContent className="p-4 flex flex-col flex-grow">
            <div className="mb-3 flex items-start justify-between gap-2">
              <CardTitle
                className={cn(
                  "text-lg font-semibold leading-snug text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2",
                  isEventPast && "group-hover:text-muted-foreground"
                )}
              >
                {event.name}
              </CardTitle>
              {!isEventPast && ( // Only show price for current/upcoming
                <div
                  className={cn(
                    "text-lg font-bold whitespace-nowrap shrink-0 pl-2",
                    event.isFree
                      ? "text-emerald-600 dark:text-emerald-500"
                      : "text-primary"
                  )}
                >
                  {event.isFree
                    ? "FREE"
                    : formatCurrency(
                        event.price,
                        event.currency,
                        event.currency === "INR" ? "en-IN" : "en-US"
                      )}
                </div>
              )}
            </div>

            <p
              className={cn(
                "text-sm text-muted-foreground mb-3 line-clamp-2",
                isEventPast && "opacity-80"
              )}
            >
              {event.shortDescription}
            </p>

            <div
              className={cn(
                "space-y-2 text-sm text-muted-foreground mb-4",
                isEventPast && "opacity-80"
              )}
            >
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground/80" />
                <span>{formattedMainDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock3Icon className="h-4 w-4 shrink-0 text-muted-foreground/80" />
                <span>
                  {event.startTime} {event.endTime && `- ${event.endTime}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4 shrink-0 text-muted-foreground/80" />
                <span className="line-clamp-1">
                  {event.venue.name}, {event.venue.city}
                </span>
              </div>
            </div>

            {event.tags && event.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {event.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag.id}
                    variant={isEventPast ? "outline" : "secondary"}
                    className="px-2 py-0.5 text-[11px] font-normal rounded-md cursor-default"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex-grow" />

            <CardFooter className="mt-auto p-0 pt-4 flex justify-between items-center border-t">
              <TooltipProvider delayDuration={100}>
                {/* Accessibility Info or different info for past events */}
                {isEventPast ? (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Info className="h-4 w-4 text-blue-500" />
                    <span>View Event Archive</span>
                  </div>
                ) : (
                  <Tooltip>
                    <TooltipTrigger className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <AccessibilityIcon className="h-4 w-4" />
                      <span>Accessibility</span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      {/* ... (your accessibility tooltip content) ... */}
                      <div className="space-y-1 p-1">
                        {" "}
                        <p className="font-medium text-sm">
                          Accessibility Features:
                        </p>{" "}
                        {event.venue.accessibility &&
                        event.venue.accessibility.length > 0 ? (
                          <ul className="text-xs list-disc pl-4 space-y-0.5">
                            {" "}
                            {event.venue.accessibility
                              .slice(0, 3)
                              .map((feature, index) => (
                                <li key={index}>{feature}</li>
                              ))}{" "}
                            {event.venue.accessibility.length > 3 && (
                              <li>Plus more...</li>
                            )}{" "}
                          </ul>
                        ) : (
                          <p className="text-xs">Details on event page.</p>
                        )}{" "}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                )}
              </TooltipProvider>

              {/* Spots Left - only show if not explicitly past and ticketsLeft is a number */}
              {typeof event.ticketsLeft === "number" &&
                !isEventPast &&
                !event.isFree && (
                  <div
                    className={cn(
                      "flex items-center gap-1 text-xs font-medium",
                      event.ticketsLeft <= 10 && event.ticketsLeft > 0
                        ? "text-destructive animate-pulse"
                        : event.ticketsLeft === 0
                        ? "text-destructive/80"
                        : "text-muted-foreground"
                    )}
                  >
                    <TicketIcon className="h-3.5 w-3.5" />
                    <span>
                      {event.ticketsLeft === 0
                        ? "Sold Out"
                        : `${event.ticketsLeft} spot${
                            event.ticketsLeft !== 1 ? "s" : ""
                          } left`}
                    </span>
                  </div>
                )}
            </CardFooter>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
