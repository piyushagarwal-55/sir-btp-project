import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Calendar, MapPin, Users, Clock, Video, CheckCircle } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Q4 2025 Demo Day",
    type: "Demo Day",
    date: "Dec 15, 2025",
    time: "2:00 PM - 6:00 PM EST",
    location: "Main Auditorium",
    format: "In-Person",
    attendees: 150,
    registered: 142,
    status: "upcoming",
    description: "Quarterly showcase where startups present their progress to investors and partners.",
    spots: 8
  },
  {
    id: 2,
    title: "Fundraising Masterclass",
    type: "Workshop",
    date: "Dec 8, 2025",
    time: "10:00 AM - 12:00 PM EST",
    location: "Online",
    format: "Virtual",
    attendees: 50,
    registered: 45,
    status: "upcoming",
    description: "Learn the fundamentals of raising capital with top VC partners.",
    spots: 5
  },
  {
    id: 3,
    title: "Networking Mixer",
    type: "Networking",
    date: "Dec 6, 2025",
    time: "6:00 PM - 9:00 PM EST",
    location: "Innovation Hub",
    format: "In-Person",
    attendees: 80,
    registered: 73,
    status: "upcoming",
    description: "Connect with fellow founders, mentors, and industry professionals.",
    spots: 7
  },
  {
    id: 4,
    title: "Product Design Sprint",
    type: "Workshop",
    date: "Nov 28, 2025",
    time: "9:00 AM - 5:00 PM EST",
    location: "Design Studio",
    format: "In-Person",
    attendees: 30,
    registered: 30,
    status: "completed",
    description: "Intensive workshop on rapid product prototyping and user testing.",
    spots: 0
  },
  {
    id: 5,
    title: "AI in Business Seminar",
    type: "Seminar",
    date: "Dec 12, 2025",
    time: "3:00 PM - 5:00 PM EST",
    location: "Online",
    format: "Virtual",
    attendees: 100,
    registered: 67,
    status: "upcoming",
    description: "Exploring practical applications of AI in modern business operations.",
    spots: 33
  },
  {
    id: 6,
    title: "Mentor Office Hours",
    type: "Office Hours",
    date: "Dec 10, 2025",
    time: "1:00 PM - 4:00 PM EST",
    location: "Meeting Rooms",
    format: "Hybrid",
    attendees: 40,
    registered: 35,
    status: "upcoming",
    description: "One-on-one sessions with mentors. Book your slot in advance.",
    spots: 5
  }
];

export function EventsPage() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Demo Day": return "bg-blue-50 text-blue-700 border-blue-200";
      case "Workshop": return "bg-orange-50 text-orange-700 border-orange-200";
      case "Networking": return "bg-purple-50 text-purple-700 border-purple-200";
      case "Seminar": return "bg-green-50 text-green-700 border-green-200";
      case "Office Hours": return "bg-gray-50 text-gray-700 border-gray-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "upcoming" 
      ? "bg-blue-50 text-blue-700 border-blue-200" 
      : "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-gray-900 mb-1">Events & Programs</h1>
        <p className="text-sm text-gray-600">
          Upcoming workshops, networking events, and demo days
        </p>
      </div>

      <Tabs defaultValue="upcoming" className="mb-6">
        <TabsList className="bg-white border">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
          <TabsTrigger value="workshops">Workshops</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 gap-6">
            {events.filter(e => e.status === "upcoming").map((event) => (
              <Card key={event.id} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader className="border-b bg-gray-50/50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-gray-900">{event.title}</CardTitle>
                        <Badge variant="outline" className={getTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{event.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar size={16} className="text-blue-600" />
                        <span className="text-gray-600">Date:</span>
                        <span className="text-gray-900">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock size={16} className="text-blue-600" />
                        <span className="text-gray-600">Time:</span>
                        <span className="text-gray-900">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin size={16} className="text-blue-600" />
                        <span className="text-gray-600">Location:</span>
                        <span className="text-gray-900">{event.location}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Video size={16} className="text-orange-600" />
                        <span className="text-gray-600">Format:</span>
                        <span className="text-gray-900">{event.format}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users size={16} className="text-orange-600" />
                        <span className="text-gray-600">Capacity:</span>
                        <span className="text-gray-900">{event.attendees} attendees</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle size={16} className="text-orange-600" />
                        <span className="text-gray-600">Registered:</span>
                        <span className="text-gray-900">{event.registered}/{event.attendees}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 mb-4">
                    <p className="text-sm text-blue-700">
                      {event.spots} spots remaining
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                      Register Now
                    </Button>
                    <Button variant="outline" className="border-gray-300 text-gray-700">
                      Add to Calendar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="past">
          <div className="grid grid-cols-1 gap-6">
            {events.filter(e => e.status === "completed").map((event) => (
              <Card key={event.id} className="border-gray-200">
                <CardHeader className="border-b bg-gray-50/50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-gray-900">{event.title}</CardTitle>
                        <Badge variant="outline" className={getTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                          Completed
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{event.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-600 mb-3">
                    <Calendar size={14} className="inline mr-2" />
                    {event.date} • {event.time}
                  </p>
                  <Button variant="outline" className="border-gray-300 text-gray-700">
                    View Recording
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workshops">
          <p className="text-sm text-gray-600">Showing workshops only</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
