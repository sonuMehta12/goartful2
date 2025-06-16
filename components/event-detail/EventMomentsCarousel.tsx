"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  UserCircle2,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import type { AttendeeMomentItem } from "@/lib/types/event"; // Or from gallery.ts
import { Card, CardContent } from "../ui/card";

interface EventMomentsCarouselProps {
  moments?: AttendeeMomentItem[] | null;
  eventName?: string; // For default alt text if needed
  options?: EmblaOptionsType;
}

// Helper to generate initials if not available
const getInitials = (name?: string | null): string => {
  if (!name || name.trim() === "") return ""; // Return empty if no name for better UI
  const parts = name.split(" ").filter(Boolean);
  if (parts.length === 0) return "";
  return parts
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export default function EventMomentsCarousel({
  moments,
  eventName = "Event Moment",
  options,
}: EventMomentsCarouselProps) {
  const [isClient, setIsClient] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const autoplayOptions = {
    delay: 4000, // Autoplay delay in ms
    stopOnInteraction: false, // Keep autoplaying after interaction
    stopOnMouseEnter: true, // Pause autoplay on hover
  };
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, ...options }, [
    Autoplay(autoplayOptions),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    if (autoplay.isPlaying()) autoplay.stop();
    else autoplay.play();
    setIsPlaying(autoplay.isPlaying());
  }, [emblaApi]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = (emblaApi: EmblaCarouselType) => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setIsPlaying(emblaApi.plugins().autoplay!.isPlaying()); // Sync play state
    };
    const onSettle = () => {
      // Autoplay might stop on interaction, ensure it restarts if intended
      if (
        emblaApi.plugins().autoplay &&
        !emblaApi.plugins().autoplay.isPlaying() &&
        autoplayOptions.stopOnInteraction === false
      ) {
        emblaApi.plugins().autoplay.play();
        setIsPlaying(true);
      }
    };

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("settle", onSettle); // Re-check autoplay after scroll settles
    emblaApi.on("pointerDown", () => {
      // Explicitly stop on pointer down if not handled by stopOnInteraction
      if (
        emblaApi.plugins().autoplay?.isPlaying() &&
        autoplayOptions.stopOnInteraction
      ) {
        emblaApi.plugins().autoplay.stop();
      }
    });

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("settle", onSettle);
    };
  }, [emblaApi, setScrollSnaps, autoplayOptions.stopOnInteraction]);

  if (!isClient || !moments || moments.length === 0) {
    // Skeleton / Placeholder
    return (
      <section className="py-12 sm:py-16 bg-muted/20 dark:bg-card animate-pulse">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 bg-muted-foreground/20 rounded w-3/4 mx-auto mb-4 sm:w-1/2 lg:w-1/3"></div>
          <div className="h-6 bg-muted-foreground/20 rounded w-1/2 mx-auto mb-10 sm:w-1/3 lg:w-1/4"></div>
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-72 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 bg-muted-foreground/10 rounded-lg"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 bg-muted/20 dark:bg-card overflow-hidden">
      {" "}
      {/* overflow-hidden for carousel partial view */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Moments from Our Community
          </h2>
          <p className="text-lg text-muted-foreground mt-2">
            See what fellow art lovers and creators are sharing!
          </p>
        </div>

        <div className="relative group">
          <div className="embla_moments overflow-hidden" ref={emblaRef}>
            <div className="embla__container_moments flex touch-pan-y">
              {" "}
              {/* touch-pan-y to allow vertical scroll on touch devices */}
              {moments.map((moment, index) => (
                <div
                  className="embla__slide_moments relative flex-[0_0_90%] sm:flex-[0_0_70%] md:flex-[0_0_45%] lg:flex-[0_0_38%] xl:flex-[0_0_30%] min-w-0 pl-4"
                  key={moment.id}
                >
                  <Card className="w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl bg-card">
                    <div className="relative aspect-[3/4] sm:aspect-[4/5]">
                      {" "}
                      {/* Taller aspect ratio */}
                      {moment.mediaType === "image" ? (
                        <Image
                          src={moment.mediaUrl}
                          alt={
                            moment.altText ||
                            `Moment from ${moment.attendee.name}`
                          }
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 90vw, (max-width: 768px) 70vw, (max-width: 1024px) 45vw, 30vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-black flex items-center justify-center">
                          <Play className="w-16 h-16 text-white/70" />
                          <span className="sr-only">
                            Video: {moment.altText}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8 border-2 border-white/50">
                            {moment.attendee.avatarUrl ? (
                              <AvatarImage
                                src={moment.attendee.avatarUrl}
                                alt={moment.attendee.name}
                              />
                            ) : (
                              <AvatarFallback className="bg-primary/30 text-primary-foreground text-xs">
                                {getInitials(moment.attendee.name) || (
                                  <UserCircle2 size={18} />
                                )}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <p className="text-xs font-semibold text-white line-clamp-1">
                              {moment.attendee.name}
                            </p>
                            <p className="text-[10px] text-white/80 line-clamp-1">
                              {moment.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {moment.caption && (
                      <CardContent className="p-3 sm:p-4">
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                          {moment.caption}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {emblaApi &&
            moments.length > 2 && ( // Show only if more than 1 typically fits
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 sm:translate-x-0 z-10 bg-background/80 hover:bg-background rounded-full shadow-md h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={scrollPrev}
                  aria-label="Previous moment"
                >
                  {" "}
                  <ChevronLeft className="h-5 w-5" />{" "}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 sm:translate-x-0 z-10 bg-background/80 hover:bg-background rounded-full shadow-md h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={scrollNext}
                  aria-label="Next moment"
                >
                  {" "}
                  <ChevronRight className="h-5 w-5" />{" "}
                </Button>
              </>
            )}
        </div>

        {/* Dots and Autoplay Toggle */}
        {emblaApi && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {scrollSnaps.slice(0, 6).map(
              (
                _,
                index // Limit dots for very long carousels
              ) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-200 ease-in-out",
                    index === selectedIndex
                      ? "bg-primary scale-125 w-3 h-3"
                      : "bg-muted hover:bg-muted-foreground/50"
                  )}
                  aria-label={`Go to moment ${index + 1}`}
                />
              )
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleAutoplay}
              className="ml-4 h-7 w-7 text-muted-foreground hover:text-primary"
              aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
