// components/event-detail/EventLocationSection.tsx
import type { Venue } from "@/lib/types/event"; // Our refined Venue type
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  MapPin,
  ExternalLink,
  ParkingCircle,
  TramFront,
  Accessibility as AccessibilityIconLucide,
  Wind,
  LayoutGrid,
  Car,
  Info,
  ShieldCheck,
  Users,
  Wifi, // Added more specific icons
} from "lucide-react";
import { Separator } from "@/components/ui/separator"; // Optional for visual separation
import { cn } from "@/lib/utils";

interface EventLocationSectionProps {
  venue: Venue;
}

// Enhanced icon mapping helper
const getDetailIcon = (
  detailType: string,
  detailText: string
): React.ElementType => {
  const lowerText = detailText.toLowerCase();
  switch (detailType) {
    case "amenity":
      if (lowerText.includes("wifi")) return Wifi;
      if (lowerText.includes("parking")) return ParkingCircle; // Covered by howToGetThere.parking
      if (lowerText.includes("restroom")) return Users;
      if (lowerText.includes("water") || lowerText.includes("station"))
        return Wind;
      if (lowerText.includes("lounge")) return LayoutGrid;
      if (lowerText.includes("climate") || lowerText.includes("air condition"))
        return Wind; // Reusing Wind for AC
      if (
        lowerText.includes("food") ||
        lowerText.includes("stall") ||
        lowerText.includes("cafe")
      )
        return Info; // Generic for food
      break;
    case "accessibility":
      if (
        lowerText.includes("wheelchair") ||
        lowerText.includes("ramp") ||
        lowerText.includes("accessible entrance")
      )
        return AccessibilityIconLucide;
      if (lowerText.includes("elevator")) return AccessibilityIconLucide; // General accessibility
      if (lowerText.includes("service animal")) return ShieldCheck; // Using Shield for allowed/policy
      if (lowerText.includes("large print") || lowerText.includes("braille"))
        return Info; // Generic info
      if (
        lowerText.includes("asl") ||
        lowerText.includes("interpreters") ||
        lowerText.includes("hearing loop")
      )
        return Info;
      break;
  }
  return Info; // Default icon
};

export default function EventLocationSection({
  venue,
}: EventLocationSectionProps) {
  if (!venue) {
    // This case should ideally be handled by the parent page (e.g., not rendering this section if venue is missing)
    // but as a safeguard:
    return (
      <section id="location-venue" className="py-10 sm:py-12 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          Venue information is currently unavailable.
        </div>
      </section>
    );
  }

  const hasHowToGetThereInfo =
    venue.directions ||
    (venue.howToGetThere &&
      (venue.howToGetThere.publicTransport?.length ||
        venue.howToGetThere.byCar ||
        venue.howToGetThere.parking ||
        venue.howToGetThere.notes));

  return (
    <section id="location-venue" className="py-10 sm:py-12 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Venue & Getting There
          </h2>
          {venue.name && (
            <p className="mt-1 text-muted-foreground">
              Find your way to{" "}
              <span className="font-medium text-foreground">{venue.name}</span>{" "}
              and see what&apos;s available.
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Venue Image & Address Block */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            {venue.venueImage?.url && (
              <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-lg overflow-hidden shadow-lg group transition-all duration-300 ease-in-out hover:shadow-xl">
                <Image
                  src={venue.venueImage.url}
                  alt={venue.venueImage.alt || `Image of ${venue.name}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
            )}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3">
                {" "}
                {/* Reduced pb */}
                <CardTitle className="text-xl flex items-center text-foreground">
                  <MapPin className="w-5 h-5 mr-2.5 text-primary" />
                  {venue.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1 pt-0">
                <p>{venue.address}</p>
                <p>
                  {venue.city}, {venue.state} {venue.zipCode}
                </p>
                {venue.mapUrl && (
                  <Button
                    variant="link"
                    size="sm"
                    asChild
                    className="px-0 mt-2 h-auto text-sm font-medium"
                  >
                    <a
                      href={venue.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      View on Map{" "}
                      <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: How to Reach, Amenities, Accessibility */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {hasHowToGetThereInfo && (
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">
                    How to Reach
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  {venue.directions && (
                    <div className="pb-3">
                      <h4 className="font-medium text-foreground mb-1">
                        General Directions:
                      </h4>
                      <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                        {venue.directions}
                      </p>
                    </div>
                  )}
                  {venue.howToGetThere?.publicTransport &&
                    venue.howToGetThere.publicTransport.length > 0 && (
                      <div className="pt-3 border-t border-dashed">
                        <h4 className="font-medium text-foreground mb-1.5 flex items-center">
                          <TramFront className="w-4 h-4 mr-2 text-primary" /> By
                          Public Transport:
                        </h4>
                        <ul className="list-disc list-outside pl-5 space-y-1 text-muted-foreground">
                          {venue.howToGetThere.publicTransport.map(
                            (item, idx) => (
                              <li key={`pt-${idx}`}>{item}</li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  {venue.howToGetThere?.byCar && (
                    <div className="pt-3 border-t border-dashed">
                      <h4 className="font-medium text-foreground mb-1.5 flex items-center">
                        <Car className="w-4 h-4 mr-2 text-primary" /> By Car:
                      </h4>
                      <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                        {venue.howToGetThere.byCar}
                      </p>
                    </div>
                  )}
                  {venue.howToGetThere?.parking && (
                    <div className="pt-3 border-t border-dashed">
                      <h4 className="font-medium text-foreground mb-1.5 flex items-center">
                        <ParkingCircle className="w-4 h-4 mr-2 text-primary" />{" "}
                        Parking:
                      </h4>
                      <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                        {venue.howToGetThere.parking}
                      </p>
                    </div>
                  )}
                  {venue.howToGetThere?.notes && (
                    <div className="pt-3 mt-3 border-t border-dashed">
                      <p className="text-xs text-muted-foreground italic">
                        {venue.howToGetThere.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {venue.amenities && venue.amenities.length > 0 && (
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">
                    Amenities On-site
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  {venue.amenities.map((amenity, idx) => {
                    const Icon = getDetailIcon("amenity", amenity);
                    return (
                      <div key={`am-${idx}`} className="flex items-center">
                        <Icon className="w-4 h-4 mr-2.5 text-primary shrink-0" />
                        <span className="text-muted-foreground">{amenity}</span>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}

            {venue.accessibility && venue.accessibility.length > 0 && (
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">
                    Accessibility Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  {venue.accessibility.map((item, idx) => {
                    const Icon = getDetailIcon("accessibility", item);
                    return (
                      <div key={`ac-${idx}`} className="flex items-center">
                        <Icon className="w-4 h-4 mr-2.5 text-primary shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
