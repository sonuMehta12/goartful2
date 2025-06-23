// app/help-center/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LifeBuoy,
  MessageSquare,
  Phone,
  Mail,
  Linkedin,
  Instagram,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Help Center | GoArtful",
  description:
    "Need help with GoArtful? Contact our support team through phone, email, or social media.",
};

const contactMethods = [
  {
    name: "Phone Support",
    icon: Phone,
    description: "Call us for immediate assistance",
    contact: "+1 (555) 123-4567",
    action: "tel:+15551234567",
    available: "Mon-Fri, 9 AM - 6 PM EST",
  },
  {
    name: "Email Support",
    icon: Mail,
    description: "Send us a detailed message",
    contact: "support@goartful.com",
    action: "mailto:support@goartful.com",
    available: "We reply within 24 hours",
  },
];

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 via-background to-background dark:from-primary/5 dark:via-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <LifeBuoy className="w-16 h-16 text-primary mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            GoArtful Help Center
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Need help? We&apos;re here to support you! Choose your preferred way
            to get in touch with our team.
          </p>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 md:mb-12">
            Get Help & Support
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {contactMethods.map((method) => (
              <Card
                key={method.name}
                className="hover:shadow-lg hover:border-primary/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <method.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold">
                      {method.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {method.description}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-foreground">
                        {method.contact}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {method.available}
                      </p>
                    </div>
                    <Button asChild className="w-full" variant="outline">
                      {method.action.startsWith("http") ? (
                        <a
                          href={method.action}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Visit {method.name.split(" ")[0]}
                        </a>
                      ) : (
                        <a href={method.action}>
                          <method.icon className="w-4 h-4 mr-2" />
                          Contact via {method.name.split(" ")[0]}
                        </a>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Help Section */}
      <section className="py-12 md:py-16 bg-muted/20 dark:bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">
            Common Questions?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Whether you need help with bookings, payments, hosting events, or
            general questions about GoArtful, our support team is ready to
            assist you through any of the channels above.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="font-semibold px-6">
              <a href="tel:+15551234567">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="font-semibold px-6"
            >
              <a href="mailto:support@goartful.com">
                <Mail className="w-5 h-5 mr-2" />
                Send Email
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
