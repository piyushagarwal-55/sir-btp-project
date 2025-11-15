"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Event {
  id: string;
  name: string;
  date: string;
  description: string;
  posterLink: string;
}

const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await fetch(
      "      `${import.meta.env.VITE_API_URL}/events`"
    );
    if (!response.ok) throw new Error("Failed to fetch events");
    return await response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

const EventCard: React.FC<{ event: Event; onRegister: () => void }> = ({
  event,
  onRegister,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100"
    >
      {event.posterLink && (
        <img
          src={event.posterLink}
          alt={`${event.name} Poster`}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-blue-600">{event.name}</h3>
        <p className="text-gray-600 mb-4">{event.description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar className="w-4 h-4 mr-2 text-blue-400" />
          {formatDate(event.date)}
        </div>
        <Button
          className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-300"
          onClick={onRegister}
        >
          Register Now
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

const RegistrationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, email: string, number: string) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const isFormValid =
    name.trim() !== "" && email.trim() !== "" && number.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(name, email, number);
      setName("");
      setEmail("");
      setNumber("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register for Event</DialogTitle>
          <DialogDescription>
            Please fill in your details to register for this event.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="flex flex-col">
              <Label htmlFor="name" className="pb-2">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="email" className="pb-2">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="number" className="pb-2">
                Phone
              </Label>
              <Input
                id="number"
                type="tel"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!isFormValid}>
              Register
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetchEvents().then((data) => {
      setEvents(data);
      setFilteredEvents(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const filtered = events.filter(
      (event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  const handleRegister = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleRegistrationSubmit = async (
    name: string,
    email: string,
    number: string
  ) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/event-registrations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventId: selectedEvent?.id,
            name,
            email,
            number,
          }),
        }
      );

      if (response.ok) {
        toast({
          title: "Registration Successful",
          description: "You have successfully registered for the event.",
          duration: 5000,
        });
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Error registering for event:", error);
      toast({
        title: "Registration Failed",
        description:
          "There was an error registering for the event. Please try again.",
        duration: 5000,
        variant: "destructive",
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-blue-600 mb-4">
            Explore the Future
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join us at the forefront of innovation. Our events bring together
            visionaries, entrepreneurs, and industry leaders to shape tomorrow's
            technologies.
          </p>
          <div className="relative max-w-md mx-auto">
            <Input
              className="pl-10 pr-4 py-3 rounded-full border-2 border-blue-200 focus:border-blue-400 transition-colors duration-300"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center text-2xl text-gray-600">
            Loading events...
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRegister={() => handleRegister(event)}
                />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleRegistrationSubmit}
      />
    </div>
  );
};

export default Events;
