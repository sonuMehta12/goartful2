// app/events/[slug]/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonPlaceholder } from "@/components/ui/SkeletonPlaceholder"; // Import your new component

export default function EventDetailLoading() {
  return (
    <div className="bg-background">
      {/* ... Skeleton for Hero Section (can remain as is or use SkeletonPlaceholder for text parts) ... */}
      <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] bg-muted animate-pulse">
        <div className="absolute inset-0 flex items-end pb-12 sm:pb-16 lg:pb-20 justify-center">
          <div className="text-center max-w-3xl space-y-3">
            <SkeletonPlaceholder
              lines={1}
              lineHeightClassName="h-6"
              lineWidths={["w-32"]}
              className="mx-auto"
              rounded="md"
            />
            <SkeletonPlaceholder
              lines={1}
              lineHeightClassName="h-10 sm:h-12 md:h-14"
              lineWidths={["w-3/4 sm:w-2/3"]}
              className="mx-auto"
              rounded="lg"
            />
            <SkeletonPlaceholder
              lines={1}
              lineHeightClassName="h-6"
              lineWidths={["w-1/2 sm:w-1/3"]}
              className="mx-auto"
              rounded="md"
            />
          </div>
        </div>
      </div>
      {/* ... rest of hero ... */}

      <div className="container mx-auto max-w-7xl px-4 py-8 lg:py-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 xl:gap-12">
          <div className="lg:col-span-2 space-y-10 md:space-y-12">
            {/* Skeleton for Description/Host/Venue section */}
            <div className="space-y-4">
              <SkeletonPlaceholder
                lines={1}
                lineHeightClassName="h-8"
                lineWidths={["w-3/4"]}
                rounded="md"
              />
              <SkeletonPlaceholder
                lines={3}
                lineHeightClassName="h-5"
                lineSpacingClassName="space-y-2.5"
                rounded="md"
              />
              <Skeleton className="h-28 w-full bg-muted rounded-lg mt-6" />{" "}
              {/* Host Card Placeholder */}
            </div>
            {/* ... other sections ... */}
          </div>
          {/* ... sidebar ... */}
        </div>
      </div>
    </div>
  );
}
