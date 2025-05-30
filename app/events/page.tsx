// app/events/page.tsx
import { EventCard } from "@/components/events/EventCard";
import { EVENTS_DATA } from "@/lib/data/events"; // Import our static data
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Events | goArful",
  description: "Find and discover amazing art events happening near you.",
};

export default function EventsPage() {
  // In a real app, this data would come from an API call.
  // For now, we use the static data directly.
  // This page is a Server Component by default.
  const events = EVENTS_DATA;

  if (!events || events.length === 0) {
    return (
      <section className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">No Events Found</h1>
        <p className="text-muted-foreground">
          Check back later for exciting new events!
        </p>
      </section>
    );
  }

  return (
    <section className="bg-muted/20 dark:bg-background">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Explore Events
          </h1>
          <p className="mt-3 text-md sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover a curated selection of art workshops, festivals, exhibitions, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}