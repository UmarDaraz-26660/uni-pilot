import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Filter, Search, Copy, FileText } from "lucide-react";

export default function Students() {
  const mockStudents = [
    {
      admissionNo: "244",
      admissionDate: "01-Apr-2015",
      name: "Mushira Ashraf",
      feeVouchers: "Fee Vouchers",
      dateOfBirth: "01-Dec-2011",
      gender: "Female",
      fatherName: "Muhammad Ashraf",
      homePhone: "1",
      fatherMobile: "03037760652",
    },
    {
      admissionNo: "251",
      admissionDate: "06-Apr-2015",
      name: "Rida Fatma",
      feeVouchers: "Fee Vouchers", 
      dateOfBirth: "05-Jan-2011",
      gender: "Female",
      fatherName: "M. Irfan",
      homePhone: "04833702610",
      fatherMobile: "03009057270",
    },
    {
      admissionNo: "261",
      admissionDate: "09-Apr-2015",
      name: "Hamna Maheen",
      feeVouchers: "Fee Vouchers",
      dateOfBirth: "12-Feb-2012",
      gender: "Female", 
      fatherName: "Muhammad Irfan Shahzad",
      homePhone: "1",
      fatherMobile: "03156716461",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">List All Students</h1>
          <p className="text-muted-foreground">Manage student records and information</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            <div className="flex gap-4 flex-1">
              <div>
                <Select defaultValue="enrolled">
                  <SelectTrigger className="min-w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enrolled">Enrolled</SelectItem>
                    <SelectItem value="graduated">Graduated</SelectItem>
                    <SelectItem value="transferred">Transferred</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select defaultValue="all">
                  <SelectTrigger className="min-w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="class-1">Class 1</SelectItem>
                    <SelectItem value="class-2">Class 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Input
                  placeholder="2025-07-01"
                  className="min-w-32"
                />
              </div>
              <div>
                <Select defaultValue="all">
                  <SelectTrigger className="min-w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="secondary">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </Button>
        <Button variant="outline" size="sm">
          <FileText className="h-4 w-4 mr-2" />
          CSV
        </Button>
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Student Records</CardTitle>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search students..." className="w-64" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-muted-foreground">Option</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Admission No</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Admission Date</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Fee Vouchers</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Date of Birth</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Gender</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Father Name</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Home Phone</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Father Mobile</th>
                </tr>
              </thead>
              <tbody>
                {mockStudents.map((student) => (
                  <tr key={student.admissionNo} className="border-b hover:bg-muted/50">
                    <td className="p-3">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">✓</Button>
                        <Button variant="ghost" size="sm">📄</Button>
                      </div>
                    </td>
                    <td className="p-3 font-medium">{student.admissionNo}</td>
                    <td className="p-3">{student.admissionDate}</td>
                    <td className="p-3 font-medium">{student.name}</td>
                    <td className="p-3">
                      <Badge variant="secondary">{student.feeVouchers}</Badge>
                    </td>
                    <td className="p-3">{student.dateOfBirth}</td>
                    <td className="p-3">{student.gender}</td>
                    <td className="p-3">{student.fatherName}</td>
                    <td className="p-3">{student.homePhone}</td>
                    <td className="p-3">{student.fatherMobile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
            <span>Showing 1 to {mockStudents.length} of {mockStudents.length} entries</span>
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