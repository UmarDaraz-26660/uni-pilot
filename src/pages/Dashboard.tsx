import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, DollarSign, Hand } from "lucide-react";

export default function Dashboard() {
  const statsData = [
    {
      title: "STAFF",
      value: "50",
      icon: Users,
      color: "green" as const,
    },
    {
      title: "STUDENTS", 
      value: "587",
      icon: GraduationCap,
      color: "orange" as const,
    },
    {
      title: "PENDING FEES",
      value: "7962190",
      icon: DollarSign,
      color: "blue" as const,
    },
    {
      title: "CASH IN HAND",
      value: "118981",
      icon: Hand,
      color: "red" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Academic ERP System</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Additional Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div>
                  <p className="font-medium">New student registration</p>
                  <p className="text-sm text-muted-foreground">Sarah Johnson joined Class 10-A</p>
                </div>
                <span className="text-sm text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div>
                  <p className="font-medium">Fee payment received</p>
                  <p className="text-sm text-muted-foreground">Monthly fee paid by Michael Chen</p>
                </div>
                <span className="text-sm text-muted-foreground">4 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div>
                  <p className="font-medium">Staff meeting scheduled</p>
                  <p className="text-sm text-muted-foreground">Department meeting on Friday</p>
                </div>
                <span className="text-sm text-muted-foreground">1 day ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 text-center border rounded-lg hover:bg-muted cursor-pointer transition-colors">
                <GraduationCap className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Add Student</p>
              </div>
              <div className="p-4 text-center border rounded-lg hover:bg-muted cursor-pointer transition-colors">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Add Staff</p>
              </div>
              <div className="p-4 text-center border rounded-lg hover:bg-muted cursor-pointer transition-colors">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Record Payment</p>
              </div>
              <div className="p-4 text-center border rounded-lg hover:bg-muted cursor-pointer transition-colors">
                <Hand className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Generate Report</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}