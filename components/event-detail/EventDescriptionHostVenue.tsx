"use client";

import { Event, Host } from "@/lib/types/event";
import { VideoOff } from "lucide-react";

interface EventDescriptionHostVenueProps {
  event: Pick<Event, "description" | "host">;
}

export default function EventDescriptionHostVenue({
  event,
}: EventDescriptionHostVenueProps) {
  const hosts = event.host || [];
  const firstHost = hosts[0]; // Get the first host for intro video

  return (
    <section>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 md:space-y-12">
          {/* Artist Introduction Video Section */}
          {firstHost && (
            <div>
              <ArtistIntroVideo host={firstHost} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

interface ArtistIntroVideoProps {
  host: Host;
}

function ArtistIntroVideo({ host }: ArtistIntroVideoProps) {
  if (host.introVideoUrl) {
    return (
      <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl border border-border">
        <iframe
          width="100%"
          height="100%"
          src={convertToEmbedUrl(host.introVideoUrl)}
          title={`Artist introduction video by ${host.name}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    );
  }

  return (
    <div className="aspect-video rounded-xl bg-muted border border-dashed border-border flex flex-col items-center justify-center text-center p-8">
      <VideoOff className="w-16 h-16 text-muted-foreground/50 mb-4" />
      <p className="text-md font-semibold text-muted-foreground">
        {getFirstName(host.name)} hasn't added an intro video yet.
      </p>
      <p className="text-sm text-muted-foreground/80 mt-1">
        Stay tuned, or connect with them directly through their profile!
      </p>
    </div>
  );
}

function convertToEmbedUrl(url: string): string {
  // Basic YouTube embed conversion
  return url.replace("watch?v=", "embed/");
}

function getFirstName(name?: string | null): string {
  if (!name) return "The artist";
  return name.split(" ")[0];
}