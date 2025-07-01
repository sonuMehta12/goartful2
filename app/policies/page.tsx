"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Shield, FileText } from "lucide-react";

interface PolicyItem {
  title: string;
  content: string;
  id: string;
}

const allPolicies: PolicyItem[] = [
  {
    id: "terms-of-service",
    title: "Terms of Service",
    content: `By using GoVibeful, you agree to our terms. Artists must provide accurate information about their experiences and maintain professional conduct. Attendees must respect artists' intellectual property and follow experience guidelines. We reserve the right to suspend accounts for violations. Users must be 18+ or have parental consent. GoVibeful facilitates connections but is not liable for experience outcomes.`,
  },
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    content: `We collect necessary information to provide our services including contact details, payment information, and experience data. We never sell personal data to third parties. Information is used for platform functionality, communication, and improving services. Data is encrypted and stored securely. You can request data deletion at any time. We use cookies for website functionality and analytics.`,
  },
  {
    id: "cancellation-policy",
    title: "Cancellation & Refund Policy",
    content: `Artists can cancel experiences up to 24 hours before start time with full refund to attendees. Attendees can cancel up to 48 hours before for full refund, 24-48 hours for 50% refund. No refunds for cancellations within 24 hours unless artist cancels. Emergency cancellations are reviewed case-by-case. Refunds are processed within 5-7 business days.`,
  },
  {
    id: "payment-policy",
    title: "Payment Policy",
    content: `GoVibeful charges a 8% commission on successful bookings. Artists receive payments within 24 hours after experience completion. All payments are processed securely through Stripe. Attendees pay upfront when booking. Artists set their own pricing. Disputes are handled through our resolution center. Tax responsibilities belong to individual users.`,
  },
  {
    id: "community-guidelines",
    title: "Community Guidelines",
    content: `Be respectful and professional in all interactions. No harassment, discrimination, or inappropriate behavior. Artists must deliver promised experiences safely and as described. Attendees should arrive on time and engage constructively. Report any concerns to our support team. Fake reviews or manipulation are prohibited. Maintain a welcoming environment for all skill levels.`,
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: `Artists retain rights to their original content and teaching methods. By hosting on GoVibeful, artists grant us license to promote their experiences. Attendees cannot record, reproduce, or redistribute experience content without artist consent. Respect all copyrights and trademarks. Report IP violations to our team. Artists are responsible for ensuring they have rights to teach their content.`,
  },
  {
    id: "liability-waiver",
    title: "Liability & Safety",
    content: `Participation in art experiences is at your own risk. GoVibeful is not liable for injuries, damages, or losses during experiences. Artists must ensure safe environments and inform attendees of any risks. Attendees should follow all safety instructions. We recommend appropriate insurance coverage. Emergency contact information should be readily available during experiences.`,
  },
  {
    id: "dispute-resolution",
    title: "Dispute Resolution",
    content: `We encourage direct communication to resolve issues. Contact our support team for mediation assistance. Refund disputes are reviewed based on our cancellation policy. For legal disputes, arbitration is preferred over litigation. California state law governs these terms. We aim to resolve all disputes fairly and promptly through our resolution center.`,
  },
  {
    id: "account-management",
    title: "Account Management",
    content: `Users are responsible for account security and login credentials. Keep profile information current and accurate. Accounts may be suspended for policy violations. We reserve the right to terminate accounts for repeated violations. Account deletion requests are processed within 30 days. Backup important information before account closure.`,
  },
  {
    id: "platform-updates",
    title: "Platform Updates",
    content: `GoVibeful may update features, policies, and terms with notice to users. Continued use constitutes acceptance of changes. Major policy changes will be communicated via email. We strive to improve user experience through regular updates. Beta features may be introduced for testing. Users can provide feedback on platform changes through our support channels.`,
  },
];

const INITIAL_VISIBLE_POLICIES = 6;

const PoliciesPage = () => {
  const [visiblePoliciesCount, setVisiblePoliciesCount] = useState(INITIAL_VISIBLE_POLICIES);
  
  const loadMorePolicies = () => setVisiblePoliciesCount(allPolicies.length);
  const visiblePolicies = allPolicies.slice(0, visiblePoliciesCount);

  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 lg:py-24 bg-secondary/20 dark:bg-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <Shield className="w-10 h-10 text-primary mx-auto mb-4 opacity-80" />
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 tracking-tight">
              Platform Policies
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Our commitment to creating a safe, fair, and creative community for all artists and art enthusiasts.
            </p>
          </div>

          <Accordion
            type="single"
            collapsible
            className="w-full max-w-4xl mx-auto space-y-3 sm:space-y-4"
          >
            {visiblePolicies.map((policy) => (
              <AccordionItem
                key={policy.id}
                value={policy.id}
                className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-foreground hover:no-underline text-md flex items-center gap-3">
                  <FileText className="w-4 h-4 text-primary opacity-70" />
                  {policy.title}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 pt-0 text-muted-foreground text-sm leading-relaxed">
                  {policy.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {allPolicies.length > INITIAL_VISIBLE_POLICIES &&
            visiblePoliciesCount < allPolicies.length && (
              <div className="text-center mt-10">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={loadMorePolicies}
                  className="font-semibold min-w-[180px]"
                >
                  View All Policies
                </Button>
              </div>
            )}

          <div className="mt-16 pt-8 border-t border-border/50">
            <div className="text-center text-sm text-muted-foreground space-y-2">
              <p>Last updated: January 2025</p>
              <p>
                Questions about our policies?{" "}
                <a href="mailto:support@govibeful.com" className="text-primary hover:underline">
                  Contact our support team
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PoliciesPage;