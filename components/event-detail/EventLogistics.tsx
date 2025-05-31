// components/event-detail/EventLogistics.tsx
import { Event } from "@/lib/types/event";
import {
  Check,
  Gift,
  ClipboardList,
  XCircle,
  Info,
  ListChecks,
  PackageOpen,
  Shirt,
} from "lucide-react";

interface DetailSectionProps {
  title: string;
  items?: string[] | null;
  icon?: React.ElementType;
  emptyMessage?: string;
}

const DetailSection: React.FC<DetailSectionProps> = ({
  title,
  items,
  icon: Icon,
  emptyMessage = "Not specified.",
}) => {
  if (!items || items.length === 0) {
    // Optionally render nothing or a message if items are empty, depending on design
    // return null;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
        {Icon && <Icon className="w-5 h-5 mr-2.5 text-primary" />}
        {title}
      </h3>
      {!items || items.length === 0 ? (
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      ) : (
        <ul className="space-y-1.5 list-inside list-disc pl-1">
          {items.map((item, index) => (
            <li
              key={index}
              className="text-sm text-muted-foreground flex items-start"
            >
              <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

interface EventLogisticsProps {
  event: Pick<
    Event,
    | "highlights"
    | "materialsIncluded"
    | "foodIncluded"
    | "whatToBring"
    | "whatToWear"
    | "prerequisites"
  >;
}

export default function EventLogistics({ event }: EventLogisticsProps) {
  const {
    highlights,
    materialsIncluded,
    foodIncluded,
    whatToBring,
    whatToWear,
    prerequisites,
  } = event;

  // Only render the section if there's at least one piece of logistic info
  const hasLogistics =
    highlights?.length ||
    materialsIncluded?.length ||
    foodIncluded?.length ||
    whatToBring?.length ||
    whatToWear?.length ||
    prerequisites;

  if (!hasLogistics) {
    return null;
  }

  return (
    <section className="py-8 border-t">
      <h2 className="text-2xl font-semibold text-foreground mb-6">
        Logistics & Preparation
      </h2>
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
        {highlights && highlights.length > 0 && (
          <DetailSection
            title="Event Highlights"
            items={highlights}
            icon={ListChecks}
          />
        )}
        {materialsIncluded && materialsIncluded.length > 0 && (
          <DetailSection
            title="Materials Included"
            items={materialsIncluded}
            icon={PackageOpen}
          />
        )}
        {foodIncluded && foodIncluded.length > 0 && (
          <DetailSection
            title="Food & Refreshments"
            items={foodIncluded}
            icon={Gift}
          /> /* Re-using Gift for food */
        )}
        {whatToBring && whatToBring.length > 0 && (
          <DetailSection
            title="What to Bring"
            items={whatToBring}
            icon={ClipboardList} /* Changed icon */
          />
        )}
        {whatToWear && whatToWear.length > 0 && (
          <DetailSection title="What to Wear" items={whatToWear} icon={Shirt} />
        )}
        {prerequisites && (
          <div className="md:col-span-2 pt-2">
            {" "}
            {/* Prerequisites can take full width if other items are sparse */}
            <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center">
              <Info className="w-5 h-5 mr-2.5 text-primary" />
              Prerequisites
            </h3>
            <p className="text-sm text-muted-foreground">{prerequisites}</p>
          </div>
        )}
      </div>
    </section>
  );
}
