import { EventCard } from "@/components/events/EventCard";
import { EVENTS_DATA } from "@/lib/data/events"; // Import our static data
import type { Metadata } from "next";

// Updated metadata for the homepage as the main event browser
export const metadata: Metadata = {
  title: "goArful - Discover & Book Unique Art Experiences",
  description: "Explore a world of creativity. Find and book art workshops, festivals, and exhibitions that ignite your passion on goArful.",
};

// Placeholder components for Search & Filter - we'll create simple versions
// These would eventually be more complex client components with state and logic.
const EventSearchFilters = () => {
  return (
    <div className="mb-8 p-6 bg-card border border-border rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Find Your Next Experience</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Placeholder for Search Input */}
        <div className="md:col-span-2 lg:col-span-2">
          <label htmlFor="search" className="block text-sm font-medium text-muted-foreground mb-1">Search by keyword</label>
          <input type="text" name="search" id="search" placeholder="e.g., Painting, Festival, Noida" className="w-full p-2 border border-input rounded-md focus:ring-primary focus:border-primary" />
        </div>
        {/* Placeholder for Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-muted-foreground mb-1">Category</label>
          <select name="category" id="category" className="w-full p-2 border border-input rounded-md focus:ring-primary focus:border-primary">
            <option value="">All Categories</option>
            <option value="art-workshop">Art Workshop</option>
            <option value="art-festival">Art Festival</option>
            <option value="digital-art">Digital Art</option>
            {/* Add more categories dynamically later */}
          </select>
        </div>
        {/* Placeholder for Date Filter */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-muted-foreground mb-1">Date</label>
          <input type="date" name="date" id="date" className="w-full p-2 border border-input rounded-md focus:ring-primary focus:border-primary"/>
        </div>
        {/* Add more filters: Price, Location etc. */}
      </div>
      <div className="mt-4 text-right">
        <button type="button" className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

const PaginationControls = ({ currentPage, totalPages }: { currentPage: number, totalPages: number }) => {
  // Basic pagination - would be more complex
  if (totalPages <= 1) return null;
  return (
    <div className="mt-12 flex justify-center items-center space-x-2">
      <button className="px-4 py-2 border rounded-md hover:bg-muted" disabled={currentPage === 1}>Previous</button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          className={`px-4 py-2 border rounded-md ${currentPage === page ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
        >
          {page}
        </button>
      ))}
      <button className="px-4 py-2 border rounded-md hover:bg-muted" disabled={currentPage === totalPages}>Next</button>
    </div>
  );
};


export default function HomePage() {
  // For now, we display all events.
  // Later, this `events` array will be the result of fetching, searching, filtering, and pagination.
  const allEvents = EVENTS_DATA;

  // Placeholder for pagination state (would come from URL params or state management)
  const currentPage = 1;
  const itemsPerPage = 9; // e.g., 9 cards per page for a 3-column layout
  const totalPages = Math.ceil(allEvents.length / itemsPerPage);
  
  // Simulate slicing for current page (actual pagination logic would be more robust)
  const displayedEvents = allEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      {/* Optional: A smaller, more focused hero section if any */}
      <section className="text-center mb-10 sm:mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Discover Unique Art Experiences
        </h1>
        <p className="mt-3 text-md sm:text-lg text-muted-foreground max-w-xl mx-auto">
          Your curated guide to the most inspiring art events and workshops.
        </p>
      </section>

      {/* Search and Filter Section - Placeholder */}
      <EventSearchFilters />

      {/* Event Grid Section */}
      {displayedEvents && displayedEvents.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <PaginationControls currentPage={currentPage} totalPages={totalPages} />
        </>
      ) : (
        <div className="py-12 text-center">
          <h2 className="text-2xl font-semibold mb-2">No Events Found</h2>
          <p className="text-muted-foreground">
            Try adjusting your search or filters, or check back later!
          </p>
        </div>
      )}
    </div>
  );
}