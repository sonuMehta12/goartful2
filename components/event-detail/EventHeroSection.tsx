// components/event-detail/EventHeroSection.tsx
"use client"; // If it uses client-side hooks for video or complex interactions

import { Event } from "@/lib/types/event";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  MapPin,
  Clock,
  Users,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { useRouter } from "next/navigation"; // Keep if handleHostClick is used

interface EventHeroSectionProps {
  event: Event;
}

// Placeholder for video poster image
const VIDEO_POSTER_URL = "/images/event-hero-poster.jpg"; // Ensure this image exists in public/images

export default function EventHeroSection({ event }: EventHeroSectionProps) {
  const router = useRouter(); // If you need router for host link, etc.

  const handleHostClick = () => {
    // Placeholder: In a real app, you might navigate to a host profile page
    // For now, let's assume host ID could be part of a URL structure
    if (event.host?.id) {
      // router.push(`/hosts/${event.host.id}`);
      console.log("Navigate to host profile:", event.host.id);
    }
  };

  return (
    <div className="relative">
      {/* Hero Media Section (Video or Image) */}
      <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
        {event.videoUrl ? (
          <>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              poster={event.videoPosterUrl || VIDEO_POSTER_URL}
            >
              <source src={event.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Fallback Image if video doesn't load, or as an overlay element if needed */}
            <Image
              src={event.heroImage.url}
              alt={event.heroImage.alt || event.name}
              fill
              priority
              className="absolute inset-0 w-full h-full object-cover -z-10 opacity-50" // Example fallback style
            />
          </>
        ) : (
          <Image
            src={event.heroImage.url}
            alt={event.heroImage.alt || event.name}
            fill
            priority
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end pb-12 sm:pb-16 lg:pb-20 justify-center">
          <div className="container mx-auto px-4 text-center text-white max-w-3xl">
            {event.category && (
              <Badge
                variant="secondary"
                className="mb-2 bg-white/20 text-white backdrop-blur-sm border-none"
              >
                {event.category.name}
              </Badge>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 leading-tight tracking-tight">
              {event.name}
            </h1>
            {event.tagline && (
              <p className="text-md sm:text-lg lg:text-xl opacity-90 leading-relaxed">
                {event.tagline}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content Section that overlays the bottom of the hero and continues below */}
      {/* This design (-mt-X) makes the content card appear to sit on top of the hero image */}
      <div className="bg-background relative -mt-10 sm:-mt-12 lg:-mt-16 z-10 rounded-t-2xl lg:rounded-t-3xl shadow-2xl overflow-hidden pt-px">
        {/* The actual content will be passed as children to the main page layout */}
        {/* This component is mainly for the visual hero part */}
        {/* We can add a small section here for key details if desired, or put it in EventMainContent */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-border">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {event.duration && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1.5 text-primary" />{" "}
                {event.duration}
              </div>
            )}
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1.5 text-primary" />{" "}
              {event.venue.name}, {event.venue.city}
            </div>
            {event.capacity && (
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1.5 text-primary" /> Max{" "}
                {event.capacity} guests
              </div>
            )}
            {event.averageRating && event.reviewCount > 0 && (
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />
                {event.averageRating.toFixed(1)} ({event.reviewCount} reviews)
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
