// components/event-detail/EventReviewsClient.tsx
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  ChevronRight,
  MessageSquarePlus,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"; // Added ThumbsUp/Down
import { useState, useMemo, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import type { Review as ReviewType } from "@/lib/types/event";
import { format, parseISO, isValid } from "date-fns";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";

interface RatingDistributionItem {
  stars: number;
  percentage: number;
  count: number;
}

interface EventReviewsClientProps {
  eventId: string;
  eventName: string;
  reviews?: ReviewType[] | null;
  averageRating?: number | null;
  reviewCount: number;
}

const getInitials = (name?: string | null): string => {
  if (!name || name.trim() === "") return "U";
  const parts = name.split(" ").filter(Boolean);
  if (parts.length === 0) return "U";
  return parts
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export default function EventReviewsClient({
  eventId,
  eventName,
  reviews: initialReviews,
  averageRating,
  reviewCount,
}: EventReviewsClientProps) {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const reviewsData = useMemo(() => initialReviews || [], [initialReviews]);

  const ratingDistribution = useMemo((): RatingDistributionItem[] => {
    if (reviewCount === 0 || !reviewsData || reviewsData.length === 0) {
      return [5, 4, 3, 2, 1].map((stars) => ({
        stars,
        count: 0,
        percentage: 0,
      }));
    }
    const counts = Array(5).fill(0);
    reviewsData.forEach((review) => {
      const rating = Math.round(review.rating);
      if (rating >= 1 && rating <= 5) {
        counts[rating - 1]++;
      }
    });
    return [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      count: counts[stars - 1],
      percentage:
        reviewCount > 0
          ? Math.round((counts[stars - 1] / reviewCount) * 100)
          : 0,
    }));
  }, [reviewsData, reviewCount]);

  const renderStars = (
    rating: number,
    starSize: string = "w-5 h-5",
    className?: string
  ) => {
    const roundedRating = Math.round(rating);
    return (
      <div className={cn("flex items-center", className)}>
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={cn(
              starSize,
              "transition-colors", // Added transition
              index < roundedRating
                ? "text-yellow-400 fill-yellow-400"
                : "text-muted-foreground/20 dark:text-muted-foreground/30" // Softer empty star
            )}
          />
        ))}
      </div>
    );
  };

  const reviewsToDisplay = showAllReviews
    ? reviewsData
    : reviewsData.slice(0, 3);

  const handleWriteReview = () => {
    alert(`Write a review for event ID: ${eventId} ("${eventName}")`);
  };

  if (!isClient) {
    // More detailed skeleton matching the new design
    return (
      <section
        id="reviews"
        className="py-6 sm:py-8 bg-muted/20 dark:bg-card animate-pulse"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Skeleton */}
          <div className="mb-10 lg:mb-12">
            <div className="h-8 bg-muted-foreground/20 rounded w-1/2 sm:w-1/3 mb-4"></div>{" "}
            {/* Title */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-32 bg-muted-foreground/20 rounded-md"></div>{" "}
                {/* Stars */}
                <div className="h-6 w-24 bg-muted-foreground/20 rounded-md"></div>{" "}
                {/* Rating text */}
              </div>
              <div className="h-10 w-full sm:w-40 bg-muted-foreground/20 rounded-md"></div>{" "}
              {/* Button */}
            </div>
          </div>
          {/* Review Cards Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6 border-border bg-card shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-muted-foreground/20"></div>
                  <div className="space-y-1.5 flex-1">
                    <div className="h-4 w-3/4 bg-muted-foreground/20 rounded"></div>
                    <div className="h-3 w-1/2 bg-muted-foreground/20 rounded"></div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="h-4 w-full bg-muted-foreground/20 rounded"></div>
                  <div className="h-4 w-full bg-muted-foreground/20 rounded"></div>
                  <div className="h-4 w-5/6 bg-muted-foreground/20 rounded"></div>
                </div>
              </Card>
            ))}
          </div>
          {/* Rating Distribution Skeleton */}
          <Card className="mt-12 lg:mt-16 border-border bg-card shadow-sm p-6">
            <div className="h-6 w-1/3 bg-muted-foreground/20 rounded mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-5 bg-muted-foreground/20 rounded"
                ></div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    );
  }

  if (reviewCount === 0) {
    return (
      <section
        id="reviews"
        className="py-6 sm:py-8 text-center bg-muted/20 dark:bg-card rounded-lg"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Star className="w-12 h-12 text-primary mx-auto mb-4 opacity-70" />
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-3">
            Be the First to Share Your Thoughts!
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            No reviews yet for &quot;{eventName}&quot;. Your feedback can help
            others discover this experience!
          </p>
          <Button onClick={handleWriteReview} size="lg" className="group">
            <MessageSquarePlus className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
            Write Your Review
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="reviews" className="py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center sm:text-left">
            What Others Are Saying
          </h2>
          {/* Overall Rating - Placed prominently */}
          {typeof averageRating === "number" && reviewCount > 0 && (
            <div className="mt-4 flex flex-col items-center sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 bg-card border border-border rounded-lg shadow-sm">
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-4xl font-bold text-primary">
                  {averageRating.toFixed(1)}
                </span>
                {renderStars(averageRating, "w-6 h-6", "mt-1")}
                <p className="text-sm text-muted-foreground mt-1">
                  Based on {reviewCount} review{reviewCount !== 1 ? "s" : ""}
                </p>
              </div>
              <Separator className="h-16 w-px bg-border hidden sm:block mx-4" />
              {/* Rating Distribution - More integrated here */}
              <div className="w-full sm:flex-1 mt-4 sm:mt-0">
                {ratingDistribution.map((item) => (
                  <div
                    key={item.stars}
                    className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm mb-1"
                  >
                    <span className="w-10 text-muted-foreground text-right tabular-nums shrink-0">
                      {item.stars} star{item.stars !== 1 && "s"}
                    </span>
                    <Progress
                      value={item.percentage}
                      className="flex-1 h-1.5 sm:h-2" // Slightly thinner progress bar
                      aria-label={`${item.percentage}% for ${item.stars} stars`}
                    />
                    <span className="w-8 text-foreground font-medium text-right tabular-nums shrink-0">
                      {item.percentage}%
                    </span>
                    {/* <span className="w-12 text-muted-foreground text-right tabular-nums text-xs shrink-0">
                      ({item.count})
                    </span> */}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reviews Grid & Write Review Button */}
        <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <p className="text-sm text-muted-foreground">
            Showing {reviewsToDisplay.length} of {reviewsData.length} reviews
          </p>
          <Button
            onClick={handleWriteReview}
            variant="outline"
            className="group w-full md:w-auto"
          >
            <MessageSquarePlus className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
            Write a Review
          </Button>
        </div>

        {reviewsToDisplay.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviewsToDisplay.map((review) => {
              let formattedDate = "Date not specified";
              try {
                const dateObj = parseISO(review.date);
                if (isValid(dateObj))
                  formattedDate = format(dateObj, "MMMM d, yyyy");
              } catch (e) {
                /* Keep default */
              }

              return (
                <Card
                  key={review.id}
                  className="border-border bg-card shadow-sm flex flex-col hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-11 h-11 border-2 border-background shadow-sm">
                        {review.avatar?.url && (
                          <AvatarImage
                            src={review.avatar.url}
                            alt={review.avatar.alt || review.name}
                          />
                        )}
                        <AvatarFallback className="text-sm">
                          {getInitials(review.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-md text-foreground">
                          {review.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {formattedDate}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 flex-grow space-y-3">
                    <div className="flex items-center">
                      {renderStars(review.rating, "w-4 h-4")}
                    </div>
                    <p className="text-sm text-foreground leading-relaxed line-clamp-5">
                      {" "}
                      {/* Changed to text-foreground for better readability */}
                      {review.comment}
                    </p>
                  </CardContent>
                  {review.verified && (
                    <div className="px-6 pb-4 mt-auto">
                      <Badge
                        variant="outline"
                        className="text-xs text-green-700 dark:text-green-400 border-green-500/50 bg-green-500/10 font-normal py-0.5 px-2"
                      >
                        Verified Purchase {/* Or "Verified Reviewer" */}
                      </Badge>
                    </div>
                  )}
                  {/* Optional: Helpful buttons
                  <CardFooter className="pt-3 border-t justify-end gap-2">
                      <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary p-1 h-auto">
                          <ThumbsUp className="w-3.5 h-3.5 mr-1"/> Helpful
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-destructive p-1 h-auto">
                          <ThumbsDown className="w-3.5 h-3.5 mr-1"/> Not Helpful
                      </Button>
                  </CardFooter>
                  */}
                </Card>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-10">
            No detailed reviews to display for this filter.
          </p>
        )}

        {/* "See All Reviews" Button - Placed after the grid */}
        {reviewsData.length > 3 && !showAllReviews && (
          <div className="mt-10 text-center">
            <Button
              variant="default"
              size="lg"
              onClick={() => setShowAllReviews(true)}
              className="px-8"
            >
              See All {reviewsData.length} Reviews{" "}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
