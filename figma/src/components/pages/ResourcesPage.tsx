import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { FileText, Download, ExternalLink, Video, Book, Code, Folder, Clock } from "lucide-react";

const resources = [
  {
    id: 1,
    title: "Startup Fundraising Guide 2025",
    type: "Document",
    category: "Fundraising",
    description: "Comprehensive guide to raising seed and Series A funding",
    format: "PDF",
    size: "2.4 MB",
    downloads: 145,
    date: "Nov 28, 2025",
    icon: FileText
  },
  {
    id: 2,
    title: "Product-Market Fit Framework",
    type: "Template",
    category: "Product",
    description: "Step-by-step framework for validating product-market fit",
    format: "Google Sheets",
    size: "1.1 MB",
    downloads: 203,
    date: "Nov 25, 2025",
    icon: FileText
  },
  {
    id: 3,
    title: "Pitch Deck Masterclass",
    type: "Video",
    category: "Pitching",
    description: "Learn how to create compelling investor presentations",
    format: "MP4",
    size: "156 MB",
    downloads: 98,
    date: "Nov 20, 2025",
    icon: Video
  },
  {
    id: 4,
    title: "Financial Modeling Template",
    type: "Template",
    category: "Finance",
    description: "3-year financial projection model for SaaS startups",
    format: "Excel",
    size: "3.8 MB",
    downloads: 187,
    date: "Nov 15, 2025",
    icon: FileText
  },
  {
    id: 5,
    title: "Growth Hacking Playbook",
    type: "Document",
    category: "Marketing",
    description: "Proven strategies for rapid customer acquisition",
    format: "PDF",
    size: "5.2 MB",
    downloads: 221,
    date: "Nov 10, 2025",
    icon: Book
  },
  {
    id: 6,
    title: "Technical Co-Founder Agreement",
    type: "Legal",
    category: "Legal",
    description: "Standard agreement template for co-founder equity splits",
    format: "DOCX",
    size: "425 KB",
    downloads: 76,
    date: "Nov 5, 2025",
    icon: FileText
  },
  {
    id: 7,
    title: "User Research Best Practices",
    type: "Video",
    category: "Product",
    description: "Conducting effective user interviews and usability tests",
    format: "MP4",
    size: "89 MB",
    downloads: 112,
    date: "Oct 30, 2025",
    icon: Video
  },
  {
    id: 8,
    title: "API Integration Boilerplate",
    type: "Code",
    category: "Technical",
    description: "Ready-to-use code snippets for common API integrations",
    format: "GitHub",
    size: "N/A",
    downloads: 54,
    date: "Oct 25, 2025",
    icon: Code
  }
];

const folders = [
  { name: "Legal Templates", count: 12, color: "blue" },
  { name: "Marketing Assets", count: 28, color: "orange" },
  { name: "Technical Resources", count: 15, color: "blue" },
  { name: "Video Library", count: 34, color: "orange" },
];

export function ResourcesPage() {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Fundraising": "bg-blue-50 text-blue-700 border-blue-200",
      "Product": "bg-orange-50 text-orange-700 border-orange-200",
      "Pitching": "bg-purple-50 text-purple-700 border-purple-200",
      "Finance": "bg-green-50 text-green-700 border-green-200",
      "Marketing": "bg-pink-50 text-pink-700 border-pink-200",
      "Legal": "bg-gray-50 text-gray-700 border-gray-200",
      "Technical": "bg-indigo-50 text-indigo-700 border-indigo-200",
    };
    return colors[category] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-gray-900 mb-1">Resource Library</h1>
        <p className="text-sm text-gray-600">
          Access templates, guides, and learning materials
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {folders.map((folder, idx) => (
          <Card key={idx} className="border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 ${folder.color === 'blue' ? 'bg-blue-50' : 'bg-orange-50'} rounded-lg`}>
                  <Folder size={20} className={folder.color === 'blue' ? 'text-blue-600' : 'text-orange-600'} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{folder.name}</p>
                  <p className="text-xs text-gray-500">{folder.count} files</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="bg-white border">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <Card key={resource.id} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <Icon size={24} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-gray-900 mb-1">{resource.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className={getCategoryColor(resource.category)}>
                              {resource.category}
                            </Badge>
                            <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                              {resource.format}
                            </Badge>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{resource.size}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Download size={12} />
                              {resource.downloads} downloads
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Download size={14} className="mr-1" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-300">
                            <ExternalLink size={14} />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock size={12} />
                        Added {resource.date}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="documents">
          <p className="text-sm text-gray-600">Showing documents only</p>
        </TabsContent>
        <TabsContent value="videos">
          <p className="text-sm text-gray-600">Showing videos only</p>
        </TabsContent>
        <TabsContent value="templates">
          <p className="text-sm text-gray-600">Showing templates only</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
