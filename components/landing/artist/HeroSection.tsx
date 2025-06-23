"use client"; // Embla Carousel and its hooks require this

import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

// Define the type for the Embla API instance
type EmblaApiType = EmblaCarouselType;

const carouselImages = [
  {
    id: "blue",
    bg: "bg-blue-500",
    img: "https://images.unsplash.com/photo-1551180452-aea351b23949?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFydGlzdHxlbnwwfHwwfHx8MA%3D%3D",
    headline: "Get 100% payout",
    subheadline:
      "Get  up to 9k paid on the first 3 workshops guaranteed! Regardless of workshop success.",
  },
  {
    id: "green",
    bg: "bg-green-500",
    img: "https://images.unsplash.com/photo-1628359355624-855775b5c9c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXJ0aXN0fGVufDB8fDB8fHww",
    headline: "Connect with right audience",
    subheadline:
      "Connect with art lovers and buyers who truly understand  your art and story and pay your fairly.",
  },
  {
    id: "yellow",
    bg: "bg-yellow-400",
    img: "https://plus.unsplash.com/premium_photo-1673676883851-761e734d6cec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFydGlzdHxlbnwwfHwwfHx8MA%3D%3D",
    headline: "Fully free managed workshop",
    subheadline:
      "Get all your workshop support free from logistics to marketing.",
  },
];

const HeroSection = () => {
  const [isClient, setIsClient] = useState(false);
  const autoplayOptions = {
    delay: 2000,
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
    const currentApi = emblaApi; // Capture current API instance

    const onSelect = () => setSelectedIndex(currentApi.selectedScrollSnap());
    setScrollSnaps(currentApi.scrollSnapList());
    currentApi.on("select", onSelect);

    onSelect(); // Initial set
    return () => {
      currentApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="relative pt-20 sm:pt-20 lg:pt-24 pb-16 lg:pb-24 bg-gradient-to-br from-primary/10 via-background to-secondary/5 dark:from-primary/5 dark:via-background dark:to-secondary/3 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] [background-image:radial-gradient(var(--primary)_0.5px,transparent_0.5px)] [background-size:20px_20px]"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Text Content Section */}
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight mb-5 sm:mb-6">
            Turn Your Talent into an Sustainable Income.
            <span className="block sm:inline">On Your Terms.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto">
            Share your passion through unique art experiences, connect with
            genuine art lovers, and build a reliable creative income without
            gatekeepers.
          </p>
        </div>

        {/* Embla Carousel Section */}
        {isClient && carouselImages.length > 0 && (
          <div className="relative group mb-10 sm:mb-12">
            <div
              className="embla_hero overflow-hidden rounded-2xl"
              ref={emblaRef}
            >
              <div className="embla__container_hero flex">
                {carouselImages.map((slide, index) => (
                  <div
                    className={`embla__slide_hero relative flex-[0_0_90%] sm:flex-[0_0_45%] md:flex-[0_0_33.333%] min-w-0 px-3 ${slide.bg} flex flex-col items-center justify-center py-8`}
                    key={slide.id}
                  >
                    {/* Image with inner stroke and large radius */}
                    <div
                      className="bg-white p-1 rounded-3xl shadow-inner mb-6"
                      style={{ boxShadow: "inset 0 0 0 4px #e5e7eb" }}
                    >
                      <div className="overflow-hidden rounded-2xl">
                        <Image
                          src={slide.img}
                          alt={slide.headline}
                          width={300}
                          height={200}
                          className="object-cover w-[300px] h-[200px]"
                        />
                      </div>
                    </div>
                    {/* Headline and subheadline */}
                    <h3
                      className={`text-xl font-bold ${
                        slide.bg === "bg-yellow-400"
                          ? "text-gray-900"
                          : "text-white"
                      } mb-2 text-center drop-shadow-lg`}
                    >
                      {slide.headline}
                    </h3>
                    <p
                      className={`${
                        slide.bg === "bg-yellow-400"
                          ? "text-gray-900"
                          : "text-white/90"
                      } text-base text-center max-w-xs mx-auto drop-shadow-md`}
                    >
                      {slide.subheadline}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            {emblaApi && carouselImages.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background rounded-full shadow-lg h-9 w-9 sm:h-10 sm:w-10 opacity-0 group-hover:opacity-100 transition-opacity sm:-ml-4"
                  onClick={scrollPrev}
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background rounded-full shadow-lg h-9 w-9 sm:h-10 sm:w-10 opacity-0 group-hover:opacity-100 transition-opacity sm:-mr-4"
                  onClick={scrollNext}
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}

            {/* Dots Navigation */}
            {emblaApi && scrollSnaps.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                {scrollSnaps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300 ease-in-out",
                      index === selectedIndex
                        ? "bg-primary scale-125 w-3 h-3"
                        : "bg-muted hover:bg-primary/50"
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* CTA and Social Proof */}
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <Button
              asChild
              size="lg"
              className="font-semibold text-lg px-8 py-7 group transition-all duration-300 ease-in-out hover:shadow-lg transform hover:scale-105"
            >
              <Link href="https://docs.google.com/forms/d/e/1FAIpQLSekZS7qzDURw4S7hsRjj_daKliqW3HevX9jZ_T82FvZzeq5JQ/viewform?usp=header">
                Start Hosting on GoVibeful
                <ArrowRight className="w-5 h-5 ml-2.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="flex items-center justify-center text-sm text-muted-foreground space-x-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>
              {" "}
              GoVibeFul is onboarding 25 passionate artists, & creators to
              launch with us. Be the face of the movement.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
