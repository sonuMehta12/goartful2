// components/event-detail/EventWhatYoullDo.tsx
import Image from "next/image";
import type { WhatYoullDoItem } from "@/lib/types/event"; // Import specific type

interface EventWhatYoullDoProps {
  items?: WhatYoullDoItem[] | null;
}

export default function EventWhatYoullDo({ items }: EventWhatYoullDoProps) {
  if (!items || items.length === 0) {
    return null; // Or a specific message if this section is crucial but empty
  }

  return (
    <section className="py-12 sm:py-16 bg-muted/20 dark:bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            What You&apos;ll Experience
          </h2>
          <p className="text-lg text-muted-foreground">
            A step-by-step journey through creativity, connection, and artistic
            discovery.
          </p>
        </div>

        <div className="space-y-12 lg:space-y-16">
          {items.map((activity, index) => (
            <div
              key={activity.title + index} // Combine title and index for a more unique key
              className="group grid lg:grid-cols-2 gap-8 sm:gap-12 items-center"
            >
              <div
                className={`relative aspect-video sm:aspect-[4/3] rounded-xl overflow-hidden shadow-lg ${
                  index % 2 === 0 ? "lg:order-1" : "lg:order-2" // Alternate image position
                }`}
              >
                {activity.image ? (
                  <Image
                    src={activity.image.url}
                    alt={activity.image.alt || activity.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">
                      No image provided
                    </span>
                  </div>
                )}
              </div>

              <div
                className={`space-y-3 ${
                  // Reduced space-y
                  index % 2 === 0 ? "lg:order-2" : "lg:order-1"
                } text-center lg:text-left`}
              >
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-semibold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-foreground leading-tight">
                  {activity.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {" "}
                  {/* Adjusted text size */}
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
