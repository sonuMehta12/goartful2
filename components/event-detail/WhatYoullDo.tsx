import Image from "next/image";
import type { WhatYoullDoItem } from "@/lib/types/event";
import { cn } from "@/lib/utils";

interface EventWhatYoullDoProps {
  items?: WhatYoullDoItem[] | null;
}

const CARD_COLORS = [
  "bg-yellow-200/70 dark:bg-yellow-900/70",
  "bg-green-200/70 dark:bg-green-900/70",
  "bg-blue-200/70 dark:bg-blue-900/70",
] as const;

const MAX_DISPLAY_ITEMS = 3;

export default function EventWhatYoullDo({ items }: EventWhatYoullDoProps) {
  if (!items?.length) {
    return null;
  }

  const displayItems = items.slice(0, MAX_DISPLAY_ITEMS);

  return (
    <section className="py-6 sm:py-8 bg-muted/20 dark:bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <ActivityList items={displayItems} />
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="max-w-3xl mb-10 lg:mb-16">
      <h2 className="text-2xl lg:text-4xl font-bold text-foreground mb-4">
      Your Creative Journey
      </h2>
    </div>
  );
}

function ActivityList({ items }: { items: WhatYoullDoItem[] }) {
  return (
    <div className="space-y-6">
      {items.map((activity, index) => (
        <ActivityCard
          key={`${activity.title}-${index}`}
          activity={activity}
          colorIndex={index}
        />
      ))}
    </div>
  );
}

function ActivityCard({
  activity,
  colorIndex,
}: {
  activity: WhatYoullDoItem;
  colorIndex: number;
}) {
  return (
    <div
      className={cn(
        "p-6 sm:p-8 rounded-2xl shadow-lg transition-all duration-300 ease-in-out",
        "grid md:grid-cols-12 gap-6 items-center",
        CARD_COLORS[colorIndex % CARD_COLORS.length]
      )}
    >
      <ActivityImage activity={activity} />
      <ActivityContent activity={activity} />
    </div>
  );
}

function ActivityImage({ activity }: { activity: WhatYoullDoItem }) {
  return (
    <div className="md:col-span-4 lg:col-span-3">
      <div className="relative aspect-square rounded-xl overflow-hidden">
        {activity.image ? (
          <Image
            src={activity.image.url}
            alt={activity.image.alt || activity.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80vw, (max-width: 1024px) 40vw, 25vw"
          />
        ) : (
          <PlaceholderImage />
        )}
      </div>
    </div>
  );
}

function ActivityContent({ activity }: { activity: WhatYoullDoItem }) {
  return (
    <div className="md:col-span-8 lg:col-span-9 space-y-3">
      <h3 className="text-xl sm:text-2xl font-semibold text-foreground leading-tight">
        {activity.title}
      </h3>
      <p className="text-base text-muted-foreground leading-relaxed">
        {activity.description}
      </p>
    </div>
  );
}

function PlaceholderImage() {
  return (
    <div className="w-full h-full bg-muted flex items-center justify-center">
      <span className="text-muted-foreground text-sm">No image</span>
    </div>
  );
}