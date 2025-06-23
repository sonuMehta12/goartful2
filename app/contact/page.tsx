import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  Phone,
  MessageSquare,
  Instagram,
  Linkedin,
  Twitter,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact GoVibeful | Get in Touch",
  description:
    "Connect with GoVibeful through email, phone, or social media. We're here to help!",
};

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@goartful.com",
    href: "mailto:hello@goartful.com",
    description: "Send us an email",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 96507 79490",
    href: "tel:+919650779490",
    description: "Call us directly",
  },
  {
    icon: MessageSquare,
    label: "WhatsApp",
    value: "+91 96507 79490",
    href: "https://wa.me/919650779490",
    description: "Chat with us",
  },
];

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 via-background to-background dark:from-primary/5 dark:via-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Mail className="w-16 h-16 text-primary mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you! Reach out through any of these channels
            and we'll get back to you soon.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {contactMethods.map((method) => (
              <Card
                key={method.label}
                className="text-center hover:shadow-lg hover:border-primary/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <CardHeader className="pb-3">
                  <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-3">
                    <method.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {method.label}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {method.description}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="font-medium text-foreground mb-4 break-all">
                    {method.value}
                  </p>
                  <Button asChild className="w-full" size="lg">
                    {method.href.startsWith("http") ? (
                      <a
                        href={method.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit {method.label}
                      </a>
                    ) : (
                      <a href={method.href}>
                        <method.icon className="w-4 h-4 mr-2" />
                        Contact via {method.label}
                      </a>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 md:py-16 bg-muted/20 dark:bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">
            Need Quick Help?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Choose your preferred way to get in touch with us.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="font-semibold px-6">
              <a href="mailto:hello@govibeful.com">
                <Mail className="w-5 h-5 mr-2" />
                Send Email
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="font-semibold px-6"
            >
              <a
                href="https://wa.me/919650779490"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                WhatsApp
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="font-semibold px-6"
            >
              <a href="tel:+919650779490">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
