import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LinkedinIcon, Send } from "lucide-react"; //  Send is for a general "Connect"

interface FounderSectionProps {
  founderName: string;
  founderLinkedin: string; // URL for LinkedIn
  // Add founderTitle, founderBio, founderImageUrl as props if they become dynamic
}

const FounderSection = ({
  founderName,
  founderLinkedin,
}: FounderSectionProps) => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[3/4] max-w-sm mx-auto lg:max-w-none rounded-xl overflow-hidden shadow-2xl group">
              <Image
                // Replace with your actual photo, ideally one that's professional yet approachable
                src="/imgs/Sonu-Kumar-min.png"
                alt={`Photo of ${founderName}, Founder of GoVibeful`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
          <div className="lg:col-span-7 xl:col-span-8 text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
              The Heart Behind GoVibeful
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-snug tracking-tight">
              Meet Our Founder, {founderName}
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                My roots are in Bihar, though I grew up amidst the bustling
                energy of Delhi, carrying a blend of engineering precision and a
                heart for human connection. My path has been a fusion of tech
                and art – from building as a React engineer to diving into
                marketing for artists, understanding their unique challenges and
                aspirations firsthand.
              </p>
              <p>
                In late 2024, I realized my true calling wasn&apos;t just
                supporting others&apos; visions, but building a platform that
                could empower an entire creative community. GoVibeful is that
                vision realized – a commitment to every artist I&apos;ve met,
                and a testament to the incredible, transformative potential I
                see in the Indian art scene. This isn&apos;t just a company;
                it&apos;s my &apos;friend&apos; on the journey to making a
                meaningful impact.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                asChild
                size="lg"
                className="font-medium group w-full sm:w-auto"
              >
                <Link
                  href={founderLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Connect on LinkedIn
                  <LinkedinIcon className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              {/* Optional: Other contact/connect buttons */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FounderSection;
