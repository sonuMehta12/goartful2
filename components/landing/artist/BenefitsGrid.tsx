import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Users,
  DollarSign,
  Zap,
  BarChartBig,
  Briefcase,
  Settings2,
  ShieldCheck,
} from "lucide-react"; // Refined icons

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
  iconBgClass?: string;
}

const benefits: Benefit[] = [
  {
    icon: DollarSign,
    title: "Build Sustainable Creative Income",
    description:
      "Transform your art into a reliable monthly income stream, on your terms. Be your own boss with no gatekeepers.",
    iconBgClass: "bg-green-500/10 text-green-600",
  },
  {
    icon: Users,
    title: "Connect with Real Art Lovers",
    description:
      "Less hustle on social media. We provide marketing and sales support to connect you with a genuine audience ready to experience your art.",
    iconBgClass: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Briefcase, // Representing flexibility and ease
    title: "Host Anywhere, Your Way",
    description:
      "Use any space—your home, cafés, parks, or partner studios. No studio rent or initial equipment investment barriers.",
    iconBgClass: "bg-purple-500/10 text-purple-600",
  },
  {
    icon: Settings2, // Representing tools & support
    title: "We Handle the Logistics",
    description:
      "Focus on your art, we'll provide you supplies and space with zero cost, payments, and the essential tools to run and manage your experiences smoothly.",
    iconBgClass: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: Zap,
    title: "Artist-First Low Commission",
    description:
      "Keep more of what you earn. No monthly fees, just a transparent, small commission when you make a sale through GoArtful.",
    iconBgClass: "bg-teal-500/10 text-teal-600",
  },
  {
    icon: BarChartBig, // Representing growth
    title: "Grow Beyond Experiences (Future)",
    description:
      "We're starting with experiences, with a vision for a marketplace to sell your art globally and a skill-up platform to teach online.",
    iconBgClass: "bg-indigo-500/10 text-indigo-600",
  },
];

const BenefitsGrid = () => {
  return (
    <section
      id="why-goartful"
      className="py-16 lg:py-24 bg-secondary/20 dark:bg-secondary/10"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight tracking-tight">
            Why Artists Choose GoArtful
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We provide the platform, tools, and community support designed for
            independent Indian artists to thrive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <Card
              key={benefit.title}
              className="text-center bg-card hover:shadow-xl transition-all duration-300 ease-in-out group border"
            >
              <CardHeader className="items-center pt-8 pb-4">
                <div
                  className={cn(
                    "mb-5 w-14 h-14 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-md",
                    benefit.iconBgClass || "bg-primary text-primary-foreground"
                  )}
                >
                  <benefit.icon className="w-7 h-7" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-8">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default BenefitsGrid;
