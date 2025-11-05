"use client";

import { LucideIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface MetricBarProps {
  label: string;
  value: number;
  icon: LucideIcon;
}

export default function MetricBar({
  label,
  value,
  icon: Icon,
}: MetricBarProps) {
  const getProgressColor = () => {
    if (value < 30) return "bg-red-500";
    if (value < 60) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 font-medium text-muted-foreground">
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </div>
        <span className="font-bold text-foreground">{value}%</span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn("h-full transition-all", getProgressColor())}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${label}: ${value}%`}
        />
      </div>
    </div>
  );
}
