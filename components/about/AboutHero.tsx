import Image from "next/image";

const AboutHero = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-b from-muted/30 via-background to-background dark:from-muted/10 dark:via-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tighter mb-6">
              For the Hands That Create,
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-500 dark:to-orange-400">
                For the Hearts That Connect.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-4 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Every stroke, every note, every carefully crafted piece carries a
              fragment of an artist's soul. Yet, for too many talented creators
              across India, this passion often meets unseen walls.
            </p>
            <p className="text-md text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              We saw artists struggling to share their unique vision, to find an
              audience that truly values their craft, and to sustain a
              livelihood doing what they love. For our precious folk arts, this
              challenge echoes even louder, risking the silence of irreplaceable
              legacies.
            </p>
          </div>
          <div className="relative aspect-[4/3] sm:aspect-square lg:aspect-[5/4] rounded-xl overflow-hidden shadow-2xl group mx-auto lg:mx-0 max-w-md lg:max-w-none">
            <Image
              src="https://images.unsplash.com/photo-1508144849972-f8f356ab0f46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=70"
              alt="Close-up of an Indian artist's hands carefully working on a traditional art piece"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutHero;
