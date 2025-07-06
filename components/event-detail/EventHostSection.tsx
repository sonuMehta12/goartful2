// components/event-detail/EventHostSection.tsx
import type { Host } from "@/lib/types/event";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Users, Star, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventHostSectionProps {
  hosts: Host[];
}

export default function EventHostSection({ hosts }: EventHostSectionProps) {
  if (!hosts || hosts.length === 0) {
    return (
      <section id="event-hosts" className="py-6 sm:py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Host information is currently being finalized.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="event-hosts" className="py-6 sm:py-8 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center sm:justify-start justify-center">
            <Users className="w-6 h-6 sm:w-7 sm:h-7 mr-3 text-primary shrink-0" />
            {hosts.length === 1 ? "Your Host" : "Your Hosts"}
          </h2>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base max-w-2xl">
            {hosts.length === 1 
              ? "Meet the creative mind behind this experience" 
              : "Meet the talented team bringing this experience to life"
            }
          </p>
        </div>

        {/* Hosts Grid */}
        <div className={cn(
          "grid gap-4 sm:gap-6",
          hosts.length === 1 ? "max-w-md mx-auto" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        )}>
          {hosts.map((host) => (
            <Link
              key={host.id}
              href={`/artist/${host.id}`}
              className="group block"
            >
              <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-primary/20 group-hover:scale-[1.02]">
                {/* Host Image */}
                <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                  {host.avatar?.url ? (
                    <Image
                      src={host.avatar.url}
                      alt={host.avatar.alt || `Photo of ${host.name}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    // Fallback if no image
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Users className="w-12 h-12 text-muted-foreground/50" />
                    </div>
                  )}
                  
                  {/* Verified Badge */}
                  {host.verified && (
                    <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm rounded-full p-1.5">
                      <CheckCircle className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </div>

                {/* Host Info */}
                <div className="p-4 sm:p-5">
                  <div className="space-y-2">
                    {/* Host Name */}
                    <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">
                      {host.name}
                    </h3>

                    {/* Host Title */}
                    {host.title && (
                      <p className="text-sm sm:text-base text-muted-foreground font-medium line-clamp-1">
                        {host.title}
                      </p>
                    )}

                    {/* Host Tagline */}
                    {host.tagline && (
                      <p className="text-xs sm:text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed">
                        {host.tagline}
                      </p>
                    )}

                    {/* Host Rating (if available) */}
                    {host.hostRating && host.hostReviewCount && (
                      <div className="flex items-center gap-1 pt-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-medium text-foreground">
                          {host.hostRating.toFixed(1)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({host.hostReviewCount} reviews)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Hosts Button (if more than 3 hosts) */}
        {hosts.length > 3 && (
          <div className="mt-6 sm:mt-8 text-center">
            <Button
              variant="outline"
              size="default"
              className="font-medium"
              asChild
            >
              <Link href="/hosts">
                View All Hosts
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}