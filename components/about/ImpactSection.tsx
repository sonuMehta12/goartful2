// components/about/ImpactSection.tsx
import { Heart, Lightbulb, Users } from "lucide-react"; // Users already imported, but re-listing
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ImpactSection = () => {
  const impacts = [
    {
      icon: Heart,
      title: "Healing & Self-Discovery",
      description:
        "We believe art experiences are therapeutic, helping individuals connect with themselves, process emotions, and find joy in creation – a personal journey I've experienced myself.",
    },
    {
      icon: Users,
      title: "Fostering Genuine Connections",
      description:
        "GoVibeful is more than transactions; it's about building a community where artists and art lovers share, learn, and grow together in authentic, local settings.",
    },
    {
      icon: Lightbulb,
      title: "Igniting India's Creative Spirit",
      description:
        "By empowering local artists and making diverse art forms accessible, we aim to enrich communities and cultivate a vibrant, participatory arts culture across India.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-secondary/10 dark:bg-muted/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
            The GoVibeful Ripple Effect
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            More than just a platform, we aim to create lasting positive change
            through the power of art experiences.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {impacts.map((impact) => (
            <Card
              key={impact.title}
              className="text-center bg-card border shadow-lg hover:shadow-primary/15 transition-shadow flex flex-col"
            >
              <CardHeader className="items-center pt-8 pb-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <impact.icon className="w-7 h-7" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {impact.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {impact.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ImpactSection;
