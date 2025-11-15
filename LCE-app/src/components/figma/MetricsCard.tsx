import { Card, CardContent } from "./ui/card";
import { LucideIcon } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
}

export function MetricsCard({ title, value, change, trend, icon: Icon }: MetricsCardProps) {
  const trendColor = trend === "up" ? "text-blue-600" : trend === "down" ? "text-orange-600" : "text-gray-600";
  
  return (
    <Card className="border-gray-200 bg-white">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-gray-900 mb-2">{value}</p>
            <p className={`text-xs ${trendColor}`}>{change}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <Icon size={20} className="text-blue-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
