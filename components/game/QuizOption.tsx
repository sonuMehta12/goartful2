"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuizOptionProps {
  number: number;
  text: string;
  onSelect: () => void;
  selected?: boolean;
  "aria-label"?: string;
}

export default function QuizOption({
  number,
  text,
  onSelect,
  selected = false,
  "aria-label": ariaLabel,
}: QuizOptionProps) {
  return (
    <Button
      variant={selected ? "default" : "outline"}
      onClick={onSelect}
      className={cn(
        "w-full text-left justify-start p-4 h-auto whitespace-normal",
        "transition-all duration-200",
        selected && "ring-2 ring-offset-2 ring-offset-background ring-primary"
      )}
      role="radio"
      aria-checked={selected}
      aria-label={ariaLabel || `Option ${number}`}
      tabIndex={0}
    >
      <div className="flex gap-4 items-start">
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold mt-1">
          {number}
        </div>
        <p className="flex-1 text-sm leading-relaxed">{text}</p>
      </div>
    </Button>
  );
}
