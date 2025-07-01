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
  stickyOffset = "top-[80px]",
  zIndex = 10,
}) => (
  <div
    className={`rounded-2xl p-6 md:p-8 lg:p-12 ${backgroundColor} relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 sticky ${stickyOffset}`}
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
      title: "1. Apply as an Artist",
      description:
        "Apply for free and become part of India's creative movement.",
      ctaText: "Apply Now",
      ctaLink:
        "https://docs.google.com/forms/d/e/1FAIpQLSekZS7qzDURw4S7hsRjj_daKliqW3HevX9jZ_T82FvZzeq5JQ/viewform?usp=header",
      imgSrc:
        "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1750495123/Group_53_ei18jm.png",
      imgAlt: "Artist registration form on GoVibeful",
      backgroundColor: "bg-blue-500",
      textColor: "text-white",
    },
    {
      icon: Calendar,
      title: "2. Create Your Experience",
      description:
        "Design the workshop, add theme, price, date, time & location of the workshop or Let us help you to design.",
      ctaText: "Start Creating",
      ctaLink:
        "https://docs.google.com/forms/d/e/1FAIpQLSekZS7qzDURw4S7hsRjj_daKliqW3HevX9jZ_T82FvZzeq5JQ/viewform?usp=header",
      imgSrc:
        "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1750057529/Group_50_kcsh1y.png",
      imgAlt: "Creating a workshop event on GoVibeful",
      backgroundColor: "bg-yellow-400",
      textColor: "text-black",
    },
    {
      icon: Zap,
      title: "3. Go Live & Earn",
      description: "Launch your event and get paid for your passion.",
      ctaText: "See Live Events",
      ctaLink: "/",
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
        {/* --- Modern Video Player --- */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 lg:mb-28">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group cursor-pointer transition-all duration-300 hover:shadow-primary/30 hover:scale-[1.02] bg-black">
            {/* Cloudinary Player */}
            <iframe
              src="https://res.cloudinary.com/dv9mzq2bv/video/upload/v1751351674/final_video_-_Made_with_Clipchamp_1_qdjfxc.mp4"
              width="640"
              height="360"
              className="height: auto; width: 100%; aspect-ratio: 640 / 360; w-full h-full object-cover"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
            ></iframe>
            {/* <video
              className="w-full h-full object-cover"
              controls
              poster="https://i.pinimg.com/736x/19/db/31/19db31732931019b73bedcf17924f814.jpg"
            >
              <source
                src="https://res.cloudinary.com/dv9mzq2bv/video/upload/v1751085477/Go_Vibeful_Video_1_v6ujfg.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video> */}
          </div>
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
              Share Your Art. Build Your Business.
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto lg:mx-0 space-y-2">
              Anyone can host an artful experience with us, no prior experience
              needed. Free to join & easy to start with full Support
            </p>
            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="font-bold text-lg px-8 py-7 group transition-all duration-300 ease-in-out hover:shadow-lg w-full sm:w-auto"
              >
                <Link href="https://docs.google.com/forms/d/e/1FAIpQLSekZS7qzDURw4S7hsRjj_daKliqW3HevX9jZ_T82FvZzeq5JQ/viewform?usp=header">
                  Become a GoVibeful Artist
                  <TrendingUp className="w-5 h-5 ml-2.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* --- Section Header --- */}
        <div className="text-center mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Start Hosting Workshops in just 3 Simple Steps
          </h3>
          {/* <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Just three steps to start earning from your art.
          </p> */}
        </div>

        {/* --- Step Cards Section (Grouped & Spaced) --- */}
        <div className="relative space-y-8 max-w-6xl mx-auto min-h-[150vh] bg-white/90 dark:bg-background/80 rounded-2xl shadow-xl  border border-primary/10 mt-[80px]">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              {...step}
              stickyOffset={
                index === 0
                  ? "top-[80px]"
                  : index === 1
                  ? "top-[100px]"
                  : "top-[120px]"
              }
              zIndex={10 + index}
            />
          ))}
        </div>

        {/* --- Final CTA Section --- */}
        <div className="text-center mt-20 lg:mt-28">
          <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Be One of the First 25 Founding Artists
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
              This is your chance to be one of the Founding Artists on
              GoVibeFul, we only accepting few due to limited budgest and team
              size, don&apos;t miss out.
            </p>
            <Button
              asChild
              size="lg"
              className="font-semibold text-lg px-10 py-6 group transition-all duration-300 ease-in-out hover:shadow-lg"
            >
              <Link href="https://docs.google.com/forms/d/e/1FAIpQLSekZS7qzDURw4S7hsRjj_daKliqW3HevX9jZ_T82FvZzeq5JQ/viewform?usp=header">
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
