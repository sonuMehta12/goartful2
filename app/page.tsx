// app/page.tsx
"use client"; // <= IMPORTANT: This page now needs to be a Client Component

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { EventCard } from "@/components/events/EventCard";
import { EVENTS_DATA } from "@/lib/data/events";
import type { Event } from "@/lib/types/event"; // Import Event type
import { SearchFilters, INITIAL_FILTERS } from "@/lib/types/filters"; // Import filter types

import { SearchFilterBar } from "@/components/search/SearchFilterBar";
import { MobileSearchButton } from "@/components/search/MobileSearchButton";
import { SearchModal } from "@/components/search/SearchModal";

// For date comparisons
import { isWithinInterval, parseISO, startOfDay, endOfDay } from "date-fns";

// No Next.js 'Metadata' export from Client Components.
// Metadata should be handled in a parent Server Component (e.g., layout.tsx if static,
// or via generateMetadata if this page itself needs dynamic metadata based on server data).
// For now, we'll rely on the layout.tsx for general site metadata.
// If we need dynamic title based on filters, that's more advanced.

const ITEMS_PER_PAGE = 9; // Number of events per page

// Hero carousel data with responsive images
const heroSlides = [
  {
    id: "slide1",
    images: {
      mobile:
        "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1750446721/Frame_2782-min_1_br88xd.png",
      tablet:
        "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1750446638/Frame_2782-min_dk0ybm.png",
      desktop:
        "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1750446638/Frame_2782-min_dk0ybm.png",
    },
    alt: "Art workshop with people painting",
    url: "/join-artful",
  },
];

