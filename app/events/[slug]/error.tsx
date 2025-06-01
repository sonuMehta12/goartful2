// app/events/[slug]/error.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import Link from "next/link";

export default function EventErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void; // Function to attempt to re-render the segment
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Event Page Error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-12 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-destructive mb-4">
        Oops! Something Went Wrong
      </h1>
      <p className="text-lg text-muted-foreground mb-6 max-w-md">
        We couldn&apos;t load the event details you were looking for. It might
        be a temporary issue, or the event may no longer exist.
      </p>
      <pre className="my-4 p-4 bg-muted text-destructive-foreground text-xs rounded-md overflow-x-auto max-w-lg">
        {/* Displaying error message in dev, consider removing/simplifying for prod */}
        {process.env.NODE_ENV === "development" && error?.message}
        {process.env.NODE_ENV === "development" &&
          error?.digest &&
          ` (Digest: ${error.digest})`}
      </pre>
      <div className="flex gap-4">
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          variant="outline"
        >
          Try Again
        </Button>
        <Button asChild>
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}
