import { Event } from "@/lib/types/event";
import Image from "next/image"; // Keep this if you ever use Image directly, Avatar handles its own
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"; // CardHeader, CardTitle not used in the Host Card part
import {
  Star,
  CheckCircle2Icon,
  MapPin,
  ExternalLink,
  Users,
  ShieldCheck, // Used in improved Host Card
  MessageSquare, // For Message Host button
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils"; // Import cn utility

interface EventDescriptionHostVenueProps {
  event: Pick<
    Event,
    | "description"
    | "host"
    | "venue"
    | "tags"
    | "category"
    | "skillLevel"
    | "ageRequirement"
  >;
}

export default function EventDescriptionHostVenue({
  event,
}: EventDescriptionHostVenueProps) {
  const {
    description,
    host,
    venue,
    tags,
    category,
    skillLevel,
    ageRequirement,
  } = event;

  // Helper for initials for Host Card avatar fallback
  const getHostInitials = (name?: string | null): string => {
    if (!name) return "H";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Placeholder for "Message Host" action
  //   const handleMessageHost = (e: React.MouseEvent<HTMLButtonElement>) => {
  //     e.preventDefault(); // Prevent Link navigation if card is wrapped in Link
  //     e.stopPropagation(); // Stop event from bubbling up
  //     console.log(`Message Host: ${host.name} (ID: ${host.id})`);
  //     alert("Messaging host feature coming soon!");
  //   };

  // Placeholder stats - replace with actual data if available on Host type
  // For now, we only have host.eventsHosted from the Event -> Host type
  const hostEventsHostedDisplay = host.eventsHosted
    ? `${host.eventsHosted} Hosted Experience${
        host.eventsHosted !== 1 ? "s" : ""
      }`
    : null;

  return (
    <section className="space-y-8 md:space-y-10">
      {" "}
      {/* Added md:space-y-10 */}
      {/* Event Description */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          About this Experience
        </h2>
        <p className="text-base text-muted-foreground whitespace-pre-line leading-relaxed">
          {description}
        </p>
      </div>
      {/* Tags, Category, Skill, Age */}
      {(tags?.length || category || skillLevel || ageRequirement) && ( // Check all before rendering
        <div className="pt-6 border-t">
          {" "}
          {/* Increased pt */}
          <h3 className="text-xl font-semibold text-foreground mb-4">
            {" "}
            {/* Increased mb */}
            Details & Tags
          </h3>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {" "}
            {/* Added sm:gap-3 */}
            {category && (
              <Badge
                variant="outline"
                className="text-sm py-1 px-2.5 sm:px-3 border-primary/50 text-primary"
              >
                {" "}
                {/* Styled category badge */}
                {category.name}
              </Badge>
            )}
            {skillLevel && (
              <Badge
                variant="secondary"
                className="text-sm py-1 px-2.5 sm:px-3"
              >
                Level: {skillLevel}
              </Badge>
            )}
            {ageRequirement && (
              <Badge
                variant="secondary"
                className="text-sm py-1 px-2.5 sm:px-3"
              >
                Age: {ageRequirement}
              </Badge>
            )}
            {tags?.map((tag) => (
              <Badge
                key={tag.id}
                variant="secondary"
                className="text-sm py-1 px-2.5 sm:px-3"
              >
                #{tag.name}
              </Badge>
            ))}
          </div>
        </div>
      )}
      {/* --- Improved Host Information Card Section --- */}
      <div className="pt-6 border-t">
        {" "}
        {/* Separator for the section */}
        <Link
          href={`/hosts/${host.id}`}
          className="block group rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={`View profile for ${host.name}`}
        >
          <Card className="overflow-hidden border bg-card shadow-lg transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:border-primary/40 dark:bg-gradient-to-br dark:from-background dark:to-muted/10">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6">
                {/* Avatar & Basic Stats Section */}
                <div className="relative shrink-0 flex flex-col items-center sm:items-start w-full sm:w-auto">
                  <div className="relative mb-3">
                    <Avatar className="h-24 w-24 sm:h-28 sm:w-28 ring-4 ring-background shadow-xl transition-transform duration-300 group-hover:scale-105">
                      {host.avatar.url && (
                        <AvatarImage
                          src={host.avatar.url}
                          alt={host.avatar.alt || host.name}
                          className="object-cover"
                        />
                      )}
                      <AvatarFallback className="text-3xl bg-muted group-hover:bg-primary/10 transition-colors">
                        {getHostInitials(host.name)}
                      </AvatarFallback>
                    </Avatar>
                    {host.verified && (
                      <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 rounded-full bg-background p-0.5 shadow-md">
                        <CheckCircle2Icon className="h-7 w-7 fill-blue-500 text-white stroke-[1.5]" />
                      </div>
                    )}
                  </div>
                  {/* Host Quick Stats (using available data) */}
                  {hostEventsHostedDisplay && (
                    <div className="flex items-center justify-center sm:justify-start text-xs text-muted-foreground mt-1">
                      <Users className="mr-1.5 h-3.5 w-3.5 text-primary/80" />
                      <span>{hostEventsHostedDisplay}</span>
                    </div>
                  )}
                </div>

                {/* Host Info Section */}
                <div className="flex-1 space-y-3 text-center sm:text-left">
                  <div>
                    <div className="flex flex-col items-center sm:items-start sm:flex-row sm:gap-2 mb-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                        Hosted by
                      </p>
                      {host.verified && (
                        <Badge
                          variant="secondary"
                          className="text-xs py-0.5 px-1.5 mt-1 sm:mt-0"
                        >
                          <ShieldCheck className="w-3 h-3 mr-1" /> Verified Host
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {host.name}
                    </h3>
                    {host.title && (
                      <p className="text-sm font-medium text-muted-foreground mt-0.5">
                        {host.title}
                      </p>
                    )}
                  </div>

                  {host.tagline && (
                    <blockquote className="text-sm italic text-muted-foreground border-l-2 border-primary/50 pl-3 py-1 bg-muted/30 rounded-r-md">
                      &quot;{host.tagline}&quot;
                    </blockquote>
                  )}

                  {host.bio && (
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300 ease-in-out">
                      {host.bio}
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full sm:w-auto group/button"
                      asChild
                    >
                      {/* This button is part of the larger Link, so it's a visual cue.
                          No nested <a> needed. If you want it to be a separate link for some reason,
                          you'd remove the outer Link on the Card. */}
                      <span>
                        View Profile
                        <ExternalLink className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover/button:translate-x-0.5" />
                      </span>
                    </Button>
                    {/* <Button
                      variant="outline" // Changed to outline for secondary action
                      size="sm"
                      onClick={handleMessageHost} // Uses the handler with stopPropagation
                      className="w-full sm:w-auto group/button"
                    >
                      <MessageSquare className="w-3.5 h-3.5 mr-1.5 transition-transform group-hover/button:scale-110" />
                      Message Host
                    </Button> */}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
      {/* --- End of Host Information Card Section --- */}
      {/* Basic Venue Information Snippet */}
    </section>
  );
}
