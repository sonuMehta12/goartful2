// components/events/EventList.tsx
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button'; // Assuming shadcn/ui button is added

export function EventList() {
  const sampleEvents = [
    { id: 1, title: "Art Gala Night", description: "An evening of fine art and music.", location: "Downtown Gallery" },
    { id: 2, title: "Street Art Festival", description: "Explore vibrant murals and live paintings.", location: "City Center Plaza" },
  ];

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        Featured Events
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {sampleEvents.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle className="text-primary">{event.title}</CardTitle>
              <CardDescription>{event.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{event.description}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8 rounded-md border bg-accent p-4 text-accent-foreground">
        This is a accent box to test theme colors.
      </div>
    </section>
  );
}