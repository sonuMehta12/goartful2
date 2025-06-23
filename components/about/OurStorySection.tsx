// components/about/OurStorySection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, Target } from "lucide-react";

const storyParagraphs = [
  "It all began in 2022 when I, the founder of Govibeful, was a third-year college student trying to sell my art online. Like so many artists. I set up a shop on Instagram and Etsy, and I am full of hope. Six months later, I had made exactly two sales.",
  "But something unexpected happened during those challenging months. I connected with dozens of other artists. We were all facing the same frustrating reality: little to no sales, zero profit, and the constant stress of competing in a market that didn't seem to value our work.",
  "It seems like our work is getting lost in the noise. We were all sharing marketing tips, but the core problem remained.",
  'The "aha" moment came when I realized the problem wasn\'t our art. The problem was how we were forced to commercialize it, stripping it of its soul and the story behind it. We were missing the most important, the experience of its creation. The world doesn’t just need more art to buy; it needs to experience art.',
  "We have more ways to \"connect\" than ever, but we're often left feeling disconnected from what truly matters: our creativity, our imagination, our true selves. We're caught in a cycle of chasing likes, notifications, and endless scrolling through perfectly curated feeds that might not even be real.",
  "We believe art is the antidote.",
  "This belief is at the heart of our story., That's why we created Govibeful.",
  "Govibeful is not another marketplace. It's a true partner for artists, built on the belief that art's power lies in connection and experience. We’re here to help creators share their passion and their story, and to help everyone bring more meaningful, artful experiences into their everyday lives.",
];

const visionText =
  "To build a world where everyone can experience, create, and connect through art.";
const missionText =
  "Our mission is to bring art experiences to everyone, making them accessible, affordable, and sustainable for both creators and enthusiasts.";

const OurStorySection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    // Section matches the `body` styling for centering and background
    <section className="bg-primary dark:bg-slate-900 flex justify-center items-center min-h-screen p-5">
      {/* Main card container, matches `.origin-section` */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg max-w-3xl md:max-w-5xl w-full overflow-hidden md:flex">
        {/* Left Column: Image, matches `.origin-image` */}
        <div className="md:flex-shrink-0 md:basis-[40%] relative h-64 md:h-auto">
          <Image
            src="https://res.cloudinary.com/dv9mzq2bv/image/upload/v1750690662/Frame_280_tslccf.png" // Using the image from your original HTML
            alt="An artist sketching passionately in a sunlit studio"
            fill
            className="object-cover" // matches `object-fit: cover`
            sizes="(max-width: 767px) 100vw, 40vw"
          />
        </div>

        {/* Right Column: Text Content, matches `.origin-content` */}
        <div className="flex flex-col p-6 md:p-10">
          {/* Badge, matches `.origin-tag` */}
          <span className="inline-block self-start bg-primary/10 text-primary  px-3 py-1 rounded-full text-xs font-medium mb-3">
            Our Story
          </span>

          {/* Headline, matches `h2` */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 leading-tight">
            A Spark of Inspiration and Imagination
          </h2>

          {/* Story Text Container, matches `.story-text` */}
          <div
            className={`
              relative overflow-hidden transition-all duration-700 ease-in-out
              text-gray-600 dark:text-gray-400 text-base space-y-4
              ${isExpanded ? "max-h-[1000px]" : "max-h-[6.5em]"}
              ${
                !isExpanded
                  ? "after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-12 after:bg-gradient-to-t after:from-white dark:after:from-slate-800 after:to-transparent"
                  : ""
              }
            `}
          >
            {/* Render all paragraphs, but container height will hide them */}
            {storyParagraphs.map((text, index) => (
              <p key={index} className={index === 0 ? "mt-0" : ""}>
                {text}
              </p>
            ))}
          </div>

          {/* Button, matches `#toggle-story-btn` */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-primary bg-primary/2 text-white font-medium py-3 px-5 rounded-lg w-full mt-4 transition-colors duration-300"
          >
            {isExpanded ? "Read Less" : "Continue Reading"}
          </button>

          {/* Vision & Mission, matches `.vision-mission-container` */}
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 space-y-5">
            {/* Mission Item */}
            <div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-2">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {missionText}
              </p>
            </div>
            {/* Vision Item */}
            <div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-2">
                Our Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {visionText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
