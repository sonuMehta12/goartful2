import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Edit3,
  CalendarPlus,
  Sparkles,
  TrendingUp,
  PackageCheck,
  Users,
} from "lucide-react"; // Icons for steps & benefits
import Link from "next/link";
import { cn } from "@/lib/utils";

interface StepDetailProps {
  icon: React.ElementType;
  title: string;
  description: string;
  points?: string[]; // Optional bullet points for emphasis
  imgSrc: string;
  imgAlt: string;
  reverseOrder?: boolean;
  imgOverlayText?: string;
}

const StepDetail: React.FC<StepDetailProps> = ({
  icon: Icon,
  title,
  description,
  points,
  imgSrc,
  imgAlt,
  reverseOrder = false,
  imgOverlayText,
}) => (
  <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center py-8 md:py-12">
    <div
      className={cn(
        "relative aspect-video sm:aspect-[16/10] rounded-xl overflow-hidden shadow-2xl group",
        reverseOrder ? "md:order-last" : ""
      )}
    >
      <Image
        src={imgSrc}
        alt={imgAlt}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        sizes="(min-width: 1280px) 550px, (min-width: 768px) 50vw, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70 group-hover:opacity-100"></div>
      {imgOverlayText && (
        <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs sm:text-sm px-3 py-1.5 rounded-md backdrop-blur-sm">
          {imgOverlayText}
        </div>
      )}
    </div>
    <div
      className={cn(
        "space-y-3 md:space-y-4",
        reverseOrder ? "md:order-first" : ""
      )}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          <Icon className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
          {title}
        </h3>
      </div>
      <p className="text-md md:text-lg text-muted-foreground leading-relaxed">
        {description}
      </p>
      {points && points.length > 0 && (
        <ul className="space-y-2 mt-4">
          {points.map((point, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2.5 mt-0.5 shrink-0" />
              <span className="text-sm text-muted-foreground">{point}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

const HowItWorksForArtistsSection = () => {
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
              It’s never been easier to connect with art lovers and build your
              creative legacy.
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
          <Sparkles className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 text-amber-500 bg-background p-2 rounded-full border border-border" />
        </div>

        {/* Step-by-Step Breakdown */}
        <div className="text-center mb-12 lg:mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 tracking-tight">
            How It Works: Your Simple Path to Hosting
          </h3>
        </div>

        <div className="space-y-12 md:space-y-20">
          <StepDetail
            icon={Edit3}
            title="1. Craft Your Artist Showcase"
            description="Begin by creating your unique GoArtful artist profile. This is where your story unfolds – share your artistic journey, highlight your signature style, and upload captivating images of your work. Clearly define the kinds of inspiring experiences you envision offering."
            points={[
              "Easy, guided profile setup.",
              "Showcase your portfolio & past work.",
              "Clearly communicate your artistic identity.",
            ]}
            imgSrc="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=70"
            imgAlt="Artist working on their profile on a laptop, surrounded by art supplies."
            imgOverlayText="Your Story, Your Art"
          />

          <StepDetail
            icon={CalendarPlus}
            title="2. Design & Launch Your Experience (Logistics Made Easy!)"
            description="Transform your ideas into bookable events. Detail your workshop or session, set your preferred dates, times, and pricing. Choose flexible venues – your home studio, local cafés, parks, or online. And the best part of GoArtful? We'll assist with arranging supplies and key logistics, letting you focus on the creative aspects!"
            points={[
              "Flexible scheduling and venue options.",
              "Transparent pricing you control.",
              "Launch Phase: GoArtful assists with supplies & logistics!",
              "Clearly list what's included for participants.",
            ]}
            imgSrc="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=70" // Example: artist sketching out plans
            imgAlt="Artist planning an event, with calendar and art supplies visible."
            reverseOrder={true}
            imgOverlayText="Your Experience, Your Way"
          />

          <StepDetail
            icon={Users} // Changed icon to better reflect "Connect, Transform, Empower"
            title="3. Connect, Transform & Empower"
            description="This is where your art creates magic. Welcome participants, share your invaluable skills, and guide them on a transformative creative journey. GoArtful helps you get discovered by local art lovers. Foster genuine connections, empower others through your passion, and build a thriving community around your art while earning sustainably. Your art has the power to touch lives – let's amplify it together."
            points={[
              "Inspire and guide participants.",
              "Build meaningful community connections.",
              "Receive bookings (via direct WhatsApp for now).",
              "Grow your artistic reputation and income.",
            ]}
            imgSrc="https://images.unsplash.com/photo-1558509027-9c492a587180?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=70" // Example: joyful interaction during a workshop
            imgAlt="Artist interacting with enthusiastic participants during a creative session."
            imgOverlayText="Share Your Gift"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksForArtistsSection;
