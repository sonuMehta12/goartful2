// app/coming-soon/page.tsx
"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming you use shadcn/ui Button
import { HardHat, Sparkles } from "lucide-react"; // Icons for coming soon

export default function ComingSoonPage() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    // Timer to hide logo and show content, adjust timing as needed
    const timer = setTimeout(() => setShowLogo(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-4">
      {/* Background stroke image (same as your 404 page) */}
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dv9mzq2bv/image/upload/v1750057530/VectorStroke_fz19yd.png')] bg-cover bg-center bg-no-repeat opacity-20 sm:opacity-30 pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl mx-auto text-center">
        <AnimatePresence>
          {showLogo ? (
            <motion.div
              key="coming-soon-icon" // Unique key
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -80 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="mb-8 mt-8 mx-auto"
            >
              <Sparkles className="w-20 h-20 sm:w-24 sm:h-24 text-primary animate-pulse drop-shadow-xl" />
              {/* Or your GoArtful logo if preferred for brand consistency */}
              {/* <img
                src="https://res.cloudinary.com/dv9mzq2bv/image/upload/v1750438641/Vector_star_rcvxnw.png"
                alt="GoArtful Building"
                className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-xl"
              /> */}
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {!showLogo && (
            <motion.div
              key="coming-soon-content" // Unique key
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }} // Added slight delay
              className="w-full"
            >
              <HardHat className="w-12 h-12 text-primary mx-auto mb-4 opacity-80" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 tracking-tight">
                Something <span className="text-primary">Artful</span> is Coming
                Soon!
              </h1>
              <p className="text-md sm:text-lg text-slate-300 mb-8 max-w-lg mx-auto leading-relaxed">
                Our creative hamsters are working hard on this new feature. It's
                not quite ready yet, but we promise it'll be worth the wait!
              </p>
              <Link href="/">
                <Button
                  variant="default"
                  size="lg"
                  className="px-8 py-3 text-base font-semibold bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  ← Explore Other Artful Pages
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
