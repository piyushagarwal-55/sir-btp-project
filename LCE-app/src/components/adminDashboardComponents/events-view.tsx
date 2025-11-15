import * as React from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, MoreVertical, Pencil, Trash2, ChevronLeft } from "lucide-react";

type Event = {
  id: string;
  name: string;
  posterLink: string;
  date: string;
  description: string;
};

type EventRegistration = {
  id: number;
  eventId: string;
  name: string;
  number: string;
  email: string;
};

export function EventsView() {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null);
  const [registrations, setRegistrations] = React.useState<EventRegistration[]>(
    []
  );
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/events`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to fetch events. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRegistrations = async (eventId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/event-registrations/${eventId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch registrations");
      }
      const data = await response.json();
      setRegistrations(data);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      setError("Failed to fetch registrations. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEvent = async (eventData: Omit<Event, "id">) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add event");
      }
      fetchEvents();
    } catch (error) {
      console.error("Error adding event:", error);
      setError("Failed to add event. Please try again later.");
    }
  };

  const handleEditEvent = async (
    eventId: string,
    eventData: Omit<Event, "id">
  ) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/events/${eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update event");
      }
      fetchEvents();
    } catch (error) {
      console.error("Error updating event:", error);
      setError("Failed to update event. Please try again later.");
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/events/${eventId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      setError("Failed to delete event. Please try again later.");
    }
  };

  const handleShowRegistrations = (event: Event) => {
    setSelectedEvent(event);
    fetchRegistrations(event.id);
  };

  if (isLoading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {selectedEvent ? (
        <RegistrationsView
          event={selectedEvent}
          registrations={registrations}
          onBack={() => setSelectedEvent(null)}
        />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold tracking-tight">Events</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                  <DialogDescription>
                    Create a new event by filling out the form below.
                  </DialogDescription>
                </DialogHeader>
                <EventForm onSubmit={handleAddEvent} />
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onShowRegistrations={() => handleShowRegistrations(event)}
                onEdit={(data) => handleEditEvent(event.id, data)}
                onDelete={() => handleDeleteEvent(event.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function EventCard({
  event,
  onShowRegistrations,
  onEdit,
  onDelete,
}: {
  event: Event;
  onShowRegistrations: () => void;
  onEdit: (data: Omit<Event, "id">) => void;
  onDelete: () => void;
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <img
            alt={event.name}
            className="object-cover w-full h-full"
            src={event.posterLink}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="absolute right-2 top-2"
                size="icon"
                variant="secondary"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Event</DialogTitle>
                    <DialogDescription>
                      Make changes to the event details below.
                    </DialogDescription>
                  </DialogHeader>
                  <EventForm onSubmit={onEdit} initialData={event} />
                </DialogContent>
              </Dialog>
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl mb-2">{event.name}</CardTitle>
        <time className="text-sm text-muted-foreground mb-2 block">
          {format(new Date(event.date), "PPP")}
        </time>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {event.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant="outline"
          onClick={onShowRegistrations}
        >
          Show Registrations
        </Button>
      </CardFooter>
    </Card>
  );
}

function EventForm({
  onSubmit,
  initialData,
}: {
  onSubmit: (data: Omit<Event, "id">) => void;
  initialData?: Event;
}) {
  const [formData, setFormData] = React.useState(
    initialData || {
      name: "",
      posterLink: "",
      date: "",
      description: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Event Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="posterLink">Poster Link</Label>
        <Input
          id="posterLink"
          name="posterLink"
          value={formData.posterLink}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Event Date</Label>
        <Input
          id="date"
          name="date"
          type="datetime-local"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit">Save Event</Button>
    </form>
  );
}

function RegistrationsView({
  event,
  registrations,
  onBack,
}: {
  event: Event;
  registrations: EventRegistration[];
  onBack: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {event.name} - Registrations
          </h2>
          <p className="text-muted-foreground mt-1">
            {format(new Date(event.date), "PPP")}
          </p>
        </div>
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrations.length > 0 ? (
              registrations.map((registration) => (
                <TableRow key={registration.id}>
                  <TableCell className="font-medium">
                    {registration.name}
                  </TableCell>
                  <TableCell>{registration.email}</TableCell>
                  <TableCell>{registration.number}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No registrations found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
