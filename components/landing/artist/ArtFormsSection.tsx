// src/components/ArtFormsCarousel.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Interface for ArtForm
interface ArtForm {
  title: string;
  description: string;
  imgSrc: {
    src: string;
    alt: string;
  };
}

// Data for the carousel slides
const allArtForms: ArtForm[] = [
  {
    title: "Painting & Drawing",
    description:
      "Host oil, acrylic, watercolor, or digital workshops. Share techniques and inspire.",
    imgSrc: {
      src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      alt: "Painting & Drawing Workshop",
    },
  },
  {
    title: "Sculpture & Pottery",
    description:
      "Share the joy of shaping clay, wood, or metal in hands-on 3D art forms.",
    imgSrc: {
      src: "https://images.unsplash.com/photo-1558865869-17fa03072c92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      alt: "Sculpture & Pottery Workshop",
    },
  },
  {
    title: "Fiber Arts & Crafts",
    description:
      "From knitting to macrame, connect through the tactile world of fiber art and crafts.",
    imgSrc: {
      src: "https://images.unsplash.com/photo-1604665350291-1a719037a640?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      alt: "Fiber Arts Workshop",
    },
  },
  {
    title: "Music & Sound",
    description:
      "Create intimate concerts, interactive music workshops, or sound healing sessions.",
    imgSrc: {
      src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      alt: "Music Workshop",
    },
  },
  {
    title: "Photography & Digital Media",
    description:
      "Teach photography, videography, digital illustration, or graphic design skills.",
    imgSrc: {
      src: "https://images.unsplash.com/photo-1495745520369-5f01c05a0a09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      alt: "Photography Workshop",
    },
  },
  {
    title: "Performing Arts",
    description:
      "Host acting workshops, improv sessions, storytelling circles, or dance classes.",
    imgSrc: {
      src: "https://images.unsplash.com/photo-1503095396549-405faf685952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      alt: "Performing Arts Workshop",
    },
  },
  {
    title: "Culinary Arts",
    description:
      "Share your passion for food through cooking classes, baking workshops, or unique gastronomic experiences.",
    imgSrc: {
      src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      alt: "Culinary Arts Workshop",
    },
  },
  {
    title: "Literary Arts & Writing",
    description:
      "Host creative writing workshops, poetry slams, book clubs, or calligraphy sessions.",
    imgSrc: {
      src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      alt: "Literary Arts Workshop",
    },
  },
];

// Helper component for the dots
const DotButton = ({
  selected,
  onClick,
}: {
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    className={cn(
      "h-2 w-2 rounded-full ring-2 ring-offset-2 ring-offset-background ring-transparent transition-all duration-300",
      selected ? "w-4 bg-primary" : "bg-primary/20"
    )}
    type="button"
    onClick={onClick}
  />
);

const ArtFormsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [Autoplay({ delay: 2000, stopOnInteraction: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onReInit = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setScrollSnaps(emblaApi.scrollSnapList());
    };
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onReInit);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onReInit);
    };
  }, [emblaApi]);

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Host Any Creative Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            GoArtful celebrates all forms of creativity. Whether you&apos;re a
            painter, musician, craftsman, or performer, find your space to share
            and inspire.
          </p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {allArtForms.map((form, index) => (
              //  ↓↓↓  THE ONLY CHANGE IS ON THIS LINE  ↓↓↓
              <div
                className="flex-[0_0_45%] sm:flex-[0_0_33.33%] md:flex-[0_0_25%] lg:flex-[0_0_20%] pl-4"
                key={index}
              >
                {/* ↑↑↑  THE ONLY CHANGE IS ON THIS LINE  ↑↑↑ */}
                <Card className="overflow-hidden rounded-2xl relative aspect-[4/5] group border-none">
                  <Image
                    src={form.imgSrc.src}
                    alt={form.imgSrc.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center"></div>

                  <h3 className="absolute bottom-5 left-5 text-xl font-bold text-white">
                    {form.title}
                  </h3>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 mt-8">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtFormsCarousel;
