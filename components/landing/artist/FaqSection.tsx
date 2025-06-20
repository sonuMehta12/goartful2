// components/landing/artist/FaqSection.tsx
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { HelpCircle } from "lucide-react"; // Added icon

interface FaqItem {
  question: string;
  answer: string;
  id: string;
}

const allFaqs: FaqItem[] = [
  {
    id: "faq-1",
    question: " Who can apply?",
    answer:
      " Any artist, dancer, singer, actor, creator, or hobbyist with something to teach!",
  },
  {
    id: "faq-2",
    question: "Is there any fee to join?",
    answer:
      " It’s 100% free to get started. GoArtful has no monthly fees. You'll only pay a small, transparent commission when you make a sale through our platform.",
  },
  {
    id: "faq-3",
    question: "What kind of art experiences can I list?",
    answer:
      "From painting and pottery workshops to music jams, culinary art sessions, photography walks, and digital art classes – if it's a creative experience, you can host it! We support a vast range of disciplines.",
  },
  {
    id: "faq-4",
    question: "Do I need my own studio or venue?",
    answer:
      "No! That's the beauty. Host in your home studio, a local café, a park, community center, or even online. We handle the discovery, you choose your space.",
  },
  {
    id: "faq-5",
    question: " Do I need a large following?",
    answer: " No. If you're passionate and skilled, we’ll help you grow",
  },
];

const INITIAL_VISIBLE_FAQS = 5;

const FaqSection = () => {
  const [visibleFaqsCount, setVisibleFaqsCount] =
    useState(INITIAL_VISIBLE_FAQS);
  const loadMoreFaqs = () => setVisibleFaqsCount(allFaqs.length);
  const visibleFaqs = allFaqs.slice(0, visibleFaqsCount);

  return (
    <section className="py-16 lg:py-24 bg-secondary/20 dark:bg-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <HelpCircle className="w-10 h-10 text-primary mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 tracking-tight">
            Your Questions, Answered
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Everything you need to know about starting your GoArtful journey.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto space-y-3 sm:space-y-4"
        >
          {visibleFaqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="px-6 py-4 text-left font-semibold text-foreground hover:no-underline text-md">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 pt-0 text-muted-foreground text-sm leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {allFaqs.length > INITIAL_VISIBLE_FAQS &&
          visibleFaqsCount < allFaqs.length && (
            <div className="text-center mt-10">
              <Button
                variant="outline"
                size="lg"
                onClick={loadMoreFaqs}
                className="font-semibold min-w-[180px]"
              >
                Show More Answers
              </Button>
            </div>
          )}
      </div>
    </section>
  );
};
export default FaqSection;
