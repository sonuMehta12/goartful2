import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-video lg:aspect-[4/3.5] rounded-xl overflow-hidden shadow-xl group order-last lg:order-first">
            <Image
              src="https://images.unsplash.com/photo-1518825865580-3UniqueCreativeStudioSpace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="Diverse group of people engaging in a creative art workshop in a vibrant cafe"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm">
              Art is all about experience. We make it accessible.
            </div>
          </div>
          <div className="order-first lg:order-last">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-snug tracking-tight">
              Share Your Art, Not Just Your Studio.{" "}
              <br className="hidden sm:block" /> Use Any Space.
            </h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              At GoArtful, we believe art is all about the experience.
              That&apos;s why we empower you to host creative workshops and
              sessions in everyday spaces—your home, local cafés, community
              parks, or collaborating studios.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Forget studio rent or hefty equipment investments upfront. Focus
              on sharing your unique talent and connecting with an audience
              eager to learn and create with you. We&apos;re starting with art
              experiences, but envision a future with a world-class marketplace
              and skill-up platform, helping you reach global audiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutSection;
