'use client';

import { Button } from "@/components/ui/button";
import { SearchIcon, SlidersHorizontal } from "lucide-react";

interface MobileSearchButtonProps {
  onClick: () => void;
}

export function MobileSearchButton({ onClick }: MobileSearchButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="w-full flex items-center justify-between bg-card hover:bg-card/90 border shadow-sm text-foreground"
      variant="outline"
    >
      <div className="flex items-center gap-2">
        <SearchIcon className="h-4 w-4 text-muted-foreground" />
        <span className="text-muted-foreground">Search events...</span>
      </div>
      <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
    </Button>
  );
}