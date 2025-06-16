// components/event-detail/EventHeroSection.tsx
"use client";

import { Event } from "@/lib/types/event";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  MapPin,
  Clock,
  Users,
  ChevronRight,
  Calendar as CalendarIcon,
  ChevronLeft,
  Heart,
  Share2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface EventHeroSectionProps {
  event: Event;
}

// Create image array for carousel (including hero image and any additional images)
const getEventImages = (event: Event) => {
  const images = [event.heroImage];
  // Add more images if available in your event type
  // if (event.additionalImages) images.push(...event.additionalImages);
  return images;
};

export default function EventHeroSection({ event }: EventHeroSectionProps) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const images = getEventImages(event);

  // Auto-advance carousel
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleHostClick = () => {
    if (event.host?.id) {
      console.log("Navigate to host profile:", event.host.id);
    }
  };

  return (
    <div className="relative">
      {/* Image Carousel Section - Clean, no text overlay */}
      <div className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] overflow-hidden bg-muted">
        {/* Current Image */}
        <Image
          src={images[currentImageIndex].url}
          alt={images[currentImageIndex].alt || event.name}
          fill
          priority
          className="object-cover transition-opacity duration-500"
        />

        {/* Carousel Controls - Only show if multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex
                      ? "bg-white"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Action Buttons - Top Right */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`w-5 h-5 ${
                isLiked ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </button>
          <button
            className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
            aria-label="Share event"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Enhanced Content Section - Prominent Stats & Info */}
      <div className="bg-background relative -mt-8 sm:-mt-10 lg:-mt-12 z-10 rounded-t-2xl lg:rounded-t-3xl  overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Event Title & Category */}
          <div className="mb-6">
            {event.category && (
              <Badge
                variant="secondary"
                className="mb-3 bg-primary/10 text-primary border-primary/20"
              >
                {event.category.name}
              </Badge>
            )}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 leading-tight">
              {event.name}
            </h1>
            {event.tagline && (
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {event.tagline}
              </p>
            )}
          </div>

          {/* Critical Stats Grid - Prominent & Scannable */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Duration */}
            {event.duration && (
              <Card className="border-0 bg-muted/50">
                <CardContent className="p-4 text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                    Duration
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-foreground">
                    {event.duration}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Rating */}
            {event.averageRating && event.reviewCount > 0 && (
              <Card className="border-0 bg-muted/50">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                    Rating
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-foreground">
                    {event.averageRating.toFixed(1)} ({event.reviewCount})
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Capacity */}
            {event.ageRequirement && (
              <Card className="border-0 bg-muted/50">
                <CardContent className="p-4 text-center">
                  <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                    Who can join
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-foreground">
                    {event.ageRequirement}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Location */}
            <Card className="border-0 bg-muted/50">
              <CardContent className="p-4 text-center">
                <MapPin className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                  Location
                </p>
                <p className="text-sm sm:text-base font-semibold text-foreground">
                  {event.venue.name}, {event.venue.city}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
