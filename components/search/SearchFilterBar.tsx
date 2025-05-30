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
import {CATEGORIES_DATA}  from "@/lib/data/categories";
import { SearchFilters } from "@/lib/types/filters";
import { CalendarIcon, SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange as CalendarDateRange } from "react-day-picker";

interface SearchFilterBarProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  className?: string;
  onClose?: () => void;
  isModal?: boolean;
}

export function SearchFilterBar({
  filters,
  onFilterChange,
  className,
  onClose,
  isModal = false,
}: SearchFilterBarProps) {
  const [dateRange, setDateRange] = useState<CalendarDateRange | undefined>({
    from: filters.startDate || undefined,
    to: filters.endDate || undefined,
  });

  const handleDateRangeChange = (range: CalendarDateRange | undefined): void => {
    setDateRange(range);
    onFilterChange({
      ...filters,
      startDate: range?.from || null,
      endDate: range?.to || null,
    });
  };

  const handleClearFilters = (): void => {
    setDateRange(undefined);
    onFilterChange({
      query: "",
      category: "all",
      startDate: null,
      endDate: null,
    });
  };

  return (
    <div
      className={cn(
        "bg-background rounded-lg",
        isModal
          ? "p-4 flex flex-col gap-6"
          : "p-4 sm:p-6 flex flex-col md:flex-row md:items-end gap-4",
        className
      )}
    >
      {isModal && (
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Search & Filter</h2>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          )}
        </div>
      )}

      <div className="grid gap-2 flex-1">
        <Label htmlFor="search">Search Events</Label>
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Search by event name or description"
            className="pl-9"
            value={filters.query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onFilterChange({ ...filters, query: e.target.value })
            }
          />
        </div>
      </div>

      <div className="grid gap-2 w-full md:w-40">
        <Label htmlFor="category">Category</Label>
        <Select
          value={filters.category}
          onValueChange={(value: string) =>
            onFilterChange({ ...filters, category: value })
          }
        >
          <SelectTrigger id="category">
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

      <div className="grid gap-2 w-full md:w-60">
        <Label>Date Range</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
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
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={handleDateRangeChange}
              numberOfMonths={2}
              className="border rounded-md"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className={cn("flex gap-2", isModal ? "mt-2" : "md:ml-2")}>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearFilters}
          className={isModal ? "flex-1" : ""}
        >
          Clear
        </Button>
        <Button size="sm" className={isModal ? "flex-1" : ""}>
          Search
        </Button>
      </div>
    </div>
  );
}
