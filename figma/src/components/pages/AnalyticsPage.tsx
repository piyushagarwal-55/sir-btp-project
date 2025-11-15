import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Users, Building2, Target } from "lucide-react";

const fundingData = [
  { month: "Jan", funding: 2.4, startups: 8, growth: 12 },
  { month: "Feb", funding: 3.2, startups: 12, growth: 15 },
  { month: "Mar", funding: 2.8, startups: 10, growth: 10 },
  { month: "Apr", funding: 4.1, startups: 15, growth: 18 },
  { month: "May", funding: 3.9, startups: 14, growth: 16 },
  { month: "Jun", funding: 5.2, startups: 18, growth: 22 },
  { month: "Jul", funding: 4.8, startups: 16, growth: 20 },
  { month: "Aug", funding: 6.1, startups: 20, growth: 25 },
  { month: "Sep", funding: 5.5, startups: 19, growth: 23 },
  { month: "Oct", funding: 7.2, startups: 24, growth: 28 },
  { month: "Nov", funding: 6.8, startups: 22, growth: 26 },
  { month: "Dec", funding: 8.5, startups: 28, growth: 32 },
];

const categoryData = [
  { name: "FinTech", value: 35, color: "#3b82f6" },
  { name: "HealthTech", value: 25, color: "#f97316" },
  { name: "AI/ML", value: 20, color: "#8b5cf6" },
  { name: "CleanTech", value: 12, color: "#10b981" },
  { name: "Other", value: 8, color: "#6b7280" },
];

const stageDistribution = [
  { stage: "Pre-seed", count: 8, funding: 1.2 },
  { stage: "Seed", count: 12, funding: 4.5 },
  { stage: "Series A", count: 6, funding: 12.8 },
  { stage: "Series B+", count: 2, funding: 8.0 },
];

const successMetrics = [
  { metric: "Portfolio Valuation", value: "$125M", change: "+18%", trend: "up", icon: DollarSign },
  { metric: "Active Startups", value: "28", change: "+4 this quarter", trend: "up", icon: Building2 },
  { metric: "Jobs Created", value: "342", change: "+45 this quarter", trend: "up", icon: Users },
  { metric: "Success Rate", value: "78%", change: "+5% YoY", trend: "up", icon: Target },
];

export function AnalyticsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-gray-900 mb-1">Analytics Dashboard</h1>
        <p className="text-sm text-gray-600">
          Track performance metrics and portfolio insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {successMetrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <Card key={idx} className="border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{metric.metric}</p>
                    <p className="text-gray-900 mb-2">{metric.value}</p>
                    <div className="flex items-center gap-1">
                      {metric.trend === "up" ? (
                        <TrendingUp size={14} className="text-blue-600" />
                      ) : (
                        <TrendingDown size={14} className="text-orange-600" />
                      )}
                      <p className={`text-xs ${metric.trend === "up" ? "text-blue-600" : "text-orange-600"}`}>
                        {metric.change}
                      </p>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <Icon size={20} className="text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="funding" className="mb-6">
        <TabsList className="bg-white border">
          <TabsTrigger value="funding">Funding Trends</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio Analysis</TabsTrigger>
          <TabsTrigger value="growth">Growth Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="funding" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-gray-200">
              <CardHeader className="border-b bg-gray-50/50">
                <CardTitle className="text-gray-900">Monthly Funding & Startups</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={fundingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#6b7280" 
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="#6b7280" 
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="funding" 
                      stroke="#3b82f6" 
                      fill="#3b82f6"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader className="border-b bg-gray-50/50">
                <CardTitle className="text-gray-900">Category Distribution</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="border-gray-200">
            <CardHeader className="border-b bg-gray-50/50">
              <CardTitle className="text-gray-900">Funding by Stage</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stageDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="stage" 
                    stroke="#6b7280" 
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#6b7280" 
                    style={{ fontSize: '12px' }}
                    label={{ value: 'Funding ($M)', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: '#6b7280' } }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="funding" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6 mt-6">
          <Card className="border-gray-200">
            <CardHeader className="border-b bg-gray-50/50">
              <CardTitle className="text-gray-900">Startup Count Over Time</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={fundingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6b7280" 
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#6b7280" 
                    style={{ fontSize: '12px' }}
                    label={{ value: 'Number of Startups', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: '#6b7280' } }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="startups" 
                    stroke="#f97316" 
                    strokeWidth={2}
                    dot={{ fill: '#f97316', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="growth" className="space-y-6 mt-6">
          <Card className="border-gray-200">
            <CardHeader className="border-b bg-gray-50/50">
              <CardTitle className="text-gray-900">Growth Rate (%)</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={fundingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6b7280" 
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#6b7280" 
                    style={{ fontSize: '12px' }}
                    label={{ value: 'Growth %', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: '#6b7280' } }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="growth" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
