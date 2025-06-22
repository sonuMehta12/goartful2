import Image from "next/image";
import Link from "next/link";
import { LinkedinIcon } from "lucide-react"; // Using LinkedinIcon consistently
import { cn } from "@/lib/utils";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
  linkedinUrl: string;
}

// Define your team data here or import it
const leadershipTeamData: TeamMember[] = [
  {
    id: "sonu-kumar", // Make IDs unique and slug-like
    name: "Sonu Kumar",
    title: "Founder (Product and Innovation)",
    imageUrl: "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1748784485/sonu_kumar_photo_ofj8tm.jpg", // Ensure this path is correct relative to /public
    linkedinUrl: "https://www.linkedin.com/in/sonu-kumar-aa4085290/", // Your actual LinkedIn
  },
  {
    id: "vivek-kustwar",
    name: "Vivek Kustwar", // Example
    title: "Co-founder & CTO",
    imageUrl: "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1750598189/WhatsApp_Image_2025-06-22_at_18.26.51_ce0adb7f_g5oqbr.jpg",
    linkedinUrl: "https://linkedin.com/in/vivek-kustwar",
  },
  {
    id: "varun-k-r",
    name: "Varun Rajshekar", // Example
    title: "Co-founder (Product Manager & Advisor )",
    imageUrl: "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1750598189/WhatsApp_Image_2025-06-22_at_00.42.45_7e5618ab_cxy1rh.jpg",
    linkedinUrl: "https://www.linkedin.com/in/varunkr21",
  },
];


interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-4 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:shadow-xl">
        <Image
          src={member.imageUrl}
          alt={`Photo of ${member.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 144px, (max-width: 768px) 160px, 192px"
        />
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-0.5">{member.name}</h3>
      <p className="text-sm text-primary mb-2">{member.title}</p>
      <Link
        href={member.linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`LinkedIn profile of ${member.name}`}
        className="text-muted-foreground hover:text-primary transition-colors"
      >
        <LinkedinIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      </Link>
    </div>
  );
};


const FounderSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
            The Heart Behind GoArtful {/* Changed from GoVibeful to GoArtful consistently */}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-snug tracking-tight">
            Meet Our Founding Team
          </h2>
           <p className="mt-3 text-md text-muted-foreground">
            Passionate individuals dedicated to empowering artists and enriching lives through art.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 max-w-5xl mx-auto">
          {leadershipTeamData.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FounderSection;