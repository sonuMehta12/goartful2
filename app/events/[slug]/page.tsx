// app/events/[slug]/page.tsx
import { EVENTS_DATA } from "@/lib/data/events";
import type { Event } from "@/lib/types/event";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";

import EventMainContent from "../../../components/event-detail/EventMainContent";
import FloatingBookingBarClient from "@/components/event-detail/FloatingBookingBarClient";
import EventHeroSection from "@/components/event-detail/EventHeroSection";
import EventBookingCardClient from "@/components/event-detail/EventBookingCardClient";

// Define props according to Next.js standard for page components
// In newer Next.js versions, params is a Promise
type PageComponentProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getEventBySlug(slug: string): Promise<Event | undefined> {
  return EVENTS_DATA.find((event) => event.slug === slug);
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return EVENTS_DATA.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata(
  { params, searchParams }: PageComponentProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Await the params Promise
  const resolvedParams = await params;
  const event = await getEventBySlug(resolvedParams.slug);

  if (!event) {
    return { title: "Event Not Found | goArful" };
  }

  return {
    title: `${event.name} | goArful`,
    description: event.shortDescription || event.description.substring(0, 160),
    openGraph: {
      title: event.name,
      description:
        event.shortDescription || event.description.substring(0, 160),
      images: event.heroImage
        ? [{ url: event.heroImage.url, alt: event.heroImage.alt || event.name }]
        : [],
      type: "article",
    },
  };
}

export default async function EventDetailPage({
  params,
  searchParams,
}: PageComponentProps) {
  // Await the params Promise
  const resolvedParams = await params;
  const event = await getEventBySlug(resolvedParams.slug);

  // Example: You could also await searchParams if needed
  // const resolvedSearchParams = await searchParams;
  // console.log("Event Detail Page Search Params:", resolvedSearchParams);

  if (!event) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-6xl px-0 py-0 lg:py-12 bg-background min-h-screen">
      <EventHeroSection event={event} />
      <div className="container mx-auto max-w-6xl px-0 py-0 lg:py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12">
          <div className="lg:col-span-8 xl:col-span-8 space-y-10 md:space-y-12">
            <EventMainContent event={event} />
          </div>
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-4">
            <div
              className="sticky top-24 space-y-6"
              data-booking-card="desktop-booking-card"
            >
              <EventBookingCardClient event={event} />
            </div>
          </aside>
        </div>
      </div>
      <FloatingBookingBarClient event={event} />
    </div>
  );
}
