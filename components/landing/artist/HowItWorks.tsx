import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Play,
  ArrowRight,
  Users,
  Calendar,
  Zap,
} from "lucide-react";
import Link from "next/link";

// --- PRO-TIP: Keep interfaces close to where they are used or in a dedicated types file ---
interface StepCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  imgSrc: string;
  imgAlt: string;
  backgroundColor: string;
  textColor: string;
  stickyOffset?: string;
  zIndex?: number; // Changed to number for better control
}

// --- DESIGN PRINCIPLE: Componentization & Readability ---
const StepCard: React.FC<StepCardProps> = ({
  icon: Icon,
  title,
  description,
  ctaText,
  ctaLink,
  imgSrc,
  imgAlt,
  backgroundColor,
  textColor,
  stickyOffset = "top-0",
  zIndex = 10,
}) => (
  <div
    className={`rounded-3xl p-6 md:p-8 lg:p-12 ${backgroundColor} relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 sticky ${stickyOffset}`}
    style={{ zIndex }} // Using inline style for dynamic z-index
  >
    <div className={`flex flex-col md:flex-row items-center gap-8 lg:gap-16`}>
      {/* --- REFINED: Text Content --- */}
      <div className="flex-1 z-10 text-center md:text-left">
        <div
          className={`flex items-center gap-4 mb-4 justify-center md:justify-start`}
        >
          <div
            className={`w-12 h-12 rounded-full ${
              textColor === "text-white" ? "bg-white/20" : "bg-black/10"
            } flex items-center justify-center shrink-0`}
          >
            <Icon className={`w-6 h-6 ${textColor}`} />
          </div>
          <h3
            className={`text-2xl lg:text-3xl font-bold ${textColor} leading-tight`}
          >
            {title}
          </h3>
        </div>
        <p
          className={`text-base lg:text-lg ${textColor} opacity-80 leading-relaxed mb-6 max-w-md mx-auto md:mx-0`}
        >
          {description}
        </p>

        <Button
          asChild
          variant={textColor === "text-white" ? "secondary" : "default"}
          size="lg"
          className="font-semibold group transition-all duration-300 hover:shadow-md text-sm"
        >
          <Link href={ctaLink}>
            {ctaText}
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      {/* --- FIXED: Image Container --- */}
      <div className="w-full md:w-2/5 lg:w-1/3 flex-shrink-0 z-0 mt-6 md:mt-0">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80vw, 40vw"
            priority={true}
          />
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT: HowItWorksForArtistsSection ---
export const HowItWorksForArtistsSection = () => {
  const steps: Omit<StepCardProps, "isReversed">[] = [
    {
      icon: Users,
      title: "1. Join GoArtful",
      description:
        "Become our creative partner in minutes. Register for free and help us transform India's art scene together.",
      ctaText: "Join for Free",
      ctaLink: "/register-artist",
      imgSrc:
        "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1750059969/Frame_114_jz1cbp.png",
      imgAlt: "Artist registration form on GoArtful",
      backgroundColor: "bg-blue-500",
      textColor: "text-white",
    },
    {
      icon: Calendar,
      title: "2. Create Your Experience",
      description:
        "Choose from 100+ free venues, add your workshop details, and select the support you need from us.",
      ctaText: "Start Creating",
      ctaLink: "/create-event",
      imgSrc:
        "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1750057529/Group_50_kcsh1y.png",
      imgAlt: "Creating a workshop event on GoArtful",
      backgroundColor: "bg-yellow-400",
      textColor: "text-black",
    },
    {
      icon: Zap,
      title: "3. Go Live & Earn",
      description:
        "Launch your event, share it with your network, and let GoArtful's platform connect you with the right audience.",
      ctaText: "See Live Events",
      ctaLink: "/live-events",
      imgSrc:
        "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1750057529/Group_54_dfebrt.png",
      imgAlt: "Sharing a live event on social media",
      backgroundColor: "bg-green-600",
      textColor: "text-white",
    },
  ];

  return (
    <section
      id="how-it-works-artists"
      className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- RE-DESIGNED: Top Section (Video + Intro) --- */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 lg:mb-28">
          {/* --- IMPROVED: Modern Video Player --- */}
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group cursor-pointer transition-all duration-300 hover:shadow-primary/30 hover:scale-[1.02]">
            <Image
              src="https://i.pinimg.com/736x/19/db/31/19db31732931019b73bedcf17924f814.jpg"
              alt="GoArtful explainer video thumbnail - artist guiding a workshop"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full transition-all duration-300 group-hover:bg-primary/80 group-hover:scale-110">
                <Play className="w-10 h-10 text-white" fill="white" />
              </div>
            </div>
          </div>

          {/* --- REFINED: Intro Text & CTA --- */}
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
              Share Your Art. Inspire Others. Build Your Business.
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto lg:mx-0">
              GoArtful gives you the platform, tools, and support to turn your
              passion into a thriving career. Host workshops, connect with art
              lovers, and grow your brand.
            </p>
            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="font-bold text-lg px-8 py-7 group transition-all duration-300 ease-in-out hover:shadow-lg w-full sm:w-auto"
              >
                <Link href="/register-artist">
                  Become a GoArtful Artist
                  <TrendingUp className="w-5 h-5 ml-2.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* --- IMPROVED: Section Header --- */}
        <div className="text-center mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Your Simple Path to Hosting
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We&apos;ve streamlined the process into three easy steps. From setup
            to payday, we&apos;re with you all the way.
          </p>
        </div>

        {/* --- REFINED: Step Cards Section --- */}
        <div className="relative space-y-8 max-w-6xl mx-auto min-h-[150vh]">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              {...step}
              // Fixed: Higher index = higher z-index so later cards stack on top
              stickyOffset={
                index === 0 ? "top-0" : index === 1 ? "top-4" : "top-8"
              }
              zIndex={10 + index} // First card: z-10, Second: z-11, Third: z-12
            />
          ))}
        </div>

        {/* --- IMPROVED: Final CTA Section --- */}
        <div className="text-center mt-20 lg:mt-28">
          <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Start Your Artistic Journey?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
              Join thousands of artists already earning through their passion.
              Your next chapter starts here.
            </p>
            <Button
              asChild
              size="lg"
              className="font-semibold text-lg px-10 py-6 group transition-all duration-300 ease-in-out hover:shadow-lg"
            >
              <Link href="/register-artist">
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksForArtistsSection;
