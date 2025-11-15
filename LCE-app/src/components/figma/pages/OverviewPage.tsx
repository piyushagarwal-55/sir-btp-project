import { Building2, DollarSign, Users, Target } from "lucide-react";
import { MetricsCard } from "../MetricsCard";
import { StartupsTable } from "../StartupsTable";
import { AnalyticsChart } from "../AnalyticsChart";
import { RecentActivity } from "../RecentActivity";

export function OverviewPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-gray-900 mb-1">Dashboard Overview</h1>
        <p className="text-sm text-gray-600">
          Track your portfolio performance and key metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricsCard
          title="Total Startups"
          value="24"
          change="+3 this month"
          trend="up"
          icon={Building2}
        />
        <MetricsCard
          title="Total Funding"
          value="$18.5M"
          change="+$2.5M this quarter"
          trend="up"
          icon={DollarSign}
        />
        <MetricsCard
          title="Active Mentors"
          value="42"
          change="+5 this month"
          trend="up"
          icon={Users}
        />
        <MetricsCard
          title="Avg. Completion"
          value="76%"
          change="+8% from last month"
          trend="up"
          icon={Target}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <AnalyticsChart />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>

      <StartupsTable />
    </div>
  );
}
