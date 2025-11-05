"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Candidate } from "@/lib/types/game";
import { cn } from "@/lib/utils";
import { useGame } from "@/lib/providers/GameProvider";

interface CandidateCardProps {
  candidate: Candidate;
}

// Move color maps outside component to avoid recreation on every render
const COLOR_MAP = {
  jdu: "bg-jdu",
  rjd: "bg-rjd",
  jsp: "bg-jsp",
} as const;

const COLOR_HOVER_MAP = {
  jdu: "hover:bg-jdu/90",
  rjd: "hover:bg-rjd/90",
  jsp: "hover:bg-jsp/90",
} as const;

const COLOR_BADGE_MAP = {
  jdu: "bg-jdu/10 text-jdu",
  rjd: "bg-rjd/10 text-rjd",
  jsp: "bg-jsp/10 text-jsp",
} as const;

export default function CandidateCard({ candidate }: CandidateCardProps) {
  const router = useRouter();
  const { dispatch } = useGame();
  const [imageError, setImageError] = useState(false);

  const handleSelect = () => {
    dispatch({ type: "SELECT_CANDIDATE", payload: candidate.id });
    router.push("/allocate");
  };

  return (
    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card">
      <div
        className={cn(
          "relative h-60 flex items-center justify-center",
          // subtle colored background per candidate
          candidate.color === "jdu" && "bg-jdu/15",
          candidate.color === "rjd" && "bg-rjd/15",
          candidate.color === "jsp" && "bg-jsp/15"
        )}
      >
        {!imageError ? (
          <Image
            src={candidate.avatar}
            alt={`${candidate.name} - ${candidate.partyShort}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 33vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="text-muted-foreground text-sm text-center p-4">
            {candidate.name}
          </div>
        )}
      </div>
      <div className="p-6 text-center">
        <h3 className="text-2xl font-bold font-playfair mb-2">
          {candidate.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-2 h-10">
          {candidate.description}
        </p>
        <p className="text-sm font-semibold italic text-foreground/90 mb-3">
          &quot;{candidate.slogan}&quot;
        </p>
        <div
          className={cn(
            "inline-block px-4 py-1 rounded-full text-xs font-bold mb-4",
            COLOR_BADGE_MAP[candidate.color]
          )}
        >
          {candidate.partyShort}
        </div>
        <Button
          onClick={handleSelect}
          size="lg"
          className={cn(
            "w-full font-semibold text-base text-white",
            COLOR_MAP[candidate.color],
            COLOR_HOVER_MAP[candidate.color]
          )}
          aria-label={`Start campaign as ${candidate.name}`}
        >
          Start Campaign
        </Button>
      </div>
    </Card>
  );
}
