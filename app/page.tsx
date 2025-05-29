// app/page.tsx
// import { EventList } from '@/components/events/EventList'; // We'll create a placeholder

// For testing purposes, let's put some theme-aware elements here directly
// and create a simple EventList placeholder.
import { EventList } from "@/components/events/EventList";

export default function Home() {
  return (
    <div className="space-y-8"> {/* Replaced main with div, as main is in layout */}

      <EventList /> {/* Placeholder EventList */}
    </div>
  );
}