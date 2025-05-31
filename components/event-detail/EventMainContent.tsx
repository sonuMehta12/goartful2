// components/event-detail/EventMainContent.tsx
import { Event } from "@/lib/types/event";
// Import the refined section components (we'll create/refactor these next)
import EventDescriptionHostVenue from "./EventDescriptionHostVenue";
import EventWhatYoullDo from "./WhatYoullDo"; // Assuming this is a client component
import EventLogistics from "./EventLogistics"; // Assuming this is a client component
import EventGalleryClient from "./EventGalleryClient"; // Assuming it's a client component
import EventReviewsClient from "./EventReviewsClient"; // Assuming this is a client component
import EventPoliciesClient from "./EventPoliciesClient"; // Assuming this is a client component
import EventLocationSection from "./EventLocationSection";
// ... other sections you might have like RelatedEvents

interface EventMainContentProps {
  event: Pick<
    Event,
    | "description"
    | "host"
    | "venue"
    | "whatYoullDo"
    | "galleryImages"
    | "averageRating"
    | "reviewCount"
    | "reviews"
    | "policies"
    | "faqs"
    | "category"
    | "tags"
    | "skillLevel"
    | "ageRequirement"
    | "highlights"
    | "materialsIncluded"
    | "foodIncluded"
    | "whatToBring"
    | "whatToWear"
    | "prerequisites"
  >;
}

export default function EventMainContent({ event }: EventMainContentProps) {
  return (
    <>
      {/* Description, Host Info, Basic Venue Snippet */}
      <EventDescriptionHostVenue event={event} />

      {/* What You'll Do Section */}
      {event.whatYoullDo && event.whatYoullDo.length > 0 && (
        <EventWhatYoullDo items={event.whatYoullDo} />
      )}

      {/* Gallery Section */}
      {event.galleryImages && event.galleryImages.length > 0 && (
        <EventGalleryClient images={event.galleryImages} />
      )}

      {/* Logistics: Highlights, Materials, What to Bring/Wear, Prerequisites */}
      <EventLogistics event={event} />

      {/* Location Details Section */}
      <EventLocationSection venue={event.venue} />

      {/* We can have a dedicated EventLocationSection.tsx that uses event.venue */}
      {/* For now, assuming EventDescriptionHostVenue covers basic venue display */}

      {/* Reviews Section */}
      <EventReviewsClient
        eventId={(event as any).id}
        eventName={(event as any).name || ""}
        reviews={event.reviews || []}
        averageRating={event.averageRating ?? 0}
        reviewCount={event.reviewCount ?? 0}
      />

      {/* Policies & FAQ Section */}
      <EventPoliciesClient policies={event.policies} faqs={event.faqs} />

      {/* Related Events Section (Example) */}
      {/* {event.relatedEvents && event.relatedEvents.length > 0 && (
        <RelatedEventsSection events={event.relatedEvents} />
      )} */}
    </>
  );
}
