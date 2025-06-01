import Image from "next/image";
import { Sparkles } from "lucide-react";

const OurStorySection = () => {
  return (
    <section className="py-16 lg:py-24 bg-secondary/10 dark:bg-muted/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="lg:order-last">
            <div className="mb-4 inline-flex items-center justify-center px-4 py-1.5 text-sm font-semibold text-primary bg-primary/10 rounded-full">
              <Sparkles className="w-4 h-4 mr-2" />
              Our Origin
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-snug tracking-tight">
              From a Shared Struggle, a Spark of Inspiration.
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                My own path into the art world was a fortunate detour. While
                exploring another venture, a simple suggestion to sell
                AI-generated art led me not to sales, but to something far
                richer: conversations with real artists.
              </p>
              <p>
                Listening to their stories, their passion for their craft, and
                the challenges they faced in reaching an audience ignited a new
                idea. It became clear that art&apos;s true power wasn&apos;t
                just in the object, but in the{" "}
                <strong className="text-foreground font-medium">
                  experience of its creation and sharing
                </strong>
                .
              </p>
              <p>
                That&apos;s how GoArtful was conceived – not just as a
                marketplace, but as a bridge connecting artists directly with
                those who yearn to{" "}
                <strong className="text-foreground font-medium">
                  feel, learn, and live art.
                </strong>
              </p>
            </div>
          </div>
          <div className="relative aspect-video lg:aspect-[4/3.5] rounded-xl overflow-hidden shadow-xl group">
            <Image
              src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="Founder sketching ideas or a lightbulb moment over a coffee with art background"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default OurStorySection;
