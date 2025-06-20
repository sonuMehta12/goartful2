"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLogo(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-4">
      {/* Background stroke image */}
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dv9mzq2bv/image/upload/v1750057530/VectorStroke_fz19yd.png')] bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl mx-auto text-center">
        <AnimatePresence>
          {showLogo ? (
            <motion.div
              key="logo"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -80 }}
              transition={{ duration: 0.8 }}
              className="w-28 h-28 mb-8 mt-8 mx-auto flex items-center justify-center"
            >
              <img
                src="https://res.cloudinary.com/dv9mzq2bv/image/upload/v1750438641/Vector_star_rcvxnw.png"
                alt="GoVibeful Logo"
                className="w-full h-full object-contain drop-shadow-xl"
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
        <AnimatePresence>
          {!showLogo && (
            <motion.div
              key="404-content"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="w-full"
            >
              <h1 className="text-6xl sm:text-7xl font-extrabold text-white mb-4 tracking-tight">
                404
              </h1>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Oops! This star is lost in space.
              </h2>
              <p className="text-lg sm:text-xl text-slate-200 mb-8 max-w-xl mx-auto">
                The page you're looking for has drifted beyond our galaxy. Let's
                get you back on course.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                <Link href="/">
                  <button className="px-8 py-4 rounded-full bg-[#FF4B2B] text-white font-bold text-lg shadow hover:bg-[#ff6a47] transition w-full sm:w-auto">
                    ← Go Back Home
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
