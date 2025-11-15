import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", funding: 2.4, startups: 8 },
  { month: "Feb", funding: 3.2, startups: 12 },
  { month: "Mar", funding: 2.8, startups: 10 },
  { month: "Apr", funding: 4.1, startups: 15 },
  { month: "May", funding: 3.9, startups: 14 },
  { month: "Jun", funding: 5.2, startups: 18 },
];

export function AnalyticsChart() {
  return (
    <Card className="border-gray-200">
      <CardHeader className="border-b bg-gray-50/50">
        <CardTitle className="text-gray-900">Funding Trends</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
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
            <Line 
              type="monotone" 
              dataKey="funding" 
              stroke="#2563eb" 
              strokeWidth={2}
              dot={{ fill: '#2563eb', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
