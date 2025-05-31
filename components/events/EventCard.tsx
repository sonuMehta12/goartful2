// components/events/EventCard.tsx
"use client";

import { useState } from "react";
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
} from "lucide-react";

import { Event } from "@/lib/types/event";
import { cn, formatCurrency, formatDate } from "@/lib/utils"; // Utilities
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EventCardProps {
  event: Event; // Use the  Event type for props
  className?: string; // Allow passing additional class names
}

export function EventCard({ event, className }: EventCardProps) {
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  const handleWishlistClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.preventDefault(); // Prevent Link navigation if card is wrapped in Link
    e.stopPropagation(); // Stop event from bubbling up
    setIsWishlisted(!isWishlisted);
    // TODO: Implement actual wishlist API call and state management (e.g., using Context or a global state library)
    console.log(
      "Toggled wishlist for event:",
      event.id,
      !isWishlisted ? "Wishlisted" : "Unwishlisted"
    );
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: {
      y: -5, // Subtle lift
      boxShadow:
        "0px 8px 25px -5px hsl(var(--primary) / 0.15), 0px 5px 10px -6px hsl(var(--primary) / 0.1)", // Enhanced shadow
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className={cn("h-full", className)} // Ensures motion div takes full height and allows custom classes
    >
      <Link href={`/events/${event.slug}`} className="block h-full" passHref>
        {/* Use <a> implicitly with Next.js 13+ Link or keep <a> for clarity if preferred */}
        <Card className="h-full flex flex-col overflow-hidden rounded-xl border bg-card group transition-shadow duration-300 hover:border-primary/50">
          {/* Image Section */}
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <Image
              src={event.heroImage.url || "/placeholder-event.jpg"} // Fallback image
              alt={event.heroImage.alt || event.name} // Use event name as fallback alt
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // Responsive image sizes
              priority={event.isFeatured} // Prioritize loading for featured events
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Wishlist Button */}
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

            {/* Host Information - Overlay on Image */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2.5 text-white">
              <div className="relative h-9 w-9 rounded-full overflow-hidden border-2 border-background/70">
                <Image
                  src={event.host.avatar.url || "/placeholder-avatar.jpg"}
                  alt={event.host.avatar.alt || event.host.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold line-clamp-1 flex items-center">
                  {event.host.name}
                  {event.host.verified && (
                    <CheckCircle2Icon className="ml-1.5 h-4 w-4 fill-blue-500 text-white" />
                  )}
                </p>
                {event.averageRating && event.reviewCount > 0 && (
                  <div className="flex items-center gap-1 text-xs opacity-90">
                    <StarIcon className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span>
                      {event.averageRating.toFixed(1)} ({event.reviewCount}{" "}
                      reviews)
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <CardContent className="p-4 flex flex-col flex-grow">
            <div className="mb-3 flex items-start justify-between gap-2">
              <CardTitle className="text-lg font-semibold leading-snug text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                {event.name}
              </CardTitle>
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
            </div>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {event.shortDescription} {/* Using shortDescription */}
            </p>

            {/* Key Details Icons + Text */}
            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground/80" />
                <span>{formatDate(event.date)}</span>
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

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {event.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className="px-2 py-0.5 text-[11px] font-normal rounded-md cursor-default"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* This spacer pushes the footer to the bottom */}
            <div className="flex-grow" />

            {/* Footer - Kept lean, for more details, user clicks into the event */}
            <CardFooter className="mt-auto p-0 pt-4 flex justify-between items-center border-t">
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                    <AccessibilityIcon className="h-4 w-4" />
                    <span>Accessibility</span>
                  </TooltipTrigger>
                  {/* ... TooltipContent ... */}
                </Tooltip>
              </TooltipProvider>

              {typeof event.ticketsLeft === "number" && (
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs font-medium", // ADDED flex items-center gap-1
                    event.ticketsLeft <= 10 && event.ticketsLeft > 0
                      ? "text-destructive"
                      : event.ticketsLeft === 0
                      ? "text-destructive/80"
                      : "text-muted-foreground"
                  )}
                >
                  <TicketIcon className="h-3.5 w-3.5" /> {/* ADDED ICON */}
                  <span>
                    {" "}
                    {/* Wrapped text in span for better control if needed */}
                    {event.ticketsLeft === 0
                      ? "Sold Out"
                      : `${event.ticketsLeft} spots left`}
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
