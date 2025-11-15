import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Mail, Linkedin, Calendar, Star, Users, Award } from "lucide-react";

const mentors = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    title: "AI & Machine Learning Expert",
    expertise: ["AI/ML", "Product Strategy", "Fundraising"],
    rating: 4.9,
    sessions: 45,
    startups: 8,
    availability: "Available",
    bio: "Former VP of AI at Google, 15+ years in tech. Specialized in helping AI startups scale.",
    linkedin: "linkedin.com/in/sarahmitchell",
    email: "sarah.mitchell@incubator.com",
    nextAvailable: "Dec 10, 2025"
  },
  {
    id: 2,
    name: "Marcus Chen",
    title: "Startup Growth Strategist",
    expertise: ["Growth", "Marketing", "SaaS"],
    rating: 4.8,
    sessions: 62,
    startups: 12,
    availability: "Available",
    bio: "Built and exited 2 SaaS companies. Expert in growth hacking and customer acquisition.",
    linkedin: "linkedin.com/in/marcuschen",
    email: "marcus.chen@incubator.com",
    nextAvailable: "Dec 8, 2025"
  },
  {
    id: 3,
    name: "Jennifer Rodriguez",
    title: "FinTech Advisor",
    expertise: ["FinTech", "Compliance", "B2B Sales"],
    rating: 5.0,
    sessions: 38,
    startups: 6,
    availability: "Busy",
    bio: "Former Goldman Sachs exec. Specialized in financial technology and regulatory compliance.",
    linkedin: "linkedin.com/in/jrodriguez",
    email: "jennifer.rodriguez@incubator.com",
    nextAvailable: "Dec 20, 2025"
  },
  {
    id: 4,
    name: "David Park",
    title: "Product & Design Leader",
    expertise: ["UX/UI", "Product Management", "Design Thinking"],
    rating: 4.7,
    sessions: 51,
    startups: 10,
    availability: "Available",
    bio: "Led product design at Airbnb. Passionate about user-centric product development.",
    linkedin: "linkedin.com/in/davidpark",
    email: "david.park@incubator.com",
    nextAvailable: "Dec 12, 2025"
  },
  {
    id: 5,
    name: "Amara Okafor",
    title: "Healthcare Innovation Expert",
    expertise: ["HealthTech", "Clinical Trials", "Regulatory"],
    rating: 4.9,
    sessions: 29,
    startups: 5,
    availability: "Available",
    bio: "MD with 20 years in healthcare innovation. Helped launch 3 successful health tech startups.",
    linkedin: "linkedin.com/in/amaraokafor",
    email: "amara.okafor@incubator.com",
    nextAvailable: "Dec 9, 2025"
  },
  {
    id: 6,
    name: "Ryan Thompson",
    title: "Venture Capital Partner",
    expertise: ["Fundraising", "Pitching", "Financial Modeling"],
    rating: 4.8,
    sessions: 57,
    startups: 14,
    availability: "Available",
    bio: "Partner at Sequoia Capital. Expert in helping startups prepare for Series A and beyond.",
    linkedin: "linkedin.com/in/ryanthompson",
    email: "ryan.thompson@incubator.com",
    nextAvailable: "Dec 11, 2025"
  }
];

export function MentorsPage() {
  const getAvailabilityColor = (availability: string) => {
    return availability === "Available" 
      ? "bg-blue-50 text-blue-700 border-blue-200" 
      : "bg-orange-50 text-orange-700 border-orange-200";
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-gray-900 mb-1">Mentor Network</h1>
        <p className="text-sm text-gray-600">
          Connect with industry experts and advisors
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="bg-white border">
          <TabsTrigger value="all">All Mentors</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="top">Top Rated</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader className="border-b bg-gray-50/50">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <CardTitle className="text-gray-900">{mentor.name}</CardTitle>
                        <Badge variant="outline" className={getAvailabilityColor(mentor.availability)}>
                          {mentor.availability}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{mentor.title}</p>
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-orange-500 fill-orange-500" />
                        <span className="text-sm text-gray-900">{mentor.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({mentor.sessions} sessions)</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-600 mb-4">{mentor.bio}</p>
                  
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Expertise</p>
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-2 mb-1">
                        <Users size={14} className="text-blue-600" />
                        <p className="text-xs text-blue-600">Startups Mentored</p>
                      </div>
                      <p className="text-gray-900">{mentor.startups}</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                      <div className="flex items-center gap-2 mb-1">
                        <Award size={14} className="text-orange-600" />
                        <p className="text-xs text-orange-600">Total Sessions</p>
                      </div>
                      <p className="text-gray-900">{mentor.sessions}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Calendar size={16} className="text-gray-400" />
                    <span>Next available: {mentor.nextAvailable}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                      <Calendar size={16} className="mr-2" />
                      Book Session
                    </Button>
                    <Button variant="outline" size="icon" className="border-gray-300">
                      <Mail size={16} className="text-gray-600" />
                    </Button>
                    <Button variant="outline" size="icon" className="border-gray-300">
                      <Linkedin size={16} className="text-gray-600" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="available">
          <p className="text-sm text-gray-600">Showing available mentors only</p>
        </TabsContent>
        <TabsContent value="top">
          <p className="text-sm text-gray-600">Showing top-rated mentors</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
