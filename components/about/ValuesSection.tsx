// components/about/ValuesSection.tsx
import { Heart, Palette, Users, ShieldCheck, Handshake } from "lucide-react"; // Example Icons
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ValueItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const values: ValueItem[] = [
  {
    icon: Palette,
    title: "Art is an Experience",
    description:
      "True art transcends the canvas. It's in the shared moment of creation, the story, the unique identity an artist pours into their work. It’s about feeling art, not just observing it.",
  },
  {
    icon: Handshake,
    title: "Authenticity & Self-Expression",
    description:
      "Profound beauty emerges when we embrace who we truly are. We champion artists sharing their genuine selves, unique stories, and diverse perspectives.",
  },
  {
    icon: ShieldCheck,
    title: "Fairness & Respect",
    description:
      "Every artist deserves equal opportunity and deep respect for their creative spirit. We operate with honesty and transparency, ensuring you are valued.",
  },
  {
    icon: Users,
    title: "Empowerment Through Connection",
    description:
      "We break down barriers, connecting artists directly with those who appreciate them, fostering a supportive community in India where creative careers thrive.",
  },
];

const ValuesSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-secondary/10 dark:bg-muted/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
            The Soul of Our Canvas: Our Core Values
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            These principles guide every decision we make at GoArtful, shaping a
            platform built for and by the creative community.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="p-6 bg-card border border-border rounded-xl shadow-lg text-center hover:shadow-primary/10 transition-shadow flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-5">
                <value.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ValuesSection;
