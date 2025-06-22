// components/about/OurStorySection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, Target } from "lucide-react";

// Combine story parts into an array for easier rendering
const storyParagraphs = [
    "We have more ways to \"connect\" than ever, but we're often left feeling disconnected from what truly matters—our own creativity, our imagination, our true selves. We're caught in a cycle of notifications and endless scrolling, searching for something real. We believe art is the antidote.",
    "This belief is at the heart of our story. It all began in 2022 when I, the founder of Govibeful, was an artist trying to make my way. I spent six months pouring my heart into selling prints online, only to make two sales. The failure was disheartening, but through it, I found something far more valuable: community.",
    "I met countless other artists stuck in the same cycle of creating beautiful work only to see it get lost in the noise. We were all sharing marketing tips, but the core problem remained. We were being pushed to sell our art like a commodity, stripping it of its soul and the story behind it.",
    "I realized then that art's true power wasn't just in the final object, but in the experience of its creation and the act of sharing it. The world doesn’t just need more art to buy; it needs to *experience* art.",
    "Govibeful was born from this conviction. We are building a company that honors the artist and the art. A place that’s not about transactions, but about transformations. We’re here to help artists not just sell, but to share their stories and passion, influencing the world by bringing authentic artful experiences into everyday places."
];

const visionText = "To build a world where everyone can experience, create, and connect through art.";
const missionText = "Our mission is to bring art experiences to everyone, making them accessible, affordable, and sustainable for both creators and enthusiasts.";

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
            src="/image_1e916a.jpg" // Using the image from your original HTML
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
              ${isExpanded ? 'max-h-[1000px]' : 'max-h-[6.5em]'}
              ${!isExpanded ? "after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-12 after:bg-gradient-to-t after:from-white dark:after:from-slate-800 after:to-transparent" : ""}
            `}
          >
            {/* Render all paragraphs, but container height will hide them */}
            {storyParagraphs.map((text, index) => (
                <p key={index} className={index === 0 ? "mt-0" : ""}>{text}</p>
            ))}
          </div>

          {/* Button, matches `#toggle-story-btn` */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-primary bg-primary/2 text-white font-medium py-3 px-5 rounded-lg w-full mt-4 transition-colors duration-300"
          >
            {isExpanded ? 'Read Less' : 'Continue Reading'}
          </button>
          
          {/* Vision & Mission, matches `.vision-mission-container` */}
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 space-y-5">
            {/* Mission Item */}
            <div>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-2">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{missionText}</p>
            </div>
            {/* Vision Item */}
            <div>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-2">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{visionText}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurStorySection;