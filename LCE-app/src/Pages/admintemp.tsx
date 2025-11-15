import * as React from "react";
import { format } from "date-fns";
import {
  BarChart3,
  Building2,
  Calendar,
  ChevronLeft,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  MoreVertical,
  Pencil,
  Plus,
  Trash2,
  Users,
  Menu,
  X,
  Check,
  AlertTriangle,
  Loader2,
  FileText,
  MapPin,
  ArrowLeft,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

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

type StartupProfile = {
  user_id: string;
  name: string;
  entity_name: string;
  sector: string;
  categories: string;
  year: number;
  brand_name: string | null;
  entityRegistrationStatus: boolean | null;
  stage: string | null;
  detailsText: string | null;
  size: number;
  incubation_status: boolean;
  isApproved: boolean;
  startupIndiaRegister: boolean;
  registrations: RegistrationDetails | null;
  addresses: RegisteredAddress[];
  founders: Founder[];
  documents: Documents | null;
};

type RegistrationDetails = {
  user_id: string;
  reg_number: string;
  reg_date: string;
  reg_certificate: string;
  gst: string;
  ipr: boolean;
};

type RegisteredAddress = {
  addr_id: number;
  addrLine1: string;
  addLine2: string;
  state: string;
  city: string;
  district: string;
  pincode: number;
};

type Founder = {
  founderid: string;
  user_id: string;
  name: string;
  designation: string;
  mobile: string;
  address: string;
  equity: number;
  email: string;
};

type Documents = {
  user_id: string;
  pitch_deck: string;
  Aadhar_Number: string;
  Pan_Number: string;
  Reg_certificate: string;
  Dipp_number: string;
};

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = React.useState("events");
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [events, setEvents] = React.useState<Event[]>([]);
  const [registrations, setRegistrations] = React.useState<EventRegistration[]>(
    []
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedStartup, setSelectedStartup] =
    React.useState<StartupProfile | null>(null);

  React.useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "        `${import.meta.env.VITE_API_URL}/events`"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to fetch events. Please try again later.");
    }
  };

  const fetchRegistrations = async (eventId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Fetching registrations for event:", eventId);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/event-registrations/${eventId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch registrations");
      }
      const data = await response.json();
      console.log("Fetched registrations:", data);
      setRegistrations(data);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      setError("Failed to fetch registrations. Please try again later.");
      setRegistrations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowRegistrations = (event: Event) => {
    console.log("Showing registrations for event:", event.id);
    setSelectedEvent(event);
    fetchRegistrations(event.id);
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
      fetchEvents(); // Refresh the events list
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
      fetchEvents(); // Refresh the events list
    } catch (error) {
      console.error("Error updating event:", error);
      throw new Error("Failed to update event. Please try again later.");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <AppSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-10 flex items-center justify-between bg-white p-4 shadow-sm lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </header>
        <main className="p-4 lg:p-8 overflow-y-auto">
          {activeSection === "events" && !selectedEvent && (
            <EventsView
              events={events}
              onShowRegistrations={handleShowRegistrations}
              onAddEvent={handleAddEvent}
              onEditEvent={handleEditEvent}
            />
          )}
          {activeSection === "events" && selectedEvent && (
            <RegistrationsView
              event={selectedEvent}
              registrations={registrations}
              isLoading={isLoading}
              error={error}
              onBack={() => {
                setSelectedEvent(null);
                setRegistrations([]);
                setError(null);
              }}
            />
          )}
          {activeSection === "startups" && !selectedStartup && (
            <StartupsView onSelectStartup={setSelectedStartup} />
          )}
          {activeSection === "startups" && selectedStartup && (
            <StartupDetailsView
              startup={selectedStartup}
              onBack={() => setSelectedStartup(null)}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function AppSidebar({
  activeSection,
  onSectionChange,
  isOpen,
  onToggle,
}: {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { email, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground bg-indigo-700">
                <LayoutDashboard className="h-6 w-6 " />
              </div>
              <div>
                <h2 className="text-xl font-bold">LCE</h2>
                <p className="text-sm text-muted-foreground">Admin Dashboard</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onToggle}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="space-y-6">
            <Button
              variant={activeSection === "events" ? "default" : "ghost"}
              className="w-full justify-start text-lg"
              onClick={() => onSectionChange("events")}
            >
              <Calendar className="mr-3 h-5 w-5" />
              Events
            </Button>
            <Button
              variant={activeSection === "programs" ? "default" : "ghost"}
              className="w-full justify-start text-lg"
              onClick={() => onSectionChange("programs")}
            >
              <GraduationCap className="mr-3 h-5 w-5" />
              Programs
            </Button>
            <Button
              variant={activeSection === "admins" ? "default" : "ghost"}
              className="w-full justify-start text-lg"
              onClick={() => onSectionChange("admins")}
            >
              <Users className="mr-3 h-5 w-5" />
              Admins
            </Button>
            <Button
              variant={activeSection === "startups" ? "default" : "ghost"}
              className="w-full justify-start text-lg"
              onClick={() => onSectionChange("startups")}
            >
              <Building2 className="mr-3 h-5 w-5" />
              Startups
            </Button>
            <Button
              variant={activeSection === "analytics" ? "default" : "ghost"}
              className="w-full justify-start text-lg"
              onClick={() => onSectionChange("analytics")}
            >
              <BarChart3 className="mr-3 h-5 w-5" />
              Analytics
            </Button>
          </nav>
        </div>
        <div className="p-6 border-t">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarFallback>{email[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold">{email}</span>
                  <span className="text-xs text-muted-foreground">Admin</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  );
}

function EventsView({
  events,
  onShowRegistrations,
  onAddEvent,
  onEditEvent,
}: {
  events: Event[];
  onShowRegistrations: (event: Event) => void;
  onAddEvent: (eventData: Omit<Event, "id">) => void;
  onEditEvent: (eventId: string, eventData: Omit<Event, "id">) => void;
}) {
  const [newEvent, setNewEvent] = React.useState({
    name: "",
    date: "",
    description: "",
    posterLink: "",
  });
  const [editingEvent, setEditingEvent] = React.useState<Event | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [updateStatus, setUpdateStatus] = React.useState<
    "success" | "error" | null
  >(null);
  const [isFormChanged, setIsFormChanged] = React.useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (editingEvent) {
      setEditingEvent({ ...editingEvent, [name]: value });
      setIsFormChanged(true);
    } else {
      setNewEvent((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      handleUpdate();
    } else {
      onAddEvent(newEvent);
      setNewEvent({ name: "", date: "", description: "", posterLink: "" });
    }
  };

  const handleEditClick = (event: Event) => {
    setEditingEvent(event);
    setIsEditDialogOpen(true);
    setIsFormChanged(false);
  };

  const handleUpdate = async () => {
    if (!editingEvent) return;

    setIsUpdating(true);
    try {
      await onEditEvent(editingEvent.id, {
        name: editingEvent.name,
        posterLink: editingEvent.posterLink,
        date: editingEvent.date,
        description: editingEvent.description,
      });
      setUpdateStatus("success");
    } catch (error) {
      console.error("Error updating event:", error);
      setUpdateStatus("error");
    } finally {
      setIsUpdating(false);
      setIsEditDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Events</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4 sm:mt-0">
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Event Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newEvent.name}
                  onChange={handleInputChange}
                  placeholder="Enter event name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Event Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="datetime-local"
                  value={newEvent.date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                  placeholder="Enter event description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="posterLink">Poster Link</Label>
                <Input
                  id="posterLink"
                  name="posterLink"
                  value={newEvent.posterLink}
                  onChange={handleInputChange}
                  placeholder="Enter poster link"
                />
              </div>
              <Button type="submit" className="w-full">
                Create Event
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative aspect-square h-[50%]">
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
                    <DropdownMenuItem onClick={() => handleEditClick(event)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl mb-2 font-poppins">
                {event.name}
              </CardTitle>
              <time className="text-sm text-muted-foreground mb-2 block font-workSans">
                {format(new Date(event.date), "PPP")}
              </time>
              <p className="text-sm text-muted-foreground font-workSans line-clamp-3">
                {event.description}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => onShowRegistrations(event)}
              >
                Show Registrations
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Update the event details in the form below.
            </DialogDescription>
          </DialogHeader>
          {editingEvent && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Event Name</Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={editingEvent.name}
                  onChange={handleInputChange}
                  placeholder="Enter event name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-date">Event Date</Label>
                <Input
                  id="edit-date"
                  name="date"
                  type="datetime-local"
                  value={editingEvent.date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={editingEvent.description}
                  onChange={handleInputChange}
                  placeholder="Enter event description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-posterLink">Poster Link</Label>
                <Input
                  id="edit-posterLink"
                  name="posterLink"
                  value={editingEvent.posterLink}
                  onChange={handleInputChange}
                  placeholder="Enter poster link"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={!isFormChanged || isUpdating}
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Event"
                )}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
      <AnimatePresence>
        {updateStatus && (
          <Dialog open={true} onOpenChange={() => setUpdateStatus(null)}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {updateStatus === "success" ? "Success" : "Error"}
                </DialogTitle>
              </DialogHeader>
              <div className="flex items-center justify-center p-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {updateStatus === "success" ? (
                    <div className="rounded-full bg-green-100 p-3">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                  ) : (
                    <div className="rounded-full bg-red-100 p-3">
                      <AlertTriangle className="h-8 w-8 text-red-600" />
                    </div>
                  )}
                </motion.div>
              </div>
              <p className="text-center">
                {updateStatus === "success"
                  ? "Event updated successfully!"
                  : "Failed to update event. Please try again."}
              </p>
              <Button onClick={() => setUpdateStatus(null)}>Close</Button>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}

function RegistrationsView({
  event,
  registrations,
  isLoading,
  error,
  onBack,
}: {
  event: Event;
  registrations: EventRegistration[];
  isLoading: boolean;
  error: string | null;
  onBack: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {event.name} - Registrations
          </h2>
          <p className="text-muted-foreground mt-1">
            {format(new Date(event.date), "PPP")}
          </p>
        </div>
        <Button variant="outline" onClick={onBack} className="mt-4 sm:mt-0">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>
      </div>
      <Card>
        {isLoading ? (
          <div className="p-4 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
            <p className="mt-2">Loading registrations...</p>
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">{error}</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone Number</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrations && registrations.length > 0 ? (
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
        )}
      </Card>
    </div>
  );
}

function StartupsView({
  onSelectStartup,
}: {
  onSelectStartup: (startup: StartupProfile) => void;
}) {
  const [startups, setStartups] = React.useState<StartupProfile[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState("pending");

  React.useEffect(() => {
    fetchStartups();
  }, []);

  const fetchStartups = async () => {
    try {
      const response = await fetch(
        "        `${import.meta.env.VITE_API_URL}/startups`"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch startups");
      }
      const data = await response.json();
      console.log(data);
      setStartups(data);
    } catch (error) {
      console.error("Error fetching startups:", error);
      setError("Failed to fetch startups. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (startupId: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/startups/approve/${startupId}`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to approve startup");
      }
      fetchStartups(); // Refresh the list after approval
    } catch (error) {
      console.error("Error approving startup:", error);
      setError("Failed to approve startup. Please try again later.");
    }
  };

  const handleReject = async (startupId: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/startups/reject/${startupId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to reject startup");
      }
      fetchStartups(); // Refresh the list after rejection
    } catch (error) {
      console.error("Error rejecting startup:", error);
      setError("Failed to reject startup. Please try again later.");
    }
  };

  const filteredStartups = startups.filter((startup) =>
    activeTab === "pending" ? !startup.isApproved : startup.isApproved
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Startups</h2>
        <div className="space-x-2">
          <Button
            variant={activeTab === "pending" ? "default" : "outline"}
            onClick={() => setActiveTab("pending")}
          >
            Pending Startups
          </Button>
          <Button
            variant={activeTab === "approved" ? "default" : "outline"}
            onClick={() => setActiveTab("approved")}
          >
            Approved Startups
          </Button>
        </div>
      </div>
      {isLoading ? (
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p>Loading startups...</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Startup Name</TableHead>
                <TableHead>Entity Name</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Details</TableHead>
                {activeTab === "pending" && <TableHead>Action</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStartups.map((startup) => (
                <TableRow key={startup.user_id}>
                  <TableCell className="font-medium">{startup.name}</TableCell>
                  <TableCell>{startup.entity_name}</TableCell>
                  <TableCell>{startup.sector}</TableCell>
                  <TableCell>{startup.year}</TableCell>
                  <TableCell>{startup.size}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => onSelectStartup(startup)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                  {activeTab === "pending" && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => handleApprove(startup.user_id)}
                          >
                            <Check className="mr-2 h-4 w-4" /> Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleReject(startup.user_id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Reject
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" /> Suggestion
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}

function StartupDetailsView({
  startup,
  onBack,
}: {
  startup: StartupProfile;
  onBack: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Startups
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">{startup.name}</h2>
      </div>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="registration">Registration</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="founders">Founders</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Startup Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 font-poppins">
                <div>
                  <Label className="font-bold">Entity Name</Label>
                  <p className="text-md font-light">{startup.entity_name}</p>
                </div>
                <div>
                  <Label className="font-bold">Sector</Label>
                  <p className="text-md font-light">{startup.sector}</p>
                </div>
                <div>
                  <Label className="font-bold">Categories</Label>
                  <p className="text-md font-light">{startup.categories}</p>
                </div>
                <div>
                  <Label className="font-bold">Year</Label>
                  <p className="text-md font-light">{startup.year}</p>
                </div>
                <div>
                  <Label className="font-bold">Brand Name</Label>
                  <p className="text-md font-light">
                    {startup.brand_name || "N/A"}
                  </p>
                </div>
                <div>
                  <Label className="font-bold">
                    Entity Registration Status
                  </Label>
                  <Badge
                    variant={
                      startup.entityRegistrationStatus ? "default" : "secondary"
                    }
                    className="ml-3 bg-sky-600"
                  >
                    {startup.entityRegistrationStatus
                      ? "Registered"
                      : "Not Registered"}
                  </Badge>
                </div>
                <div>
                  <Label className="font-bold">Stage</Label>
                  <p className="text-md font-light">{startup.stage || "N/A"}</p>
                </div>
                <div>
                  <Label className="font-bold">Size</Label>
                  <p className="text-md font-light">{startup.size}</p>
                </div>
                <div>
                  <Label className="font-bold">Incubation Status</Label>
                  <Badge
                    variant={
                      startup.incubation_status ? "default" : "secondary"
                    }
                    className="ml-3 bg-sky-600"
                  >
                    {startup.incubation_status ? "Incubated" : "Not Incubated"}
                  </Badge>
                </div>
                <div>
                  <Label className="font-bold">Approval Status</Label>
                  <Badge
                    variant={startup.isApproved ? "default" : "secondary"}
                    className="ml-3 bg-orange-200"
                  >
                    {startup.isApproved ? "Approved" : "Pending"}
                  </Badge>
                </div>
                <div>
                  <Label className="font-bold">
                    Startup India Registration
                  </Label>
                  <Badge
                    variant={
                      startup.startupIndiaRegister ? "default" : "secondary"
                    }
                    className="ml-3 bg-sky-600"
                  >
                    {startup.startupIndiaRegister
                      ? "Registered"
                      : "Not Registered"}
                  </Badge>
                </div>
              </div>
              {startup.detailsText && (
                <div className="mt-4 ">
                  <Label className="font-bold">Additional Details</Label>
                  <p className="text-sm text-muted-foreground">
                    {startup.detailsText}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="registration">
          <Card>
            <CardHeader>
              <CardTitle>Registration Details</CardTitle>
            </CardHeader>
            <CardContent>
              {startup.registrations ? (
                <div className="grid grid-cols-2 gap-4 font-poppins">
                  <div>
                    <Label className="font-bold">Registration Number</Label>
                    <p className="text-md font-light">
                      {startup.registrations.reg_number}
                    </p>
                  </div>
                  <div>
                    <Label className="font-bold">Registration Date</Label>
                    <p className="text-md font-light">
                      {format(new Date(startup.registrations.reg_date), "PPP")}
                    </p>
                  </div>
                  <div>
                    <Label className="font-bold">GST Number</Label>
                    <p className="text-md font-light">
                      {startup.registrations.gst}
                    </p>
                  </div>
                  <div>
                    <Label className="font-bold">IPR Status</Label>
                    <Badge
                      variant={
                        startup.registrations.ipr ? "default" : "secondary"
                      }
                      className="ml-3 bg-orange-200"
                    >
                      {startup.registrations.ipr ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    <Label className="font-bold">
                      Registration Certificate
                    </Label>
                    <Button variant="outline" className="mt-2 ml-3">
                      <FileText className="mr-2 h-4 w-4" />
                      View Certificate
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No registration details available.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="address">
          <Card>
            <CardHeader>
              <CardTitle>Registered Addresses</CardTitle>
            </CardHeader>
            <CardContent>
              {startup.addresses.length > 0 ? (
                <div className="grid gap-6">
                  {startup.addresses.map((address) => (
                    <div
                      key={address.addr_id}
                      className="flex items-start space-x-4 font-poppins"
                    >
                      <MapPin className="h-5 w-5 mt-1 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{address.addrLine1}</p>
                        <p className="text-sm text-muted-foreground">
                          {address.addLine2}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {address.city}, {address.district}, {address.state} -{" "}
                          {address.pincode}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No registered addresses available.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="founders">
          <Card>
            <CardHeader>
              <CardTitle>Founders</CardTitle>
            </CardHeader>
            <CardContent>
              {startup.founders.length > 0 ? (
                <div className="grid gap-6">
                  {startup.founders.map((founder) => (
                    <div
                      key={founder.founderid}
                      className="flex items-start space-x-4 font-poppins"
                    >
                      <Avatar>
                        <AvatarFallback>{founder.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{founder.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {founder.designation}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {founder.email}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Equity: {founder.equity}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No founder information available.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              {startup.documents ? (
                <div className="grid gap-4 font-poppins">
                  <div>
                    <Label className="font-bold">Pitch Deck</Label>
                    <Button variant="outline" className="mt-2 ml-3">
                      <FileText className="mr-2 h-4 w-4" />
                      View Pitch Deck
                    </Button>
                  </div>
                  <div>
                    <Label className="font-bold">Aadhar Number</Label>
                    <p className="text-md font-light">
                      {startup.documents.Aadhar_Number}
                    </p>
                  </div>
                  <div>
                    <Label className="font-bold">PAN Number</Label>
                    <p className="text-md font-light">
                      {startup.documents.Pan_Number}
                    </p>
                  </div>
                  <div>
                    <Label className="font-bold">
                      Registration Certificate
                    </Label>
                    <Button variant="outline" className="mt-2 ml-3">
                      <FileText className="mr-2 h-4 w-4" />
                      View Certificate
                    </Button>
                  </div>
                  <div>
                    <Label className="font-bold">DIPP Number</Label>
                    <p className="text-md font-light">
                      {startup.documents.Dipp_number}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">No documents available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
