// components/search/SearchFilterBar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CATEGORIES_DATA } from "@/lib/data/categories";
import { SearchFilters, INITIAL_FILTERS } from "@/lib/types/filters";
import { CalendarIcon, SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DateRange as CalendarDateRange } from "react-day-picker";

interface SearchFilterBarProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  className?: string;
  /** Called when the modal's "Apply Filters" or "X" button (implicitly via parent) is actioned. */
  onModalClose?: () => void;
  isModal?: boolean;
}

export function SearchFilterBar({
  filters: currentFilters, // Renamed prop to avoid conflict with internal state if any
  onFilterChange,
  className,
  onModalClose,
  isModal = false,
}: SearchFilterBarProps) {
  // Internal state to manage form inputs before "applying" if needed,
  // or can directly use currentFilters if changes are immediate.
  // For simplicity, let's assume currentFilters reflects the true source of truth from parent.
  const [localQuery, setLocalQuery] = useState(currentFilters.query);
  const [localCategory, setLocalCategory] = useState(currentFilters.category);
  const [localDateRange, setLocalDateRange] = useState<
    CalendarDateRange | undefined
  >({
    from: currentFilters.startDate || undefined,
    to: currentFilters.endDate || undefined,
  });

  // Sync local state if external filters change (e.g., from URL params or parent reset)
  useEffect(() => {
    setLocalQuery(currentFilters.query);
    setLocalCategory(currentFilters.category);
    setLocalDateRange({
      from: currentFilters.startDate || undefined,
      to: currentFilters.endDate || undefined,
    });
  }, [currentFilters]);

  const applyLocalFilters = () => {
    onFilterChange({
      query: localQuery,
      category: localCategory,
      startDate: localDateRange?.from || null,
      endDate: localDateRange?.to || null,
    });
  };

  const handleClearFilters = (): void => {
    setLocalQuery(INITIAL_FILTERS.query);
    setLocalCategory(INITIAL_FILTERS.category);
    setLocalDateRange({
      from: INITIAL_FILTERS.startDate || undefined,
      to: INITIAL_FILTERS.endDate || undefined,
    });
    // Immediately propagate clear to parent
    onFilterChange(INITIAL_FILTERS);
  };

  // This is the "Apply" or "Search" button click
  const handleSearchOrApplyClick = () => {
    applyLocalFilters();
    if (isModal && onModalClose) {
      onModalClose(); // Close the modal after applying
    }
  };

  const commonFormFields = (
    <>
      {/* Search Input Field */}
      <div className={cn("grid gap-1.5", !isModal && "md:flex-1")}>
        <Label htmlFor="search-input">Search Events</Label>
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="search-input"
            placeholder="Event name, location, host..."
            className="pl-9 h-10"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Select Field */}
      <div
        className={cn("grid gap-1.5", !isModal && "md:w-auto lg:w-48 xl:w-52")}
      >
        <Label htmlFor="category-select">Category</Label>
        <Select
          value={localCategory}
          onValueChange={(value: string) => setLocalCategory(value)}
        >
          <SelectTrigger id="category-select" className="h-10">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES_DATA.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Date Range Picker Field */}
      <div
        className={cn("grid gap-1.5", !isModal && "md:w-auto lg:w-64 xl:w-72")}
      >
        <Label htmlFor="date-range-picker-trigger">Date Range</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date-range-picker-trigger"
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal h-10",
                !localDateRange?.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {localDateRange?.from ? (
                localDateRange.to ? (
                  <>
                    {format(localDateRange.from, "LLL dd, y")} -{" "}
                    {format(localDateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(localDateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Select dates</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={localDateRange?.from}
              selected={localDateRange}
              onSelect={setLocalDateRange}
              numberOfMonths={isModal ? 1 : 2}
              className="border rounded-md shadow-sm"
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );

  if (isModal) {
    // Modal/Sheet View (Vertical Stack)
    return (
      <div className={cn("bg-background flex flex-col h-full", className)}>
        <div className="px-4 pt-4 pb-2 border-b flex-shrink-0">
          <h2 className="text-lg font-semibold text-foreground">
            Search & Filter
          </h2>
        </div>
        <div className="flex-grow p-4 space-y-5 overflow-y-auto">
          {" "}
          {/* Increased space-y for modal */}
          {commonFormFields}
        </div>
        <div className="flex-shrink-0 px-4 pb-4 pt-4 border-t sticky bottom-0 bg-background z-10 flex gap-3">
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="flex-1"
          >
            Clear All
          </Button>
          <Button onClick={handleSearchOrApplyClick} className="flex-1">
            Apply Filters
          </Button>
        </div>
      </div>
    );
  }

  // Embedded/Desktop View (Horizontal Row)
  return (
    <div
      className={cn(
        "bg-card p-4 sm:p-6 flex flex-col md:flex-row md:items-end md:gap-4 border border-border shadow rounded-lg",
        className
      )}
    >
      {commonFormFields}
      {/* Action Buttons for Embedded View, aligned with other items */}
      <div className="flex gap-2 pt-4 md:pt-0 shrink-0">
        {" "}
        {/* md:self-end was here, now part of items-end on parent */}
        <Button
          variant="outline"
          onClick={handleClearFilters}
          className="w-full sm:w-auto h-10"
        >
          Clear
        </Button>
        <Button
          onClick={handleSearchOrApplyClick}
          className="w-full sm:w-auto h-10"
        >
          Search
        </Button>
      </div>
    </div>
  );
}
