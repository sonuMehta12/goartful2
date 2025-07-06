import type { Event, GoodToKnowItem } from "@/lib/types/event";
import { BookOpen, FileText, Headphones, Mic, PlayCircle, Image, Package, Send } from "lucide-react";

interface EventLogisticsProps {
  event: Pick<Event, "goodToKnow">;
}

export default function EventLogistics({ event }: EventLogisticsProps) {
  const { goodToKnow } = event;

  if (!goodToKnow || goodToKnow.length === 0) {
    return null;
  }

  return (
    <section id="event-essentials" className="py-6 sm:py-8 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
            Everything You Need is Here
          </h2>

          <div className="space-y-4">
            {goodToKnow.map((item, index) => (
              <GoodToKnowItem key={`good-to-know-${index}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface GoodToKnowItemProps {
  item: GoodToKnowItem;
}

function GoodToKnowItem({ item }: GoodToKnowItemProps) {
  const IconComponent = getIconComponent(item.icon);
  
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card to-card/80 border border-border/50 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20 hover:-translate-y-1">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
            {IconComponent ? (
              <IconComponent className="h-6 w-6 text-primary" />
            ) : (
              <div className="h-6 w-6 rounded-full bg-primary/30" />
            )}
          </div>
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {item.heading}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.text}
          </p>
        </div>
      </div>
      
      {/* Subtle gradient overlay for premium feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}

// Helper function to get icon component based on string
function getIconComponent(iconName: string | undefined) {
  const iconMap = {
    BookOpen,
    FileText,
    Headphones,
    Mic,
    PlayCircle,
    Image,
    Package,
    Send,
  };
  
  if (!iconName || !(iconName in iconMap)) {
    return null;
  }
  
  return iconMap[iconName as keyof typeof iconMap];
}