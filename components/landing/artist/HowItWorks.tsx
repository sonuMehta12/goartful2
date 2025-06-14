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

interface StepCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  mobileImgSrc: string;
  tabletImgSrc: string;
  imgAlt: string;
  backgroundColor: string;
  textColor: string;
}

const StepCard: React.FC<StepCardProps> = ({
  icon: Icon,
  title,
  description,
  ctaText,
  ctaLink,
  mobileImgSrc,
  tabletImgSrc,
  imgAlt,
  backgroundColor,
  textColor,
}) => (
  <div
    className={`rounded-3xl p-6 md:p-8 ${backgroundColor} relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300`}
    style={{ minHeight: "320px" }}
  >
    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 h-full">
      {/* Text Content */}
      <div className="flex-1 z-10 relative">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-10 h-10 rounded-full ${
              textColor === "text-white" ? "bg-white/20" : "bg-black/10"
            } flex items-center justify-center`}
          >
            <Icon className={`w-5 h-5 ${textColor}`} />
          </div>
          <h3
            className={`text-xl md:text-2xl font-bold ${textColor} leading-tight`}
          >
            {title}
          </h3>
        </div>
        <p
          className={`text-sm md:text-base ${textColor} opacity-90 leading-relaxed mb-6`}
        >
          {description}
        </p>

        {/* CTA Button */}
        <Button
          asChild
          variant={textColor === "text-white" ? "secondary" : "default"}
          size="sm"
          className="font-semibold group transition-all duration-300 hover:shadow-md"
        >
          <Link href={ctaLink}>
            {ctaText}
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      {/* Image Container */}
      <div className="relative w-full md:w-48 lg:w-56 h-32 md:h-40 flex-shrink-0">
        {/* Mobile Image */}
        <div className="block md:hidden relative w-full h-full rounded-2xl overflow-hidden shadow-md">
          <Image
            src={mobileImgSrc}
            alt={imgAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 0px"
          />
        </div>

        {/* Tablet/Desktop Image */}
        <div className="hidden md:block relative w-full h-full rounded-2xl overflow-hidden shadow-md">
          <Image
            src={tabletImgSrc}
            alt={imgAlt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 300px, 0px"
          />
        </div>
      </div>
    </div>
  </div>
);

const HowItWorksForArtistsSection = () => {
  const steps = [
    {
      icon: Users,
      title: "Join GoArtful",
      description:
        "Become our creative partner in 2 minutes. Register free and help transform India's art scene together.",
      ctaText: "Join for Free",
      ctaLink: "/register-artist",
      mobileImgSrc:
        "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      tabletImgSrc:
        "https://images.unsplash.com/photo-1517673139395-f07ee914f697?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      imgAlt: "Artist joining GoArtful community",
      backgroundColor: "bg-yellow-400",
      textColor: "text-black",
    },
    {
      icon: Calendar,
      title: "Create Your Experience",
      description:
        "Choose from 100+ free venues, add your workshop details, and select the support you need from us.",
      ctaText: "Create Event",
      ctaLink: "/create-event",
      mobileImgSrc:
        "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      tabletImgSrc:
        "https://images.unsplash.com/photo-1586953135293-37fe6da73de6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      imgAlt: "Artist creating workshop experience",
      backgroundColor: "bg-blue-500",
      textColor: "text-white",
    },
    {
      icon: Zap,
      title: "Go Live & Earn",
      description:
        "Go live, share with friends and your network, and let GoArtful help you connect with the right people.",
      ctaText: "See Live Events",
      ctaLink: "/live-events",
      mobileImgSrc:
        "https://images.unsplash.com/photo-1558509027-9c492a587180?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      tabletImgSrc:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      imgAlt: "Artists connecting and earning through live events",
      backgroundColor: "bg-green-600",
      textColor: "text-white",
    },
  ];

  return (
    <section id="how-it-works-artists" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Video + Intro Text + CTA */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 lg:mb-24">
          {/* Video Player Placeholder (Left) */}
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl group cursor-pointer hover:shadow-primary/20 transition-shadow duration-300">
            {/* Replace with your actual video embed or a clickable thumbnail that opens a video modal */}
            <Image
              src="https://images.unsplash.com/photo-1517673139395-f07ee914f697?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" // Compelling thumbnail for video
              alt="GoArtful explainer video thumbnail - artist guiding a workshop"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
              <svg
                className="w-16 h-16 sm:w-20 sm:h-20 text-white group-hover:text-primary transition-colors"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {/* If using an actual video embed:
             <iframe width="100%" height="100%" src="YOUR_EXPLAINER_VIDEO_URL" title="GoArtful Explainer for Artists" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
             */}
          </div>

          {/* Introductory Text & CTA (Right) */}
          <div className="space-y-5">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-snug">
              Share Your Art, Inspire Others, and Earn: How GoArtful Empowers
              You
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At GoArtful, we believe your art has the power to connect,
              inspire, and transform. Instead of just selling a piece, we
              empower artists to host unique, experience-driven events in
              everyday local spaces – from charming cafés to restaurants to
              vibrant parks.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Focus on sharing your gift;{" "}
              <strong className="text-primary">
                the rest we will take care from logistics to marketing,
              </strong>{" "}
              It&apos;s never been easier to connect with art lovers and build
              your creative legacy.
            </p>
            <div className="pt-3">
              <Button
                asChild
                size="lg"
                className="font-semibold text-md px-8 py-6 group transition-all duration-300 ease-in-out hover:shadow-lg w-full sm:w-auto"
              >
                <Link href="/register-artist">
                  Start Your Artist Profile Now
                  <TrendingUp className="w-5 h-5 ml-2.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Horizontal Separator */}
        <div className="relative text-center my-12 lg:my-16">
          <hr className="border-border/60" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 bg-amber-500 rounded-full flex items-center justify-center border border-border">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>

        {/* Step-by-Step Title */}
        <div className="text-center mb-12 lg:mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 tracking-tight">
            How It Works: Your Simple Path to Hosting
          </h3>
        </div>
        <div className="space-y-6 md:space-y-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              ctaText={step.ctaText}
              ctaLink={step.ctaLink}
              mobileImgSrc={step.mobileImgSrc}
              tabletImgSrc={step.tabletImgSrc}
              imgAlt={step.imgAlt}
              backgroundColor={step.backgroundColor}
              textColor={step.textColor}
            />
          ))}
        </div>

        {/* Final CTA Section */}
        <div className="text-center mt-16 lg:mt-20">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl p-8 md:p-12 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to start your artistic journey?
            </h3>
            <p className="text-muted-foreground mb-6 text-lg">
              Join thousands of artists already earning through their passion
            </p>
            <Button
              asChild
              size="lg"
              className="font-semibold text-lg px-10 py-6 group transition-all duration-300 ease-in-out hover:shadow-lg"
            >
              <Link href="/register-artist">
                Get Started Today
                <TrendingUp className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksForArtistsSection;
