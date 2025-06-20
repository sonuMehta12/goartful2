// app/join-artful/artist/page.tsx
import ArtistRegistrationForm from "@/components/auth/ArtistRegistrationForm";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Palette,
  Users,
  ShieldCheck,
  TrendingUp,
  Zap,
  Search,
  CheckCircle,
} from "lucide-react"; // Added more relevant icons
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Become a GoVibeful Host | Create & Share Your Art",
  description:
    "Join GoVibeful's vibrant community of Indian artists. Easily set up your profile, design unique art experiences, and start earning by sharing your passion.",
};

export default function RegisterArtistPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 dark:bg-slate-950 text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Left Column: Inspirational Content & Value Props (Visible on LG screens and up) */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-2/5 bg-gradient-to-br from-primary/80 via-orange-500/80 to-rose-600/80 dark:from-primary/70 dark:via-orange-600/70 dark:to-rose-700/70 p-8 lg:p-10 xl:p-16 flex-col justify-between relative overflow-hidden text-white">
        {/* Decorative abstract shapes */}
        <div
          className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full filter blur-3xl opacity-50 -translate-x-1/3 -translate-y-1/3"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full filter blur-3xl opacity-40 translate-x-1/4 translate-y-1/4"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 mb-20 group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-4 focus:ring-offset-primary/50 rounded-lg p-1 -m-1"
            aria-label="Go to GoVibeful homepage"
          >
            <Palette className="w-9 h-9 text-white transition-transform duration-300 group-hover:rotate-[12deg]" />
            <span className="text-3xl font-bold text-white">GoVibeful</span>
          </Link>

          <div className="space-y-5">
            <h1 className="text-4xl xl:text-[3.25rem] font-extrabold leading-tight tracking-tight">
              Share Your Art, Ignite Experiences.
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              GoVibeful empowers you to transform your passion into impactful
              experiences, connect with a vibrant community, and build a
              sustainable creative income—on your terms.
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-auto space-y-5">
          <Separator className="bg-white/20" />
          <h3 className="text-md font-semibold text-white/90">
            Why Host with GoVibeful?
          </h3>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-3">
              <CheckCircle
                className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span>
                <strong>Focus on Your Craft:</strong> We help with supplies &
                logistics (launch phase), so you can focus on creating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search
                className="w-5 h-5 text-sky-300 flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span>
                <strong>Reach Eager Learners:</strong> Connect with a dedicated
                audience of Indian art lovers actively seeking unique
                experiences.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap
                className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span>
                <strong>Earn Sustainably:</strong> Low commissions, no monthly
                fees. Keep more of what your art deserves.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Column: Registration Form Area */}
      <div className="w-full lg:w-[55%] xl:w-3/5 flex flex-col items-center justify-center p-6 py-10 sm:p-8 lg:p-12 xl:p-16 overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
          {/* Header for Form - more integrated */}
          <div className="text-center lg:text-left">
            <Link
              href="/"
              className="lg:hidden inline-flex items-center gap-2 mb-6 text-xl font-bold text-primary"
              aria-label="Go to GoVibeful homepage"
            >
              <Palette className="w-7 h-7" /> GoVibeful
            </Link>
            <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1">
              Start Your Artist Journey
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Create Your Profile
            </h2>
            <p className="text-sm text-muted-foreground mt-2 mb-6">
              Just a few essentials to begin. Takes ~2 minutes.
            </p>
          </div>

          {/* Progress Indicator */}
          <div
            role="progressbar"
            aria-valuenow={50}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Registration progress: Step 1 of 2"
            className="mb-8"
          >
            <div className="flex justify-between text-xs font-medium text-muted-foreground mb-1.5">
              <span className="text-primary font-semibold">
                Step 1: Essentials
              </span>
              <span className="text-muted-foreground/70">
                Step 2: Profile Details
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary to-orange-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: "50%" }}
              />
            </div>
          </div>

          <ArtistRegistrationForm />

          <p className="text-center text-sm text-muted-foreground pt-4">
            Already an artist with us?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:underline focus:underline focus:outline-none"
            >
              Log In
            </Link>
          </p>
        </div>
        <p className="text-xs text-muted-foreground/70 text-center mt-10 max-w-sm">
          By creating an account, you agree to GoVibeful's{" "}
          <Link
            href="/terms"
            target="_blank"
            className="underline hover:text-primary focus:text-primary focus:outline-none"
          >
            Terms of Service
          </Link>{" "}
          &{" "}
          <Link
            href="/privacy"
            target="_blank"
            className="underline hover:text-primary focus:text-primary focus:outline-none"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
