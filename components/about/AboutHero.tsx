import Image from "next/image";

// It's good practice to have an icon component or use a library like lucide-react.
// For simplicity, here's a quality, self-contained SVG icon.
const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const AboutHero = () => {
  return (
    // The main section container. We use h-[90vh] to make it take up most of the
    // viewport height, creating an immersive feel without covering the entire screen.
    // 'relative' is crucial for positioning child elements.
    <section className="relative flex items-center justify-center h-[90vh] min-h-[600px] text-white">
      {/* Background Image & Overlay */}
      {/* The Image component is in a separate div to sit in the background (z-0). */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/imgs/About-hero.png" // Ensure this image is high-resolution
          alt="Close-up of an Indian artist's hands carefully working on a traditional art piece"
          fill
          className="object-cover" // object-cover ensures the image covers the area without distortion
          priority // 'priority' is key for LCP (Largest Contentful Paint) on hero images
        />
        {/* The overlay is critical for text readability.
            A darker gradient from the bottom provides a solid base for the text. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Content Container */}
      {/* This container sits on top of the image/overlay (z-10) and centers the content. */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tighter mb-4">
          For the Hands That Create,
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-orange-500">
            For the Hearts That Connect.
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-200/90 max-w-2xl mx-auto leading-relaxed">
          We empower India&apos;s artisans to share their soul and sustain their
          craft.
        </p>

        {/* The 'Explore More' button is an anchor link.
            It will smoothly scroll the user to the section with id="our-story".
            Remember to add id="our-story" to the next section of your page. */}
        <a
          href="#our-story"
          className="mt-12 flex flex-col items-center gap-2 group text-slate-300 hover:text-white transition-colors duration-300"
          aria-label="Scroll down to learn more about our story"
        >
          <span className="uppercase text-sm font-semibold tracking-widest">
            Explore Our Story
          </span>
          {/* A subtle bouncing animation on the icon draws the eye. */}
          <ChevronDownIcon className="w-7 h-7 animate-bounce group-hover:animate-none" />
        </a>
      </div>
    </section>
  );
};

export default AboutHero;

// In the next section of your page, remember to add the ID for the scroll link to work:
// e.g., <section id="our-story">...</section>
