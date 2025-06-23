import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PenTool, Heart, Bell, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | GoArtful",
  description:
    "Stay tuned for our upcoming blog posts about art, creativity, and the GoArtful community.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 via-background to-background dark:from-primary/5 dark:via-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <PenTool className="w-16 h-16 text-primary mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            GoArtful Blog
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Stories, insights, and inspiration from the world of art and
            creativity.
          </p>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center shadow-lg border-border">
              <CardContent className="py-12 px-6">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
                    <PenTool className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                    We're Writing Our First Blog!
                  </h2>
                  <p className="text-muted-foreground text-lg mb-6">
                    Our team is hard at work creating amazing content for you.
                    We're preparing articles about art techniques, artist
                    spotlights, creative inspiration, and much more.
                  </p>
                  <div className="inline-flex items-center gap-2 text-primary font-semibold">
                    <Bell className="w-5 h-5" />
                    <span>Coming Soon</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-12 md:py-16 bg-muted/20 dark:bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-xl mx-auto">
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">
              Thanks for Visiting!
            </h3>
            <p className="text-muted-foreground mb-6">
              We really appreciate you stopping by our blog. Your interest in
              GoArtful and our community means the world to us. Stay tuned for
              exciting content coming your way!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="font-semibold px-6">
                <Link href="/contact">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Contact Us
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="font-semibold px-6"
              >
                <Link href="/">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">
              What to Expect
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              When our blog launches, you'll find amazing content about art,
              creativity, and our vibrant community.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                <PenTool className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Art Techniques</h4>
              <p className="text-sm text-muted-foreground">
                Learn new skills and improve your craft
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Artist Stories</h4>
              <p className="text-sm text-muted-foreground">
                Inspiring journeys from our community
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                <Bell className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">GoArtful Updates</h4>
              <p className="text-sm text-muted-foreground">
                Latest news and platform updates
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