// Hero Carousel Component
const HeroCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      watchDrag: heroSlides.length > 1, // Only enable dragging if multiple slides
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: true,
        playOnInit: heroSlides.length > 1,
      }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="mb-4 sm:mb-4 relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {heroSlides.map((slide) => (
            <div
              key={slide.id}
              className="relative min-w-0 flex-[0_0_100%] h-[150px] sm:h-[300px]"
            >
              {slide.url ? (
                <Link href={slide.url} className="block w-full h-full">
                  {/* Mobile image (default) */}
                  <Image
                    src={slide.images.mobile}
                    alt={slide.alt}
                    fill
                    className="object-cover sm:hidden"
                    priority
                  />
                  {/* Tablet image */}
                  <Image
                    src={slide.images.tablet}
                    alt={slide.alt}
                    fill
                    className="object-cover hidden sm:block md:hidden"
                    priority
                  />
                  {/* Desktop image */}
                  <Image
                    src={slide.images.desktop}
                    alt={slide.alt}
                    fill
                    className="object-cover hidden md:block"
                    priority
                  />
                </Link>
              ) : (
                <div className="w-full h-full">
                  {/* Mobile image (default) */}
                  <Image
                    src={slide.images.mobile}
                    alt={slide.alt}
                    fill
                    className="object-cover sm:hidden"
                    priority
                  />
                  {/* Tablet image */}
                  <Image
                    src={slide.images.tablet}
                    alt={slide.alt}
                    fill
                    className="object-cover hidden sm:block md:hidden"
                    priority
                  />
                  {/* Desktop image */}
                  <Image
                    src={slide.images.desktop}
                    alt={slide.alt}
                    fill
                    className="object-cover hidden md:block"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Only show navigation buttons if there are multiple slides */}
      {heroSlides.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full shadow-md z-10 opacity-70 hover:opacity-100 transition-opacity"
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full shadow-md z-10 opacity-70 hover:opacity-100 transition-opacity"
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === selectedIndex
                    ? "bg-primary w-4"
                    : "bg-muted hover:bg-muted-foreground/50"
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default function HomePage() {
  const [filters, setFilters] = useState<SearchFilters>(INITIAL_FILTERS);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Memoize filtered events to avoid re-calculating on every render unless data or filters change
  const filteredEvents = useMemo(() => {
    let events: Event[] = EVENTS_DATA;

    // Apply text query filter
    if (filters.query) {
      const lowerQuery = filters.query.toLowerCase();
      events = events.filter(
        (event) =>
          event.name.toLowerCase().includes(lowerQuery) ||
          event.shortDescription.toLowerCase().includes(lowerQuery) ||
          event.venue.name.toLowerCase().includes(lowerQuery) ||
          event.venue.city.toLowerCase().includes(lowerQuery) ||
          event.host.name.toLowerCase().includes(lowerQuery) ||
          event.tags.some((tag) => tag.name.toLowerCase().includes(lowerQuery))
      );
    }

    // Apply category filter
    if (filters.category && filters.category !== "all") {
      events = events.filter((event) => event.category.id === filters.category);
    }

    // Apply date range filter
    if (filters.startDate || filters.endDate) {
      events = events.filter((event) => {
        const eventDate = parseISO(event.date); // Considering event.date is "YYYY-MM-DD"

        // For single date events (or considering only the primary date)
        if (filters.startDate && filters.endDate) {
          return isWithinInterval(eventDate, {
            start: startOfDay(filters.startDate),
            end: endOfDay(filters.endDate),
          });
        }
        if (filters.startDate) {
          return eventDate >= startOfDay(filters.startDate);
        }
        if (filters.endDate) {
          return eventDate <= endOfDay(filters.endDate);
        }
        // If event.upcomingDates needs to be checked, logic would be more complex here:
        // iterate upcomingDates and check if any session falls in range.
        // For MVP, we'll filter based on the primary `event.date`.
        return true;
      });
    }

    // Reset to page 1 whenever filters change (except for pagination itself)
    // This effect will run after filteredEvents is recalculated
    // We need a way to distinguish filter changes from pagination changes.
    // For now, this might reset page on pagination too, which is not ideal.
    // A more robust solution would involve useEffect with dependencies on filter parts.
    // For MVP simplicity, we'll handle this manually or accept this minor UX issue.

    return events;
  }, [filters]); // Re-filter only when 'filters' object changes

  // Effect to reset current page to 1 when filters (excluding pagination) change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.query, filters.category, filters.startDate, filters.endDate]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const displayedEvents = filteredEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  // More specific handler for the SearchFilterBar to update the whole filters object
  const handleFullFilterUpdate = (updatedFilters: SearchFilters) => {
    setFilters(updatedFilters);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0); // Scroll to top on page change
    }
  };

  // The PaginationControls component from your provided code
  const PaginationControls = ({
    currentPage,
    totalPages,
    onPageChange,
  }: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }) => {
    if (totalPages <= 1) return null;
    return (
      <div className="mt-12 flex justify-center items-center space-x-1 sm:space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-2 sm:px-4 sm:py-2 border rounded-md hover:bg-muted text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {/* Generate page numbers - more advanced logic for many pages might be needed */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 sm:px-4 sm:py-2 border rounded-md text-sm transition-colors ${
              currentPage === page
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "hover:bg-muted"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-2 sm:px-4 sm:py-2 border rounded-md hover:bg-muted text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-4 sm:py-12">
      <HeroCarousel />

      {/* Mobile Search Trigger */}
      <div className="md:hidden mb-6">
        <MobileSearchButton onClick={() => setIsSearchModalOpen(true)} />
      </div>

      {/* Desktop Search Filters (always visible) */}
      <div className="hidden md:block mb-8">
        <SearchFilterBar
          filters={filters}
          onFilterChange={handleFullFilterUpdate} // Use the handler that takes the full SearchFilters object
        />
      </div>

      {/* Event Grid Section */}
      {displayedEvents && displayedEvents.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="py-12 text-center min-h-[300px] flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            No Events Found
          </h2>
          <p className="text-muted-foreground">
            Try adjusting your search or filters!
          </p>
        </div>
      )}

      {/* Search Modal for Mobile */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onModalClose={() => setIsSearchModalOpen(false)}
        filters={filters}
        onFilterChange={handleFullFilterUpdate} // Use the handler that takes the full SearchFilters object
      />
    </div>
  );
}
