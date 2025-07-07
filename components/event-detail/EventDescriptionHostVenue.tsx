"use client";
import { Event, Host } from "@/lib/types/event";
import { VideoOff, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

interface EventDescriptionHostVenueProps {
  event: Pick<Event, "host" | "whatYoullDo">;
}

export default function EventDescriptionHostVenue({ event }: EventDescriptionHostVenueProps) {
  const hosts = event.host || [];
  const firstHost = hosts[0]; // Get the first host for intro video
  const whatYoullDo = (event.whatYoullDo || [])
    .filter(item => item && item.title && item.description)
    .map(item => ({
      id: item.id,
      image: item.image && item.image.url && item.image.alt
        ? { url: item.image.url, alt: item.image.alt }
        : { url: "/imgs/logo-dark.svg", alt: item.title || "Activity" },
      title: item.title,
      description: item.description,
    }));

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-4">
          {/* Artist Introduction Carousel Section */}
          {firstHost && (
            <div className="space-y-6">
              <ArtistIntroCarousel host={firstHost} slides={whatYoullDo} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ArtistIntroCarouselProps {
  host: Host;
  slides: Array<{
    id: string;
    image: { url: string; alt: string };
    title: string;
    description: string;
  }>;
}

function ArtistIntroCarousel({ host, slides }: ArtistIntroCarouselProps) {
  const [isClient, setIsClient] = useState(false);
  
  const autoplayOptions = {
    delay: 4000,
    stopOnInteraction: true,
    stopOnMouseEnter: true,
  };
  
  const emblaOptions: EmblaOptionsType = {
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
  };
  
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, [
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    
    const currentApi = emblaApi;
    const onSelect = () => setSelectedIndex(currentApi.selectedScrollSnap());
    
    setScrollSnaps(currentApi.scrollSnapList());
    currentApi.on("select", onSelect);
    onSelect();
    
    return () => {
      currentApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Group images in pairs for dual display
  const groupedImages = [];
  for (let i = 0; i < slides.length; i += 2) {
    groupedImages.push(slides.slice(i, i + 2));
  }

  // If no carousel images, show placeholder
  if (!isClient || slides.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
          <VideoOff className="w-8 h-8 text-gray-400" />
        </div>
        <div className="space-y-2">
          <p className="text-gray-600 font-medium">
            {getFirstName(host.name)} hasn't added content yet.
          </p>
          <p className="text-sm text-gray-500">
            Stay tuned, or connect with them directly through their profile!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
            Activities You'll Experience
          </h3>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the hands-on activities and moments you'll enjoy with {getFirstName(host.name)}
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {groupedImages.map((imageGroup, slideIndex) => (
              <div key={slideIndex} className="flex-[0_0_100%] min-w-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                  {imageGroup.map((slide, imageIndex) => (
                    <div
                      key={slide.id}
                      className="group space-y-4"
                    >
                      {/* 1:1 Image Container */}
                      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 group-hover:shadow-lg transition-all duration-300">
                        <Image
                          src={slide.image.url}
                          alt={slide.image.alt || slide.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        
                        {/* Subtle hover overlay for interactivity */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                        
                       
                      </div>
                      
                      {/* Content Below Image */}
                      <div className="space-y-2 text-center md:text-left">
                        <h4 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200">
                          {slide.title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                          {slide.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        {emblaApi && groupedImages.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 -translate-x-2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-gray-200 z-10 rounded-full w-12 h-12"
              onClick={scrollPrev}
              aria-label="Previous activities"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 translate-x-2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-gray-200 z-10 rounded-full w-12 h-12"
              onClick={scrollNext}
              aria-label="Next activities"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}
      </div>

      {/* Activity Navigation Thumbnails */}
      {emblaApi && scrollSnaps.length > 1 && (
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center gap-3 max-w-md">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => scrollTo(Math.floor(index / 2))}
                className={cn(
                  "relative flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105",
                  "w-12 h-12 sm:w-14 sm:h-14", // Smaller thumbnail size
                  Math.floor(index / 2) === selectedIndex
                    ? "scale-110"
                    : "opacity-70 hover:opacity-100"
                )}
                aria-label={`Activity ${index + 1}: ${slide.title}`}
              >
                <Image
                  src={slide.image.url}
                  alt={slide.image.alt || slide.title}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
                
                {/* Index number overlay */}
                <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-xs font-semibold text-gray-900 shadow-sm">
                  {index + 1}
                </div>
                
                {/* Active indicator overlay */}
                {Math.floor(index / 2) === selectedIndex && (
                  <div className="absolute " />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function getFirstName(name?: string | null): string {
  if (!name) return "The artist";
  return name.split(" ")[0];
}