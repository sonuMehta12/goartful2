// components/event-detail/EventLocationSection.tsx
import type { Venue } from "@/lib/types/event";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MapPin, ExternalLink, Navigation, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventLocationSectionProps {
  venue?: Venue | null; // Make venue prop optional to handle cases where it might be missing
}

export default function EventLocationSection({
  venue,
}: EventLocationSectionProps) {
  if (!venue) {
    // If you always expect a venue, the parent should handle not rendering this.
    // But as a safeguard, or if it's truly optional:
    return (
      <section id="event-location" className="py-6 sm:py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Venue information is currently being finalized.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="event-location" className="py-6 sm:py-8 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center sm:justify-start justify-center">
            <MapPin className="w-6 h-6 sm:w-7 sm:h-7 mr-3 text-primary shrink-0" />
            Where You'll Be Creating
          </h2>
        </div>

        {/* Location Card - No padding for image */}
        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="grid md:grid-cols-2 md:min-h-[300px]">
            {/* Image Section - Full width, no padding */}
            <div className="relative w-full h-64 md:h-full">
              {venue.venueImage?.url ? (
                <Image
                  src={venue.venueImage.url}
                  alt={venue.venueImage.alt || `Image of ${venue.name}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                // Fallback if no image
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-muted-foreground/50" />
                </div>
              )}
            </div>

            {/* Content Section - Centered */}
            <div className="p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
              {/* Venue Information */}
              <div className="space-y-3 sm:space-y-4 mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
                  {venue.name}
                </h3>

                <address className="text-sm sm:text-base text-muted-foreground not-italic leading-relaxed">
                  {venue.address && (
                    <p className="font-medium text-foreground/80">
                      {venue.address}
                    </p>
                  )}
                  <p>
                    {venue.city}, {venue.state} {venue.zipCode}
                  </p>
                </address>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Primary Action - Get Directions */}
                <Button
                  variant="default"
                  size="default"
                  className="flex-1 sm:flex-none font-semibold group"
                  asChild
                >
                  <a
                    href="#" // Replace with actual directions URL
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Get directions to ${venue.name}`}
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                    <ExternalLink className="w-3 h-3 ml-2 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </Button>

                {/* Secondary Action - View Details */}
                <Button
                  variant="outline"
                  size="default"
                  className="flex-1 sm:flex-none font-medium group"
                  asChild
                >
                  <a
                    href="#" // Replace with actual venue details URL
                    aria-label={`View details about ${venue.name}`}
                  >
                    <Info className="w-4 h-4 mr-2" />
                    View Details
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
