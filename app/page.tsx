// app/page.tsx
"use client";

import { candidates } from "@/lib/data/candidates";
import CandidateCard from "@/components/game/CandidateCard";

// Client component wrapper for candidate selection
function CandidateSelection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {candidates.map((candidate) => (
        <CandidateCard key={candidate.id} candidate={candidate} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="text-center mb-10 space-y-2">
        <div className="flex justify-center mb-4">
          <div className="bg-red-600 w-12 h-12 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">TOI</span>
          </div>
        </div>
        <h1 className="text-5xl font-bold font-playfair text-foreground">
          बिहार चुनाव 2025
        </h1>
        <p className="text-md text-muted-foreground max-w-xl mx-auto">
          Election simulation: Outsmart Bihar netas. Test your Chanakya skills.
        </p>
        <p className="text-sm font-medium text-red-600">
          Choose Your Perspective: Explore Bihar's campaign through concise, distinct viewpoints.
        </p>
      </div>
      <CandidateSelection />
    </div>
  );
}
