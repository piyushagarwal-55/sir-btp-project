import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, FileText, Users, Calendar } from "lucide-react";

const activities = [
  {
    id: 1,
    icon: TrendingUp,
    title: "TechFlow AI raised $2.5M",
    description: "Series A funding round completed",
    time: "2 hours ago",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    id: 2,
    icon: FileText,
    title: "New pitch deck submitted",
    description: "EcoTrack submitted Q4 presentation",
    time: "5 hours ago",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600"
  },
  {
    id: 3,
    icon: Users,
    title: "Mentor session scheduled",
    description: "HealthBridge with Sarah Johnson",
    time: "Yesterday",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    id: 4,
    icon: Calendar,
    title: "Demo Day announced",
    description: "Q4 2025 Demo Day - Dec 15",
    time: "2 days ago",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600"
  },
];

export function RecentActivity() {
  return (
    <Card className="border-gray-200">
      <CardHeader className="border-b bg-gray-50/50">
        <CardTitle className="text-gray-900">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex gap-3">
                  <div className={`${activity.iconBg} p-2 rounded-lg h-fit`}>
                    <Icon size={16} className={activity.iconColor} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 mb-1">{activity.title}</p>
                    <p className="text-xs text-gray-500 mb-1">{activity.description}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
