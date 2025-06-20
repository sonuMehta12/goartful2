import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Users,
  DollarSign,
  Zap,
  Monitor,
  MapPin,
  Settings2,
  Settings,
} from "lucide-react";

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
  iconBgClass?: string;
}

const benefits: Benefit[] = [
  /*





*/
  {
    icon: Users,
    title: "Free to Join",
    description:
      "Join GoArtful for free No monthly fees. Just a small commission — and only when you earn through us.",
    iconBgClass: "bg-blue-500/10 text-blue-600",
  },

  {
    icon: DollarSign,
    title: "Earn up to ₹1 Lakh/Month",
    description:
      "Monetize your talent by hosting workshops, selling your artwork, and offering immersive artful experiences. and more.",
    iconBgClass: "bg-green-500/10 text-green-600",
  },

  {
    icon: Settings2,
    title: "Full Event Support",
    description:
      "No need to carry supplies, design sessions, or handles venues setup, GoVibeful takes care of it all for you.",
    iconBgClass: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: MapPin,
    title: "Host Anywhere, Your Way",
    description:
      "From cozy cafés to creative studios and even your home — host workshops on your terms using 100+ partner spaces without any rental fees.",
    iconBgClass: "bg-orange-500/10 text-orange-600",
  },

  {
    icon: Settings,
    title: "Full Control & Transparency",
    description:
      "Set your pricing, decide your schedule, and own your customer relationships — with no hidden policies or restrictions.",
    iconBgClass: "bg-gray-500/10 text-gray-600",
  },

  {
    icon: Users,
    title: "Free Marketing & Exposure",
    description:
      "Less stress on social media. We help you reach the right audience with dedicated marketing support tailored to your talent.",
    iconBgClass: "bg-blue-500/10 text-blue-600",
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
            to establish you as a professional creator with a growing community.
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
