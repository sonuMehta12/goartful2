// app/page.tsx
"use client"; // <= IMPORTANT: This page now needs to be a Client Component

import { useState, useMemo, useEffect } from "react";
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
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <section className="text-center mb-10 sm:mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Discover Unique Art Experiences
        </h1>
        <p className="mt-3 text-md sm:text-lg text-muted-foreground max-w-xl mx-auto">
          Your curated guide to the most inspiring art events and workshops.
        </p>
      </section>

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
