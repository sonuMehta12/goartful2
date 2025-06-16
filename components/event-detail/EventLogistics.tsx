import type { Event } from "@/lib/types/event";
import {
  PackageCheck,
  ShoppingBag,
  Info,
  Sparkles,
  ClipboardList,
  Shirt,
  ShieldAlert,
  FileCheck,
} from "lucide-react"; // Refined icons

interface ListItemProps {
  text: string;
  icon?: React.ElementType; // Allow passing specific icon for "Things to Know"
}

const ListItem: React.FC<ListItemProps> = ({ text, icon: ItemIcon }) => (
  <li className="flex items-start">
    {ItemIcon ? (
      <ItemIcon className="w-4 h-4 text-primary mr-2.5 mt-0.5 shrink-0" />
    ) : (
      <FileCheck className="w-4 h-4 text-green-500 mr-2.5 mt-0.5 shrink-0" />
    )}
    <span className="text-sm text-muted-foreground">{text}</span>
  </li>
);

interface EventLogisticsProps {
  event: Pick<
    Event,
    | "materialsIncluded"
    | "foodIncluded"
    | "whatToBring"
    | "whatToWear"
    | "prerequisites"
    | "policies"
  >;
}

export default function EventLogistics({ event }: EventLogisticsProps) {
  const {
    materialsIncluded,
    foodIncluded,
    whatToBring,
    whatToWear,
    prerequisites,
    policies,
  } = event;

  const whatsIncludedItems: string[] = [];
  if (materialsIncluded) whatsIncludedItems.push(...materialsIncluded);
  if (foodIncluded) whatsIncludedItems.push(...foodIncluded);

  const thingsToKnowItems: { text: string; icon?: React.ElementType }[] = [];
  if (whatToBring)
    whatToBring.forEach((item) =>
      thingsToKnowItems.push({ text: item, icon: ShoppingBag })
    );
  if (whatToWear)
    whatToWear.forEach((item) =>
      thingsToKnowItems.push({ text: item, icon: Shirt })
    );
  if (prerequisites)
    thingsToKnowItems.push({
      text: `Prerequisites: ${prerequisites}`,
      icon: Info,
    });
  if (policies?.cancellation) {
    // Extract first sentence of cancellation policy or a short summary
    const cancellationSnippet =
      policies.cancellation.split(".")[0] + "." ||
      "Cancellation policy applies.";
    thingsToKnowItems.push({
      text: `Cancellation: ${cancellationSnippet}`,
      icon: ShieldAlert,
    });
  }
  // Add any other "important notes" you might define on the event object

  const hasContent =
    whatsIncludedItems.length > 0 || thingsToKnowItems.length > 0;

  if (!hasContent) {
    return null; // Don't render the section if there's nothing to show
  }

  return (
    <section id="event-essentials" className="py-10 sm:py-12 border-t">
      {" "}
      {/* Added ID */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Your Event Essentials
          </h2>
          <p className="mt-1 text-muted-foreground">
            Everything you need to know to prepare for an amazing experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Column 1: What's Included */}
          {whatsIncludedItems.length > 0 && (
            <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <PackageCheck className="w-6 h-6 mr-3 text-primary" />
                What's Included
              </h3>
              <ul className="space-y-2">
                {whatsIncludedItems.map((item, index) => (
                  <ListItem key={`included-${index}`} text={item} />
                ))}
              </ul>
            </div>
          )}

          {/* Column 2: Good to Know */}
          {thingsToKnowItems.length > 0 && (
            <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <ClipboardList className="w-6 h-6 mr-3 text-primary" />
                Good to Know
              </h3>
              <ul className="space-y-2.5">
                {" "}
                {/* Increased spacing slightly */}
                {thingsToKnowItems.map((item, index) => (
                  <ListItem
                    key={`know-${index}`}
                    text={item.text}
                    icon={item.icon}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
