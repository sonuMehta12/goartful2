"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGame } from "@/lib/providers/GameProvider";
import { candidates } from "@/lib/data/candidates";
import { gameMetrics } from "@/lib/data/metrics";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Metric } from "@/lib/types/game";
import { cn } from "@/lib/utils";

const TOTAL_POINTS = 15;
const MAX_PER_RESOURCE = 5;

export default function AllocatePage() {
  const router = useRouter();
  const { state, dispatch } = useGame();
  const { selectedCandidateId } = state;

  // Initialize with zeros for discrete allocation
  const [metricValues, setMetricValues] = useState<
    Record<Metric["id"], number>
  >(() =>
    gameMetrics.reduce(
      (acc, metric) => ({ ...acc, [metric.id]: 0 }),
      {} as Record<Metric["id"], number>
    )
  );

  const candidate = useMemo(
    () => candidates.find((c) => c.id === selectedCandidateId),
    [selectedCandidateId]
  );

  const pointsAllocated = useMemo(
    () => Object.values(metricValues).reduce((sum, value) => sum + value, 0),
    [metricValues]
  );

  const pointsLeft = TOTAL_POINTS - pointsAllocated;

  useEffect(() => {
    if (!selectedCandidateId) {
      router.replace("/");
    }
  }, [selectedCandidateId, router]);

  const canIncrement = (metricId: Metric["id"]) =>
    metricValues[metricId] < MAX_PER_RESOURCE && pointsAllocated < TOTAL_POINTS;

  const increment = (metricId: Metric["id"]) => {
    if (!canIncrement(metricId)) return;
    setMetricValues((prev) => ({ ...prev, [metricId]: prev[metricId] + 1 }));
  };

  const decrement = (metricId: Metric["id"]) => {
    if (metricValues[metricId] <= 0) return;
    setMetricValues((prev) => ({ ...prev, [metricId]: prev[metricId] - 1 }));
  };

  const handleStartCampaign = () => {
    dispatch({ type: "ALLOCATE_METRICS", payload: metricValues });
    router.push("/quiz");
  };

  const handleAutoBalance = () => {
    const ids = gameMetrics.map((m) => m.id);
    const base = Math.floor(TOTAL_POINTS / ids.length);
    const remainder = TOTAL_POINTS % ids.length;
    const next: Record<Metric["id"], number> = {} as any;
    ids.forEach((id, idx) => {
      next[id] = Math.min(base + (idx < remainder ? 1 : 0), MAX_PER_RESOURCE);
    });
    setMetricValues(next);
  };

  if (!candidate) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-muted-foreground">Loading candidate...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4">
      <div className="mt-6 border border-gray-200 rounded-2xl bg-white shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <div className="text-sm font-semibold text-green-600">{pointsLeft} out of {TOTAL_POINTS} points</div>
      </div>
      <div className="text-center mb-6">
        <div className="relative w-full h-40 sm:h-56 md:h-64 rounded-xl overflow-hidden border border-gray-200">
          <img
            src={"https://static.toiimg.com/photo/125064184.cms"}
            alt={`${candidate.name}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect width='800' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='20' font-family='sans-serif'%3EImage%20unavailable%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>
        <p className="text-muted-foreground mt-3 text-sm">Play as</p>
        <h1 className="text-3xl font-bold font-playfair">{candidate.name}</h1>
        <p className="text-sm text-muted-foreground mt-1">Allocate your campaign resources strategically.</p>
      </div>

      {/* Points section */}
      <Card className="p-4 text-center mb-6">
        <p className="text-sm text-muted-foreground">Points Available</p>
        <p className="text-4xl font-bold text-blue-600">{pointsLeft}</p>
        <p className="text-xs text-muted-foreground mt-1">out of {TOTAL_POINTS} points</p>
      </Card>

      <div className="grid grid-cols-5 gap-4 mb-6">
        {gameMetrics.map((metric) => {
          const Icon = metric.icon;
          const value = metricValues[metric.id];
          const percent = (value / MAX_PER_RESOURCE) * 100;
          const colorMap: Record<typeof metric.color, string> = {
            orange: "bg-orange-500",
            green: "bg-green-500",
            pink: "bg-pink-500",
            blue: "bg-blue-500",
            red: "bg-red-500",
          };
          const accent = colorMap[metric.color];
          return (
            <div key={metric.id} className="flex flex-col items-center">
              <div className="mb-3 text-center">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2", accent)}>
                  <Icon className="text-white w-5 h-5" />
                </div>
                <p className="text-xs font-medium text-muted-foreground">{metric.label}</p>
                <p className="text-xl font-bold">{value}</p>
              </div>

              <button
                onClick={() => increment(metric.id)}
                disabled={!canIncrement(metric.id)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center mb-2 transition-colors"
                aria-label={`Increase ${metric.label}`}
              >
                <span className="font-bold">+</span>
              </button>

              <div className="relative h-56 w-12 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                <div className="absolute inset-0 flex flex-col justify-end p-1">
                  <div className={cn("rounded-full transition-all duration-300 ease-out", accent)} style={{ height: `${percent}%` }} />
                </div>
                <div className="absolute inset-0 flex flex-col justify-between py-1">
                  {[...Array(MAX_PER_RESOURCE + 1)].map((_, i) => (
                    <div key={i} className="h-0.5 bg-gray-300 mx-1" />
                  ))}
                </div>
              </div>

              <button
                onClick={() => decrement(metric.id)}
                disabled={value <= 0}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center mt-2 transition-colors"
                aria-label={`Decrease ${metric.label}`}
              >
                <span className="font-bold">−</span>
              </button>
              <p className="text-[10px] text-muted-foreground mt-1">Max: {MAX_PER_RESOURCE}</p>
            </div>
          );
        })}
      </div>

      {/* Secondary points reminder for long pages */}
      <Card className="p-4 text-center">
        <p className="text-lg font-bold">{pointsLeft} out of {TOTAL_POINTS} points</p>
      </Card>

      <div className="mt-6">
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleAutoBalance}
            aria-label="Auto-balance remaining points"
          >
            Auto-balance
          </Button>
          <Button
            size="lg"
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            onClick={handleStartCampaign}
            disabled={pointsAllocated === 0}
            aria-label="Start campaign with current resource allocation"
          >
            Start Campaign
          </Button>
        </div>
        {/* Instructions */}
        <div className="mt-4 text-center text-xs text-muted-foreground">
          <p>Use + and − buttons to allocate points one at a time.</p>
          <p className="mt-1">Maximum {MAX_PER_RESOURCE} points per resource • Total {TOTAL_POINTS} points available</p>
        </div>
      </div>
      </div>
    </div>
  );
}
