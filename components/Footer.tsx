import Link from "next/link";
import { Copyright, Linkedin, Instagram, Youtube } from "lucide-react";
import Logo from "./Logo";
import { Input } from "@/components/ui/input"; // Using Shadcn Input
import { Button } from "@/components/ui/button"; // Using Shadcn Button

interface FooterLink {
  href: string;
  label: string;
}

interface LinkColumn {
  title: string;
  links: FooterLink[];
  isPartnership?: boolean;
}

const footerLinksColumns: LinkColumn[] = [
  {
    title: "Company",
    links: [
      { href: "/about-us", label: "About Us" },
      { href: "/careers", label: "Careers" },
      { href: "/press", label: "Press" },
    ],
  },
  {
    title: "Legal & Support",
    links: [
      { href: "/policies", label: "Policies & Terms" },
      { href: "/help-center", label: "Help Center" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    title: "Join Our Community",
    isPartnership: true,
    links: [
      { href: "/join-artful", label: "Become a Creative Partner" },
      { href: "/partner-with-us", label: "Partner with GoVibeful" },
      { href: "/investors", label: "For Investors" },
    ],
  },
];

const SocialMediaLink = ({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
}) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-background/70 dark:bg-foreground/10 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 border border-border hover:shadow-md hover:-translate-y-0.5"
  >
    <Icon className="w-5 h-5" />
  </a>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-secondary/30 via-background to-secondary/20 dark:from-secondary/10 dark:via-background dark:to-secondary/5 border-t border-primary/20 dark:border-primary/10">
      {/* Ensure the container has padding that matches your main content area if needed */}
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 sm:py-16 lg:py-20">
        {" "}
        {/* Main container for all footer content */}
        {/* Top section: Brand, Links, Social/Newsletter */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Brand Section */}
          <div className="text-center lg:col-span-4 lg:text-left">
            <Logo className="text-3xl sm:text-4xl mb-2 text-primary inline-block lg:block" />
            <p className="text-sm text-primary/80 dark:text-primary/70 font-medium italic mb-3">
              Live through art.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto lg:mx-0">
              {" "}
              {/* Added max-w-xs for better text flow */}
              New Delhi, India
              <br />
              Connecting artists, creators, and art lovers worldwide.
            </p>
          </div>

          {/* Links Grid - Centered on mobile/tablet, spread on desktop */}
          <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-3 lg:col-span-5 lg:text-left xl:grid-cols-3">
            {footerLinksColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-5">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`text-sm text-muted-foreground hover:text-primary transition-colors duration-200
                                    ${
                                      column.isPartnership
                                        ? "font-medium py-1.5 hover:bg-primary/5 dark:hover:bg-primary/10 inline-block px-1 rounded-md"
                                        : ""
                                    }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social Media & Newsletter Section */}
          <div className="text-center lg:col-span-3 lg:text-left">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-5">
              Connect With Us
            </h3>
            <div className="flex justify-center lg:justify-start gap-3 sm:gap-4 mb-6">
              <SocialMediaLink
                href="https://linkedin.com/company/GoVibeful_com"
                label="LinkedIn"
                icon={Linkedin}
              />
              <SocialMediaLink
                href="https://instagram.com/GoVibeful_com"
                label="Instagram"
                icon={Instagram}
              />
              <SocialMediaLink
                href="https://twitter.com/GoVibeful_com"
                label="YouTube"
                icon={Youtube}
              />
            </div>
            <p className="mb-3 text-xs text-muted-foreground">
              Subscribe to our newsletter for updates and artistic inspiration!
            </p>
            {/* Newsletter Form - Constrained width and centered */}
            <form className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto lg:mx-0">
              <Input
                type="email"
                placeholder="your.email@example.com"
                className="flex-grow bg-background/50 border-border focus:border-primary focus:ring-primary placeholder:text-muted-foreground/70 text-sm"
                aria-label="Email for newsletter"
              />
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm w-full sm:w-auto"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        {/* Bottom section: Copyright - Centered */}
        <div className="mt-12 border-t border-border pt-8 text-center lg:mt-16">
          <p className="text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-center gap-1">
            <span className="flex items-center">
              <Copyright className="w-3.5 h-3.5 mr-1" /> {currentYear}{" "}
              GoVibeful. All rights reserved.
            </span>
            <span className="hidden sm:inline">|</span>
            <span>
              Crafted with <span className="text-primary mx-0.5">❤️</span> for
              the art community.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
