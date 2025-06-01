import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, CalendarPlus, Zap, TrendingUp } from "lucide-react";
import Image from "next/image";

interface Step {
  icon: React.ElementType;
  title: string;
  description: string;
  imgSrc: {
    src: string;
    alt: string;
  };
}

const steps: Step[] = [
  {
    icon: UserCheck,
    title: "1. Craft Your Artist Profile",
    description:
      "Showcase your unique talent, share your artistic journey, and define the inspiring experiences you want to offer. It's quick and easy!",
    imgSrc: {
      src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      alt: "Artist creating their profile and portfolio",
    },
  },
  {
    icon: CalendarPlus,
    title: "2. Design & Price Your Experience",
    description:
      "List your workshops or events. Set your schedule, pick your ideal venues (even your home or online!), and price your offerings transparently.",
    imgSrc: {
      src: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      alt: "Planning and scheduling art workshops",
    },
  },
  {
    icon: TrendingUp,
    title: "3. Launch, Connect & Earn",
    description:
      "Go live! Welcome participants, share your passion, manage bookings effortlessly, and build your creative community while earning sustainably.",
    imgSrc: {
      src: "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      alt: "Artist conducting a successful workshop with participants",
    },
  },
];

const StepsSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-secondary/20 dark:bg-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 tracking-tight">
            Start Hosting in 3 Simple Steps
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Focus on your art. We make sharing it effortless.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {steps.map((step) => (
            <Card
              key={step.title}
              className="flex flex-col text-center bg-card border shadow-lg hover:shadow-xl transition-shadow duration-300 group overflow-hidden"
            >
              <div className="relative w-full aspect-video sm:aspect-[4/2.5] bg-muted overflow-hidden">
                <Image
                  src={step.imgSrc.src}
                  alt={step.imgSrc.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  priority={steps.indexOf(step) === 0}
                />
              </div>
              <CardHeader className="pt-6 pb-3 items-center">
                <div className="mb-4 w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-md transition-transform duration-300 group-hover:scale-110">
                  <step.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-8 flex-grow">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
