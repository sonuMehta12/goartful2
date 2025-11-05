"use client";

import { useMemo, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGame } from "@/lib/providers/GameProvider";
import { candidates } from "@/lib/data/candidates";
import { gameMetrics } from "@/lib/data/metrics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import MetricBar from "@/components/game/MetricBar";

const WIN_THRESHOLD = 55; // Average score needed to win

export default function ResultsPage() {
  const router = useRouter();
  const { state, dispatch } = useGame();

  const finalScore = useMemo(() => {
    const metricValues = Object.values(state.metrics);
    if (metricValues.length === 0) return 0;
    const total = metricValues.reduce((sum, val) => sum + val, 0);
    return parseFloat((total / metricValues.length).toFixed(1));
  }, [state.metrics]);

  const hasWon = finalScore >= WIN_THRESHOLD;

  useEffect(() => {
    if (!state.isGameFinished) {
      router.replace("/");
    }
  }, [state.isGameFinished, router]);

  const candidate = useMemo(
    () => candidates.find((c) => c.id === state.selectedCandidateId),
    [state.selectedCandidateId]
  );

  const handlePlayAgain = () => {
    dispatch({ type: "RESET_GAME" });
    router.push("/");
  };

  if (!candidate) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-2">
          <p className="text-muted-foreground">Candidate not found.</p>
          <Button
            variant="outline"
            onClick={() => router.push("/")}
          >
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4">
      <div className="mt-6 border border-gray-200 rounded-2xl bg-white shadow-sm p-6 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Image
          src={candidate.avatar}
          alt={candidate.name}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">{candidate.name}</h2>
          <p className="text-sm text-muted-foreground">
            {candidate.partyShort}
          </p>
        </div>
      </div>

      <Card
        className={
          hasWon
            ? "bg-green-50 dark:bg-green-900/30"
            : "bg-red-50 dark:bg-red-900/30"
        }
        aria-live="polite"
        aria-atomic="true"
      >
        <CardHeader className="text-center pb-2">
          <p className="text-sm font-medium text-muted-foreground">
            Final Score
          </p>
          <p className="text-6xl font-bold">{finalScore}</p>
          <p
            className={`text-3xl font-bold ${
              hasWon ? "text-green-600" : "text-red-600"
            }`}
            role="status"
            aria-label={hasWon ? "Victory! You won the election." : "Defeat. You lost the election."}
          >
            {hasWon ? "Victory!" : "Defeat"}
          </p>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">
            {hasWon
              ? "Your strategic decisions resonated with the voters. Congratulations!"
              : "Your campaign failed to connect with voters. Time to rethink your approach."}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold">Campaign Metrics</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          {gameMetrics.map((metric) => (
            <MetricBar
              key={metric.id}
              label={metric.label}
              icon={metric.icon}
              value={state.metrics[metric.id]}
            />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold">Campaign Analysis</h3>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            {state.metrics.voteBank < 40 && (
              <li>
                Critical weakness: Your core vote bank showed significant
                erosion.
              </li>
            )}
            {state.metrics.youthAppeal < 40 && (
              <li>
                Failed to connect with young voters - a crucial demographic
                missed.
              </li>
            )}
            {state.metrics.womenVoters < 40 && (
              <li>
                Women voters were unconvinced by your messaging and promises.
              </li>
            )}
            {state.metrics.credibility < 40 && (
              <li>
                Serious credibility issues undermined your campaign
                effectiveness.
              </li>
            )}
            {state.metrics.momentum < 40 && (
              <li>
                Lack of momentum in the final stretch hurt your prospects
                significantly.
              </li>
            )}
            {finalScore >= 40 && (
              <li>
                Your campaign showed promise but ultimately fell short of a
                clear victory.
              </li>
            )}
          </ul>
        </CardContent>
      </Card>

      <div className="pt-2 space-y-3">
        <Button
          size="lg"
          className="w-full bg-red-600 hover:bg-red-700 text-white"
          onClick={handlePlayAgain}
        >
          Play Again
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-full"
          onClick={() => router.push("/")}
        >
          Choose Different Candidate
        </Button>
      </div>
      </div>
    </div>
  );
}
