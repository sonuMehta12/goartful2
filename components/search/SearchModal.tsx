"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SearchFilterBar } from "./SearchFilterBar";
import { SearchFilters } from "@/lib/types/filters";
import { useEffect, useState } from "react";

interface SearchModalProps {
  isOpen: boolean;
  onModalClose: () => void;
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
}

export function SearchModal({
  isOpen,
  onModalClose,
  filters,
  onFilterChange,
}: SearchModalProps) {
  // Use Dialog for desktop, Sheet for mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onModalClose}>
        <SheetContent side="bottom" className="h-[85vh] p-0">
          <div className="h-full overflow-y-auto px-1 py-6">
            <SearchFilterBar
              filters={filters}
              onFilterChange={onFilterChange}
              onModalClose={onModalClose}
              isModal={true}
            />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onModalClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogTitle className="text-lg font-semibold">
          Search and Filter Events
        </DialogTitle>
        <SearchFilterBar
          filters={filters}
          onFilterChange={onFilterChange}
          onModalClose={onModalClose}
          isModal={true}
        />
      </DialogContent>
    </Dialog>
  );
}
