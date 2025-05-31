// components/event-detail/EventPoliciesClient.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MessageCircle,
  FileText,
  AlertOctagon,
  ShieldCheck,
  BookOpenText,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import type { FAQItem, PolicyDetails } from "@/lib/types/event";
import type { LucideIcon } from "lucide-react";

interface EventPoliciesClientProps {
  policies?: PolicyDetails | null;
  faqs?: FAQItem[] | null;
}

// Example structured policies from your original code
const staticPoliciesData = [
  {
    key: "cancellation" as keyof PolicyDetails, // Use keyof for type safety
    icon: AlertOctagon,
    iconBgClass: "bg-destructive/10",
    iconFgClass: "text-destructive",
    title: "Cancellation Policy",
    // Details would come from event.policies.cancellation
  },
  {
    key: "refund" as keyof PolicyDetails,
    icon: ShieldCheck,
    iconBgClass: "bg-blue-500/10",
    iconFgClass: "text-blue-600",
    title: "Refund Policy",
    // Details would come from event.policies.refund
  },
  {
    key: "healthSafety" as keyof PolicyDetails, // Added example
    icon: ShieldCheck, // Re-use or choose another
    iconBgClass: "bg-green-500/10",
    iconFgClass: "text-green-600",
    title: "Health & Safety",
  },
];

interface GuidelinesData {
  icon: LucideIcon;
  iconBgClass: string;
  iconFgClass: string;
  title: string;
  intro: string;
  points: string[];
}

const guidelinesData: GuidelinesData = {
  icon: BookOpenText,
  iconBgClass: "bg-green-500/10",
  iconFgClass: "text-green-600",
  title: "Community & Workshop Guidelines",
  intro: "We strive to maintain a respectful, inclusive, and safe environment:",
  points: [
    "Be respectful and supportive.",
    "Follow instructor guidelines and safety protocols.",
    "Help keep the workspace clean.",
    "No disruptive behavior or hate speech.",
    "Respect others' privacy with photos/videos.",
    "Arrive on time.",
    "Report concerns to facilitators.",
  ],
};

export default function EventPoliciesClient({
  policies,
  faqs,
}: EventPoliciesClientProps) {
  // Filter and map static policy structure with dynamic content from event.policies
  const displayPolicies = staticPoliciesData
    .map((policyInfo) => {
      const detailsString = policies?.[policyInfo.key];
      // Split string by newline or common list patterns if it's a single string
      const detailsArray = detailsString
        ?.split(/\n|• | - /)
        .map((s) => s.trim())
        .filter(Boolean);
      return {
        ...policyInfo,
        details:
          detailsArray && detailsArray.length > 0
            ? detailsArray
            : detailsString
            ? [detailsString]
            : [],
      };
    })
    .filter((policy) => policy.details && policy.details.length > 0);

  const hasContent =
    displayPolicies.length > 0 ||
    guidelinesData.points.length > 0 ||
    (faqs && faqs.length > 0);

  if (!hasContent) {
    return null; // Don't render section if no policies, guidelines, or FAQs
  }

  return (
    <section id="information" className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Important Information
          </h2>
          <p className="text-lg text-muted-foreground">
            Policies, guidelines, and answers to common questions.
          </p>
        </div>

        <Tabs
          defaultValue={
            faqs && faqs.length > 0
              ? "faq"
              : displayPolicies.length > 0
              ? "policies"
              : "guidelines"
          }
          className="w-full max-w-4xl mx-auto"
        >
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-8 sm:mb-10">
            {displayPolicies.length > 0 && (
              <TabsTrigger
                value="policies"
                className="gap-2 text-sm sm:text-base"
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Event Policies</span>
              </TabsTrigger>
            )}
            {guidelinesData.points.length > 0 && ( // Assuming guidelines are always present or conditionally shown
              <TabsTrigger
                value="guidelines"
                className="gap-2 text-sm sm:text-base"
              >
                <BookOpenText className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Guidelines</span>
              </TabsTrigger>
            )}
            {faqs && faqs.length > 0 && (
              <TabsTrigger value="faq" className="gap-2 text-sm sm:text-base">
                <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>FAQ</span>
              </TabsTrigger>
            )}
          </TabsList>

          {displayPolicies.length > 0 && (
            <TabsContent value="policies" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {displayPolicies.map((policy) => (
                  <Card key={policy.title} className="border-border shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 ${policy.iconBgClass} rounded-lg flex items-center justify-center flex-shrink-0`}
                        >
                          <policy.icon
                            className={`w-5 h-5 sm:w-6 sm:h-6 ${policy.iconFgClass}`}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-base sm:text-lg text-foreground mb-2">
                            {policy.title}
                          </h3>
                          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-outside pl-5">
                            {policy.details.map((detail, i) => (
                              <li key={i}>{detail}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          )}

          {guidelinesData.points.length > 0 && (
            <TabsContent value="guidelines">
              <Card className="border-border shadow-sm">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-start sm:space-x-6">
                    <div
                      className={`hidden sm:flex w-14 h-14 sm:w-16 sm:h-16 ${guidelinesData.iconBgClass} rounded-xl items-center justify-center flex-shrink-0 mb-4 sm:mb-0`}
                    >
                      <guidelinesData.icon
                        className={`w-7 h-7 sm:w-8 sm:h-8 ${guidelinesData.iconFgClass}`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg sm:text-xl text-foreground mb-3">
                        {guidelinesData.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {guidelinesData.intro}
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-outside pl-5">
                        {guidelinesData.points.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {faqs && faqs.length > 0 && (
            <TabsContent value="faq">
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl text-foreground">
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left text-sm sm:text-base font-medium hover:no-underline py-3 sm:py-4">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-sm pb-3 sm:pb-4 pr-2">
                          {" "}
                          {/* Added pr for scrollbar space */}
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <div className="mt-8 p-4 sm:p-6 bg-muted/30 rounded-lg border border-border text-center">
                    <h4 className="font-semibold text-base sm:text-md text-foreground mb-1.5">
                      Still have questions?
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      We&apos;re here to help!
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href="/contact-support"
                        className="flex items-center space-x-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Ask a Question</span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </section>
  );
}
