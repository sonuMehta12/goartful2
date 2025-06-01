"use client";

import { useState } from "react";
import Image from "next/image"; // Added missing Image import
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Paintbrush,
  Music,
  Scissors,
  Hammer,
  Camera,
  Drama,
  BookOpen,
  ChefHat,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ArtForm {
  icon: React.ElementType;
  title: string;
  description: string;
  bgColorClass?: string;
  iconColorClass?: string;
  imgSrc?: {
    src: string;
    alt: string;
  };
}

const allArtForms: ArtForm[] = [
  {
    icon: Paintbrush,
    title: "Painting & Drawing",
    description:
      "Host oil, acrylic, watercolor, or digital workshops. Share techniques and inspire.",
    imgSrc: {
      src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      alt: "Painting & Drawing Workshop",
    },
  },
  {
    icon: Hammer,
    title: "Sculpture & Pottery",
    description:
      "Share the joy of shaping clay, wood, or metal in hands-on 3D art forms.",
    imgSrc: {
      src: "https://images.unsplash.com/photo-1558865869-17fa03072c92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      alt: "Sculpture & Pottery Workshop",
    },
  },
  {
    icon: Scissors,
    title: "Fiber Arts & Crafts",
    description:
      "From knitting to macrame, connect through the tactile world of fiber art and crafts.",
    imgSrc: {
      src: "https://images.unsplash.com/photo-1604665350291-1a719037a640?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      alt: "Fiber Arts Workshop",
    },
  },
  {
    icon: Music,
    title: "Music & Sound",
    description:
      "Create intimate concerts, interactive music workshops, or sound healing sessions.",
    imgSrc: {
      src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      alt: "Music Workshop",
    },
  },
  {
    icon: Camera,
    title: "Photography & Digital Media",
    description:
      "Teach photography, videography, digital illustration, or graphic design skills.",
    imgSrc: {
      src: "https://images.unsplash.com/photo-1495745520369-5f01c05a0a09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      alt: "Photography Workshop",
    },
  },
  {
    icon: Drama,
    title: "Performing Arts",
    description:
      "Host acting workshops, improv sessions, storytelling circles, or dance classes.",
    imgSrc: {
      src: "https://images.unsplash.com/photo-1503095396549-405faf685952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      alt: "Performing Arts Workshop",
    },
  },
  {
    icon: ChefHat,
    title: "Culinary Arts",
    description:
      "Share your passion for food through cooking classes, baking workshops, or unique gastronomic experiences.",
    imgSrc: {
      src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      alt: "Culinary Arts Workshop",
    },
  },
  {
    icon: BookOpen,
    title: "Literary Arts & Writing",
    description:
      "Host creative writing workshops, poetry slams, book clubs, or calligraphy sessions.",
    imgSrc: {
      src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      alt: "Literary Arts Workshop",
    },
  },
];

const INITIAL_VISIBLE_FORMS = 6;

const ArtFormsSection = () => {
  const [visibleFormsCount, setVisibleFormsCount] = useState(
    INITIAL_VISIBLE_FORMS
  );
  const showMoreArtForms = () => setVisibleFormsCount(allArtForms.length);
  const showLessArtForms = () => setVisibleFormsCount(INITIAL_VISIBLE_FORMS);
  const visibleArtForms = allArtForms.slice(0, visibleFormsCount);

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {visibleArtForms.map((form) => (
            <Card
              key={form.title}
              className="overflow-hidden transition-all duration-300 hover:shadow-2xl group bg-card border flex flex-col"
            >
              <div
                className={cn(
                  "relative h-48 sm:h-56 flex items-center justify-center overflow-hidden",
                  form.bgColorClass || "bg-muted/30"
                )}
              >
                {form.imgSrc && (
                  <Image
                    src={form.imgSrc.src}
                    alt={form.imgSrc.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-70 group-hover:opacity-100"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <form.icon
                  className={cn(
                    "absolute w-10 h-10 z-10 transition-transform duration-300 group-hover:scale-110 group-hover:text-white",
                    form.iconColorClass || "text-primary/70",
                    form.imgSrc && "text-white/80"
                  )}
                />
              </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {form.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                  {form.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {allArtForms.length > INITIAL_VISIBLE_FORMS && (
          <div className="text-center">
            <Button
              variant={
                visibleFormsCount < allArtForms.length ? "default" : "outline"
              }
              size="lg"
              onClick={
                visibleFormsCount < allArtForms.length
                  ? showMoreArtForms
                  : showLessArtForms
              }
              className="font-semibold min-w-[200px]"
            >
              {visibleFormsCount < allArtForms.length
                ? `Explore All ${allArtForms.length} Forms`
                : "Show Fewer Art Forms"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArtFormsSection;
