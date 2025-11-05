"use client";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ResourceSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max: number;
  icon: LucideIcon;
  color: "orange" | "green" | "pink" | "blue" | "red";
}

// Move color classes outside component to avoid recreation on every render
const colorClasses = {
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    icon: "text-orange-600",
    range: "bg-orange-500",
    thumb: "border-orange-500",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-600",
    icon: "text-green-600",
    range: "bg-green-500",
    thumb: "border-green-500",
  },
  pink: {
    bg: "bg-pink-50",
    text: "text-pink-600",
    icon: "text-pink-600",
    range: "bg-pink-500",
    thumb: "border-pink-500",
  },
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    icon: "text-blue-600",
    range: "bg-blue-500",
    thumb: "border-blue-500",
  },
  red: {
    bg: "bg-red-50",
    text: "text-red-600",
    icon: "text-red-600",
    range: "bg-red-500",
    thumb: "border-red-500",
  },
};

export default function ResourceSlider({
  label,
  value,
  onChange,
  max,
  icon: Icon,
  color,
}: ResourceSliderProps) {
  const colors = colorClasses[color];

  return (
    <div className="flex flex-col gap-2 p-4 rounded-xl border bg-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn("w-9 h-9 rounded-full flex items-center justify-center", colors.bg)}>
            <Icon className={cn("w-5 h-5", colors.icon)} />
          </div>
          <span className="text-sm font-medium">{label}</span>
        </div>
        <span className={cn("text-xl font-bold", colors.text)}>{value}</span>
      </div>

      <Slider
        value={[value]}
        onValueChange={([newValue]) => onChange(newValue)}
        max={max}
        step={1}
        trackClassName="bg-muted"
        rangeClassName={cn(colors.range)}
        thumbClassName={cn(colors.thumb, "bg-background")}
        aria-label={`Adjust ${label}`}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
      />
    </div>
  );
}
