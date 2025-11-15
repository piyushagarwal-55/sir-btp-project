import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";

interface Startup {
  id: number;
  name: string;
  founder: string;
  stage: string;
  funding: string;
  progress: number;
  status: "active" | "review" | "exited";
}

const startups: Startup[] = [
  { id: 1, name: "TechFlow AI", founder: "Alex Chen", stage: "Series A", funding: "$2.5M", progress: 78, status: "active" },
  { id: 2, name: "HealthBridge", founder: "Maya Patel", stage: "Seed", funding: "$800K", progress: 92, status: "active" },
  { id: 3, name: "EcoTrack", founder: "James Wilson", stage: "Pre-seed", funding: "$250K", progress: 45, status: "review" },
  { id: 4, name: "FinanceOS", founder: "Lisa Wang", stage: "Series A", funding: "$3.2M", progress: 88, status: "active" },
  { id: 5, name: "DataSync Pro", founder: "Ryan Kumar", stage: "Seed", funding: "$1.1M", progress: 65, status: "active" },
  { id: 6, name: "CloudNest", founder: "Emma Davis", stage: "Exited", funding: "$5M", progress: 100, status: "exited" },
];

export function StartupsTable() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-blue-50 text-blue-700 border-blue-200";
      case "review": return "bg-orange-50 text-orange-700 border-orange-200";
      case "exited": return "bg-gray-50 text-gray-700 border-gray-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <Card className="border-gray-200">
      <CardHeader className="border-b bg-gray-50/50">
        <CardTitle className="text-gray-900">Portfolio Companies</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Company</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Stage</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Funding</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Progress</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {startups.map((startup) => (
                <tr key={startup.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                          {startup.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm text-gray-900">{startup.name}</p>
                        <p className="text-xs text-gray-500">{startup.founder}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{startup.stage}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{startup.funding}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Progress value={startup.progress} className="h-2 w-24" />
                      <span className="text-xs text-gray-600">{startup.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={getStatusColor(startup.status)}>
                      {startup.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal size={16} className="text-gray-400" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
