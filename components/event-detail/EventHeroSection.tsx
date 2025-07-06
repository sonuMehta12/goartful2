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

  return (
    <section className="py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Layout - Stack vertically */}
        <div className="block lg:hidden">
          <ImageCarousel 
            images={images} 
            currentImageIndex={currentImageIndex}
            nextImage={nextImage}
            prevImage={prevImage}
            setCurrentImageIndex={setCurrentImageIndex}
            isLiked={isLiked}
            setIsLiked={setIsLiked}
            event={event}
            isMobile={true}
          />
          <div className="mt-6">
            <EventContent event={event} />
          </div>
        </div>

        {/* Desktop Layout - Two columns */}
        <div className="hidden lg:block">
          <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-start">
            {/* Left Column - Image */}
            <div className="relative">
              <ImageCarousel 
                images={images} 
                currentImageIndex={currentImageIndex}
                nextImage={nextImage}
                prevImage={prevImage}
                setCurrentImageIndex={setCurrentImageIndex}
                isLiked={isLiked}
                setIsLiked={setIsLiked}
                event={event}
                isMobile={false}
              />
            </div>

            {/* Right Column - Content */}
            <div className="flex flex-col justify-center max-h-[600px]">
              <EventContent event={event} isDesktop={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Reusable Image Carousel Component
interface ImageCarouselProps {
  images: any[];
  currentImageIndex: number;
  nextImage: () => void;
  prevImage: () => void;
  setCurrentImageIndex: (index: number) => void;
  isLiked: boolean;
  setIsLiked: (liked: boolean) => void;
  event: Event;
  isMobile: boolean;
}

function ImageCarousel({
  images,
  currentImageIndex,
  nextImage,
  prevImage,
  setCurrentImageIndex,
  isLiked,
  setIsLiked,
  event,
  isMobile
}: ImageCarouselProps) {
  const heightClass = isMobile ? "h-[40vh] sm:h-[50vh]" : "aspect-square";
  const buttonSize = isMobile ? "w-5 h-5" : "w-6 h-6";
  const buttonPadding = isMobile ? "p-2" : "p-3";
  const dotSize = isMobile ? "w-2 h-2" : "w-3 h-3";
  const actionButtonGap = isMobile ? "gap-2" : "gap-3";

  return (
    <div className={`relative ${heightClass} overflow-hidden rounded-xl shadow-xl border border-border`}>
      <Image
        src={images[currentImageIndex].url}
        alt={images[currentImageIndex].alt || event.name}
        fill
        priority
        className="object-cover transition-opacity duration-500"
      />

      {/* Carousel Controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className={`absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white ${buttonPadding} rounded-full transition-all duration-200 backdrop-blur-sm`}
            aria-label="Previous image"
          >
            <ChevronLeft className={buttonSize} />
          </button>
          <button
            onClick={nextImage}
            className={`absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white ${buttonPadding} rounded-full transition-all duration-200 backdrop-blur-sm`}
            aria-label="Next image"
          >
            <ChevronRight className={buttonSize} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`${dotSize} rounded-full transition-all duration-200 ${
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

      {/* Action Buttons */}
      <div className={`absolute top-4 right-4 flex ${actionButtonGap}`}>
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`bg-black/50 hover:bg-black/70 text-white ${buttonPadding} rounded-full transition-all duration-200 backdrop-blur-sm`}
          aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`${buttonSize} ${
              isLiked ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </button>
        <button
          className={`bg-black/50 hover:bg-black/70 text-white ${buttonPadding} rounded-full transition-all duration-200 backdrop-blur-sm`}
          aria-label="Share event"
        >
          <Share2 className={buttonSize} />
        </button>
      </div>
    </div>
  );
}

// Reusable Event Content Component
interface EventContentProps {
  event: Event;
  isDesktop?: boolean;
}

function EventContent({ event, isDesktop = false }: EventContentProps) {
  return (
    <div className="space-y-6">
      {/* Event Title & Category */}
      <div className="space-y-4">
        {event.category && (
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-primary/20"
          >
            {event.category.name}
          </Badge>
        )}
        <div className="space-y-3">
          <h1 className={`font-bold text-foreground leading-tight ${
            isDesktop ? "text-2xl xl:text-3xl" : "text-3xl sm:text-4xl lg:text-5xl"
          }`}>
            {event.name}
          </h1>
          {event.tagline && (
            <p className={`text-muted-foreground leading-relaxed ${
              isDesktop ? "text-base xl:text-lg" : "text-lg sm:text-xl"
            }`}>
              {event.tagline}
            </p>
          )}
        </div>
      </div>

      {/* Critical Stats Grid */}
      <QuickStats event={event} isDesktop={isDesktop} />
    </div>
  );
}

// Reusable Quick Stats Component
interface QuickStatsProps {
  event: Event;
  isDesktop?: boolean;
}

function QuickStats({ event, isDesktop = false }: QuickStatsProps) {
  const stats = [
    {
      key: 'duration',
      icon: Clock,
      label: 'Duration',
      value: event.duration,
      show: !!event.date
    },
    {
      key: 'rating',
      icon: Star,
      label: 'Rating',
      value: `${event.averageRating?.toFixed(1)} (${event.reviewCount})`,
      show: !!(event.averageRating && event.reviewCount > 0),
      iconClass: 'text-yellow-400 fill-yellow-400'
    },
    {
      key: 'age',
      icon: Users,
      label: 'Who can join',
      value: event.ageRequirement,
      show: !!event.ageRequirement
    },
    {
      key: 'location',
      icon: MapPin,
      label: 'Location',
      value: `${event.venue.name}, ${event.venue.city}`,
      show: true
    }
  ];

  const visibleStats = stats.filter(stat => stat.show);
  const iconSize = isDesktop ? "w-4 h-4" : "w-6 h-6";
  const padding = isDesktop ? "p-3" : "p-4";
  const textSize = isDesktop ? "text-xs" : "text-sm sm:text-base";

  return (
    <div className="grid grid-cols-2 gap-3">
      {visibleStats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.key} className="border-0 bg-muted/50 hover:bg-muted/70 transition-colors">
            <CardContent className={`${padding} text-center`}>
              <Icon className={`${iconSize} mx-auto mb-2 text-primary ${stat.iconClass || ''}`} />
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">
                {stat.label}
              </p>
              <p className={`${textSize} font-semibold text-foreground`}>
                {stat.value}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}