// components/about/MissionVisionSection.tsx
import Image from "next/image";
import { Target, Eye } from "lucide-react"; // Target for Mission, Eye for Vision

const MissionVisionSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Our North Star
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Guiding our journey to make art an integral part of everyday life in
            India.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Mission */}
          <div className="p-8 bg-card border border-border rounded-xl shadow-lg text-center md:text-left hover:shadow-primary/10 transition-shadow">
            <div className="flex justify-center md:justify-start mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Target className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">
              Our Mission
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              To{" "}
              <strong className="text-foreground">
                ignite the spark of creativity in everyone
              </strong>{" "}
              by making profound art experiences accessible and affordable,
              empowering Indian artists to share their unique gifts and build
              sustainable livelihoods on their own terms.
            </p>
          </div>

          {/* Vision */}
          <div className="p-8 bg-card border border-border rounded-xl shadow-lg text-center md:text-left hover:shadow-primary/10 transition-shadow">
            <div className="flex justify-center md:justify-start mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Eye className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">
              Our Vision
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We dream of an India pulsating with art – where every individual
              can easily{" "}
              <strong className="text-foreground">
                discover, create, and connect
              </strong>{" "}
              through its transformative power, and where our artists are
              celebrated for fueling this vibrant cultural tapestry.
            </p>
            {/* Future Vision Hint */}
            <p className="mt-3 text-xs text-muted-foreground/80 leading-relaxed">
              (And looking ahead, a world-class marketplace & skill-up platform
              to take Indian art global!)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MissionVisionSection;
