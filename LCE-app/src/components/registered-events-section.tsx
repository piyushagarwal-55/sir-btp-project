import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Calendar, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type Event = {
  id: string;
  name: string;
  date: string;
  description: string;
};

type Registration = {
  id: number;
  eventId: string;
  name: string;
  email: string;
  number: string;
};

export function RegisteredEventsSection({ email }: { email: string }) {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchRegisteredEvents();
  }, [email]);

  const fetchRegisteredEvents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch all events
      const eventsResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/events`
      );
      if (!eventsResponse.ok) {
        throw new Error("Failed to fetch events");
      }
      const allEvents: Event[] = await eventsResponse.json();

      // Fetch registrations for the current user
      const registrationsResponse = await fetch(
        `https://lce-backend-j2kx.onrender.com/registrations/getUserRegistrations?email=${encodeURIComponent(
          email
        )}`
      );
      if (!registrationsResponse.ok) {
        throw new Error("Failed to fetch user registrations");
      }
      const userRegistrations: Registration[] =
        await registrationsResponse.json();

      // Filter events to only include those the user is registered for
      const registeredEvents = allEvents.filter((event) =>
        userRegistrations.some(
          (registration) => registration.eventId === event.id
        )
      );

      setEvents(registeredEvents);
    } catch (error) {
      console.error("Error fetching registered events:", error);
      setError("Failed to fetch registered events. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-2">Loading registered events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Registered Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500">{error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Registered Events</CardTitle>
      </CardHeader>
      <CardContent>
        {events.length > 0 ? (
          <ScrollArea className="h-auto pr-4">
            <div className="space-y-8">
              {events.map((event, index) => (
                <React.Fragment key={event.id}>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{event.name}</h3>
                      <Badge variant="secondary">
                        {new Date(event.date) > new Date()
                          ? "Upcoming"
                          : "Past"}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      {new Date(event.date).toLocaleDateString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-start space-x-2 mt-2">
                      <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{event.description}</p>
                    </div>
                  </div>
                  {index < events.length - 1 && <Separator className="my-4" />}
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            You haven't registered for any events yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
