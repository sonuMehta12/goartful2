// components/event-detail/EventDescriptionHostVenue.tsx
"use client"; // Making it a client component due to potential client-side video player logic if not a simple iframe

import { Event, Host } from "@/lib/types/event"; // Assuming Host is also exported if portfolioUrl is added
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  CheckCircle2Icon,
  ExternalLink,
  Users,
  PlayCircle, // For video play icon
  VideoOff, // If no video
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// Update Host type if portfolioUrl is added and used here. For now, using existing fields.
interface ExtendedHost extends Host {
  introVideoUrl?: string | null; // Optional: URL for artist's intro video
  portfolioUrl?: string | null; // Optional: Direct link to their portfolio/main social
  hostRating?: number | null; // Optional: Overall rating for the host
  hostReviewCount?: number | null; // Optional: Total reviews for the host
}

interface EventDescriptionHostVenueProps {
  event: Pick<
    Event,
    | "description"
    | "host" // Assuming event.host might have the new introVideoUrl and portfolioUrl
    | "tags"
    | "category"
    | "skillLevel"
    | "ageRequirement"
    // 'venue' is removed as per previous decision to have EventLocationSection handle it
  >;
}

export default function EventDescriptionHostVenue({
  event,
}: EventDescriptionHostVenueProps) {
  const { description } = event;

  // Type assertion or casting if your event.host doesn't yet have introVideoUrl/portfolioUrl from the main Event type
  // Best practice would be to update the Host type in lib/types/event.ts
  const host = event.host as ExtendedHost;

  const getHostInitials = (name?: string | null): string => {
    if (!name) return "H";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const hostEventsHostedDisplay = host.eventsHosted
    ? `${host.eventsHosted} Experience${
        host.eventsHosted !== 1 ? "s" : ""
      } Hosted`
    : null;

  // Determine the correct portfolio link
  const profileLink =
    host.portfolioUrl ||
    `https://www.instagram.com/${host.instagramHandle || ""}` ||
    "#"; // Fallback
  const hasPortfolioLink = !!host.portfolioUrl || !!host.instagramHandle;

  return (
    <section className="space-y-8 md:space-y-12">
      {/* --- NEW: Artist Introduction Video Section --- */}
      <div className="pt-8 border-t">
        {host.introVideoUrl ? (
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl border border-border">
            {/* For production, use a proper video player component for better controls & accessibility */}
            <iframe
              width="100%"
              height="100%"
              src={host.introVideoUrl.replace("watch?v=", "embed/")} // Basic YouTube embed conversion
              title={`Artist introduction video by ${host.name}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        ) : (
          <div className="aspect-video rounded-xl bg-muted border border-dashed border-border flex flex-col items-center justify-center text-center p-8">
            <VideoOff className="w-16 h-16 text-muted-foreground/50 mb-4" />
            <p className="text-md font-semibold text-muted-foreground">
              {host.name.split(" ")[0]} hasn't added an intro video yet.
            </p>
            <p className="text-sm text-muted-foreground/80 mt-1">
              Stay tuned, or connect with them directly through their profile!
            </p>
          </div>
        )}
      </div>
      {/* Event Description */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          About this Experience
        </h2>
        <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
          {/* Using prose for better typography if description has markdown-like structure */}
          <p>{description}</p>
        </div>
      </div>

      {/* --- REFINED: Host Information Card Section --- */}
      <div className="pt-8">
        {" "}
        {/* Separator for the host card section */}
        <Card className="overflow-hidden border bg-card shadow-lg dark:bg-gradient-to-br dark:from-card dark:to-muted/10">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
              {/* Avatar */}
              <div className="relative shrink-0">
                <Avatar className="h-20 w-20 sm:h-24 sm:w-24 ring-4 ring-background shadow-xl">
                  {host.avatar.url && (
                    <AvatarImage
                      src={host.avatar.url}
                      alt={host.avatar.alt || host.name}
                      className="object-cover"
                    />
                  )}
                  <AvatarFallback className="text-3xl bg-muted">
                    {getHostInitials(host.name)}
                  </AvatarFallback>
                </Avatar>
                {host.verified && (
                  <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 rounded-full bg-background p-0.5 shadow-md">
                    <CheckCircle2Icon className="h-6 w-6 fill-blue-500 text-white stroke-[1.5]" />
                  </div>
                )}
              </div>

              {/* Host Info */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  {host.name}
                </h3>
                {host.title && ( // 'title' here is used as profession
                  <p className="text-md text-primary mt-0.5 mb-2">
                    {host.title}
                  </p>
                )}

                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-4">
                  {/* Example Host Rating - this needs data on host object */}
                  {host.hostRating &&
                    host.hostReviewCount &&
                    host.hostReviewCount > 0 && (
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span>
                          {host.hostRating.toFixed(1)} ({host.hostReviewCount}{" "}
                          reviews)
                        </span>
                      </div>
                    )}
                  {hostEventsHostedDisplay && (
                    <div className="flex items-center">
                      <Users className="mr-1.5 h-4 w-4 text-primary/80" />
                      <span>{hostEventsHostedDisplay}</span>
                    </div>
                  )}
                </div>

                {hasPortfolioLink && (
                  <Button variant="outline" size="sm" asChild className="group">
                    <Link
                      href={profileLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Profile
                      <ExternalLink className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
