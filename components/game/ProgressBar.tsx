"use client";

import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-muted-foreground">
          Question {current} of {total}
        </span>
        <span className="text-sm font-bold">
          {current}/{total}
        </span>
      </div>
      <Progress
        value={percentage}
        className="h-2 bg-primary/20"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Question ${current} of ${total}`}
      />
    </div>
  );
}
