import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload } from "lucide-react";

const reports = [
  { name: "Annual Report", status: "completed" },
  { name: "Quarterly Report Q1", status: "completed" },
  { name: "Quarterly Report Q2", status: "pending" },
  { name: "Quarterly Report Q3", status: "pending" },
  { name: "Quarterly Report Q4", status: "pending" },
  { name: "Financial Statement", status: "completed" },
  { name: "Impact Report", status: "pending" },
];

export function ReportsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports.map((report, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span>{report.name}</span>
              </div>
              {report.status === "completed" ? (
                <Badge variant="default" className="bg-green-500">
                  Completed
                </Badge>
              ) : (
                <Button size="sm" variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Report
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
