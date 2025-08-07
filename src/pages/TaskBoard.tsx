import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Filter, Search } from "lucide-react";

export default function TaskBoard() {
  const mockTasks = [
    {
      id: "001",
      title: "Review Monthly Reports",
      staffName: "John Smith",
      startDate: "2025-01-15",
      status: "In Progress",
      completionDate: "2025-01-20",
      createdBy: "Admin",
      modifiedBy: "Admin",
    },
    {
      id: "002", 
      title: "Prepare Student Assessments",
      staffName: "Sarah Wilson",
      startDate: "2025-01-10",
      status: "Completed",
      completionDate: "2025-01-18",
      createdBy: "Principal",
      modifiedBy: "Sarah Wilson",
    },
    {
      id: "003",
      title: "Update Curriculum Guidelines", 
      staffName: "Michael Brown",
      startDate: "2025-01-12",
      status: "Pending",
      completionDate: "2025-01-25",
      createdBy: "HOD",
      modifiedBy: "HOD",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-success text-success-foreground";
      case "In Progress":
        return "bg-warning text-warning-foreground";
      case "Pending":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Task Board</h1>
          <p className="text-muted-foreground">Manage and track staff tasks</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex gap-4 flex-1">
              <Input
                placeholder="2025-07-01"
                className="max-w-40"
              />
              <Input
                placeholder="2025-07-31"
                className="max-w-40"
              />
              <Button variant="secondary">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Show</span>
              <Select defaultValue="10">
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm">entries</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Tasks</CardTitle>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search tasks..." className="w-64" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-muted-foreground">Task ID</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Staff Name</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Task Title</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Start Date</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Completion Date</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Created By</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Modified By</th>
                </tr>
              </thead>
              <tbody>
                {mockTasks.map((task) => (
                  <tr key={task.id} className="border-b hover:bg-muted/50">
                    <td className="p-3">{task.id}</td>
                    <td className="p-3 font-medium">{task.staffName}</td>
                    <td className="p-3">{task.title}</td>
                    <td className="p-3">{task.startDate}</td>
                    <td className="p-3">
                      <Badge className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                    </td>
                    <td className="p-3">{task.completionDate}</td>
                    <td className="p-3">{task.createdBy}</td>
                    <td className="p-3">{task.modifiedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {mockTasks.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No data available in table
            </div>
          )}

          <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
            <span>Showing 1 to {mockTasks.length} of {mockTasks.length} entries</span>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}