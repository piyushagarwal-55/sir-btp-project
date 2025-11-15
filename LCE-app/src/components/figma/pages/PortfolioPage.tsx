import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Building2, TrendingUp, Users, Globe, Mail, Phone, MapPin, Calendar } from "lucide-react";

const portfolioData = [
  {
    id: 1,
    name: "TechFlow AI",
    founder: "Alex Chen",
    category: "AI/ML",
    stage: "Series A",
    funding: "$2.5M",
    progress: 78,
    status: "active",
    website: "techflow.ai",
    email: "alex@techflow.ai",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    founded: "Jan 2024",
    description: "AI-powered workflow automation platform for enterprise teams",
    team: 12,
    mrr: "$45K",
    growth: "+28%"
  },
  {
    id: 2,
    name: "HealthBridge",
    founder: "Maya Patel",
    category: "HealthTech",
    stage: "Seed",
    funding: "$800K",
    progress: 92,
    status: "active",
    website: "healthbridge.com",
    email: "maya@healthbridge.com",
    phone: "+1 (555) 234-5678",
    location: "Boston, MA",
    founded: "Mar 2024",
    description: "Connecting patients with healthcare providers through telemedicine",
    team: 8,
    mrr: "$32K",
    growth: "+42%"
  },
  {
    id: 3,
    name: "EcoTrack",
    founder: "James Wilson",
    category: "CleanTech",
    stage: "Pre-seed",
    funding: "$250K",
    progress: 45,
    status: "review",
    website: "ecotrack.io",
    email: "james@ecotrack.io",
    phone: "+1 (555) 345-6789",
    location: "Portland, OR",
    founded: "Jun 2024",
    description: "Carbon footprint tracking and sustainability analytics",
    team: 5,
    mrr: "$8K",
    growth: "+15%"
  },
  {
    id: 4,
    name: "FinanceOS",
    founder: "Lisa Wang",
    category: "FinTech",
    stage: "Series A",
    funding: "$3.2M",
    progress: 88,
    status: "active",
    website: "financeos.com",
    email: "lisa@financeos.com",
    phone: "+1 (555) 456-7890",
    location: "New York, NY",
    founded: "Sep 2023",
    description: "Modern financial operations platform for growing businesses",
    team: 15,
    mrr: "$78K",
    growth: "+35%"
  },
];

export function PortfolioPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-blue-50 text-blue-700 border-blue-200";
      case "review": return "bg-orange-50 text-orange-700 border-orange-200";
      case "exited": return "bg-gray-50 text-gray-700 border-gray-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-gray-900 mb-1">Portfolio Companies</h1>
        <p className="text-sm text-gray-600">
          Manage and track all your portfolio startups
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="bg-white border">
          <TabsTrigger value="all">All Companies</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="review">In Review</TabsTrigger>
          <TabsTrigger value="exited">Exited</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {portfolioData.map((company) => (
              <Card key={company.id} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader className="border-b bg-gray-50/50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-blue-100 text-blue-700">
                          {company.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-gray-900">{company.name}</CardTitle>
                        <p className="text-xs text-gray-500">{company.category}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={getStatusColor(company.status)}>
                      {company.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-600 mb-4">{company.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Users size={16} className="text-gray-400" />
                      <span className="text-gray-600">Founder:</span>
                      <span className="text-gray-900">{company.founder}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-gray-600">Founded:</span>
                      <span className="text-gray-900">{company.founded}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin size={16} className="text-gray-400" />
                      <span className="text-gray-600">Location:</span>
                      <span className="text-gray-900">{company.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Globe size={16} className="text-gray-400" />
                      <span className="text-gray-600">Website:</span>
                      <span className="text-blue-600">{company.website}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 p-3 bg-gray-50 rounded-lg mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Stage</p>
                      <p className="text-sm text-gray-900">{company.stage}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Funding</p>
                      <p className="text-sm text-gray-900">{company.funding}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Team Size</p>
                      <p className="text-sm text-gray-900">{company.team}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-xs text-blue-600 mb-1">MRR</p>
                      <p className="text-gray-900">{company.mrr}</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                      <p className="text-xs text-orange-600 mb-1">Growth</p>
                      <p className="text-gray-900">{company.growth}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Program Progress</span>
                      <span className="text-sm text-gray-900">{company.progress}%</span>
                    </div>
                    <Progress value={company.progress} className="h-2" />
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active">
          <p className="text-sm text-gray-600">Showing active companies only</p>
        </TabsContent>
        <TabsContent value="review">
          <p className="text-sm text-gray-600">Showing companies in review</p>
        </TabsContent>
        <TabsContent value="exited">
          <p className="text-sm text-gray-600">Showing exited companies</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
