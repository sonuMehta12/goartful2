import { Event } from "@/lib/types/event";
// Import the refined section components (we'll create/refactor these next)
import EventDescriptionHostVenue from "./EventDescriptionHostVenue";
// import EventWhatYoullDo from "./WhatYoullDo"; // Assuming this is a client component
import EventLogistics from "./EventLogistics"; // Assuming this is a client component
import EventMomentsCarousel from "./EventMomentsCarousel"; // Assuming it's a client component
import EventReviewsClient from "./EventReviewsClient"; // Assuming this is a client component
import EventPoliciesClient from "./EventPoliciesClient"; // Assuming this is a client component
import EventLocationSection from "./EventLocationSection";
import EventHostSection from "./EventHostSection";
// ... other sections you might have like RelatedEvents

interface EventMainContentProps {
  event: Pick<
    Event,
    | "id"
    | "name"
    | "description"
    | "host"
    | "venue"
    | "whatYoullDo"
    | "galleryImages"
    | "averageRating"
    | "reviewCount"
    | "reviews"
    | "attendeeMoments"
    | "policies"
    | "faqs"
    | "category"
    | "tags"
    | "skillLevel"
    | "ageRequirement"
    | "goodToKnow"
  >;
}

export default function EventMainContent({ event }: EventMainContentProps) {
  return (
    <>
      {/* Description, Host Info, Basic Venue Snippet */}
      <EventDescriptionHostVenue event={event} />

      {/* What You'll Do Section */}
      {/* {event.whatYoullDo && event.whatYoullDo.length > 0 && (
        <EventWhatYoullDo items={event.whatYoullDo} />
      )} */}

      {/* Logistics: Highlights, Materials, What to Bring/Wear, Prerequisites */}
      <EventLogistics event={event} />

      {/* Location Details Section */}
      <EventLocationSection venue={event.venue} />

      {/* Hosts Section */}
      <EventHostSection hosts={event.host || []} />

      {event.attendeeMoments && event.attendeeMoments.length > 0 && (
        <EventMomentsCarousel
          moments={event.attendeeMoments}
          eventName={event.name}
          options={{ align: "start", slidesToScroll: 1 }} // Customize Embla options here
        />
      )}
      {/* Reviews Section */}
      <EventReviewsClient
        eventId={event.id}
        eventName={event.name}
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
