// components/event-detail/EventGalleryClient.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { GalleryImageItem } from "@/lib/types/event"; // Import the specific type

interface EventGalleryClientProps {
  images?: GalleryImageItem[] | null; // Make images prop optional
  eventName?: string; // For more descriptive alt texts if needed
}

export default function EventGalleryClient({
  images,
  eventName = "Event",
}: EventGalleryClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure component is mounted on client before using client-specific logic
  }, []);

  if (!isClient || !images || images.length === 0) {
    // Optionally, render a placeholder or nothing if no images
    // This also prevents issues with initial render if images are undefined/null
    return (
      <div className="py-16 sm:py-20 lg:py-24 bg-muted/30 animate-pulse">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-12">
            <div className="h-8 bg-muted-foreground/20 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-6 bg-muted-foreground/20 rounded w-1/2 mx-auto"></div>
          </div>
          <div className="relative aspect-video md:aspect-[16/7] lg:aspect-[2/1] bg-muted-foreground/20 rounded-xl shadow-lg"></div>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImage = images[currentImageIndex];

  if (!currentImage) {
    // Should not happen if images.length > 0, but good for safety
    return <p>Error displaying image.</p>;
  }

  return (
    <section className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Visual Journey
          </h2>
          <p className="text-lg text-muted-foreground mt-2">
            A glimpse into the vibrant and creative atmosphere of the
            experience.
          </p>
        </div>

        <div className="space-y-6">
          <div className="relative group overflow-hidden rounded-xl aspect-video md:aspect-[16/7] lg:aspect-[2/1] shadow-lg">
            <Image
              src={currentImage.url}
              alt={
                currentImage.alt ||
                `${eventName} - Image ${currentImageIndex + 1}`
              }
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              priority={currentImageIndex === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevImage}
                  className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 bg-background/70 hover:bg-background text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full w-10 h-10 sm:w-12 sm:h-12"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextImage}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 bg-background/70 hover:bg-background text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full w-10 h-10 sm:w-12 sm:h-12"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
              </>
            )}
            {/* Optional: Alt text as caption on hover */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-xs sm:text-sm bg-black/60 px-3 py-1.5 rounded-md backdrop-blur-sm inline-block">
                {currentImage.alt ||
                  `${eventName} - Image ${currentImageIndex + 1}`}
              </p>
            </div>
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 pt-2">
              {images.map((image, index) => (
                <button
                  key={image.id || image.url} // Use id if available, fallback to url for key
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    "relative aspect-video rounded-md overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary transition-all duration-200",
                    index === currentImageIndex
                      ? "ring-2 ring-primary ring-offset-2 shadow-lg scale-105"
                      : "opacity-60 hover:opacity-100 hover:scale-105"
                  )}
                  aria-label={`View image: ${
                    image.alt || `${eventName} - Thumbnail ${index + 1}`
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={`Thumbnail for ${
                      image.alt || `${eventName} - Image ${index + 1}`
                    }`}
                    fill
                    className="object-cover"
                    sizes="33vw"
                  />
                  {index === currentImageIndex && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
