import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddTeacherForm } from "@/components/staff/AddTeacherForm";
import { Plus, Search, Edit, Trash2, Mail, Phone } from "lucide-react";

interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  qualification: string;
  experience: string;
  phone: string;
  status: "active" | "inactive";
  joinDate: string;
}

export default function Staff() {
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: "1",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@school.edu",
      subject: "Mathematics",
      qualification: "M.Sc Mathematics, B.Ed",
      experience: "8",
      phone: "+1-555-0123",
      status: "active",
      joinDate: "2020-08-15"
    },
    {
      id: "2",
      firstName: "Michael",
      lastName: "Chen",
      email: "michael.chen@school.edu",
      subject: "Physics",
      qualification: "Ph.D Physics",
      experience: "12",
      phone: "+1-555-0456",
      status: "active",
      joinDate: "2018-01-10"
    },
    {
      id: "3",
      firstName: "Emily",
      lastName: "Davis",
      email: "emily.davis@school.edu",
      subject: "English",
      qualification: "M.A English Literature",
      experience: "5",
      phone: "+1-555-0789",
      status: "active",
      joinDate: "2022-03-20"
    }
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState<{ role: string } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const filteredTeachers = teachers.filter(teacher =>
    `${teacher.firstName} ${teacher.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSuccess = () => {
    setIsAddDialogOpen(false);
    // In a real app, you would refetch the teachers list
  };

  const handleDeleteTeacher = (id: string) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
          <p className="text-muted-foreground">Manage teachers and staff members</p>
        </div>
        {user?.role === "admin" && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Teacher
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Teacher</DialogTitle>
              </DialogHeader>
              <AddTeacherForm 
                onCancel={() => setIsAddDialogOpen(false)}
                onSuccess={handleAddSuccess}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search teachers by name, subject, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-primary">{teachers.length}</h3>
            <p className="text-sm text-muted-foreground">Total Teachers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-green-600">{teachers.filter(t => t.status === "active").length}</h3>
            <p className="text-sm text-muted-foreground">Active Teachers</p>
          </CardContent>
        </Card>
      </div>

      {/* Teachers List */}
      <Card>
        <CardHeader>
          <CardTitle>Teaching Staff ({filteredTeachers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTeachers.map((teacher) => (
              <div key={teacher.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                    {teacher.firstName[0]}{teacher.lastName[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold">{teacher.firstName} {teacher.lastName}</h3>
                    <p className="text-sm text-muted-foreground">{teacher.subject} Teacher</p>
                    <p className="text-sm text-muted-foreground">{teacher.qualification}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-3 w-3" />
                      {teacher.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3" />
                      {teacher.phone}
                    </div>
                    <p className="text-xs text-muted-foreground">Exp: {teacher.experience} years</p>
                  </div>
                  
                  <Badge variant={teacher.status === "active" ? "default" : "secondary"}>
                    {teacher.status}
                  </Badge>
                  
                  {user?.role === "admin" && (
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteTeacher(teacher.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {filteredTeachers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No teachers found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}