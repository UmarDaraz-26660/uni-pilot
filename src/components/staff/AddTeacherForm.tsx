import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";

interface AddTeacherFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function AddTeacherForm({ onCancel, onSuccess }: AddTeacherFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    subject: "",
    qualification: "",
    experience: "",
    phone: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generatePassword = () => {
    const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-4).toUpperCase();
    setFormData(prev => ({ ...prev, password }));
  };

  const generateEmail = () => {
    if (formData.firstName && formData.lastName) {
      const email = `${formData.firstName.toLowerCase()}.${formData.lastName.toLowerCase()}@school.edu`;
      setFormData(prev => ({ ...prev, email }));
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (Object.values(formData).every(field => field.trim() !== "")) {
        toast({
          title: "Teacher Added Successfully",
          description: `${formData.firstName} ${formData.lastName} has been added to the system.`,
        });
        onSuccess();
      } else {
        toast({
          title: "Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-full">
            <UserPlus className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <CardTitle>Add New Teacher</CardTitle>
            <CardDescription>Create a new teacher account with generated credentials</CardDescription>
          </div>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                placeholder="Enter first name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                placeholder="Enter last name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="teacher@school.edu"
                required
              />
              <Button type="button" variant="outline" onClick={generateEmail}>
                Generate
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <div className="flex gap-2">
              <Input
                id="password"
                type="text"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Auto-generated password"
                required
              />
              <Button type="button" variant="outline" onClick={generatePassword}>
                Generate
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Select value={formData.subject} onValueChange={(value) => handleChange("subject", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="geography">Geography</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qualification">Qualification *</Label>
              <Input
                id="qualification"
                value={formData.qualification}
                onChange={(e) => handleChange("qualification", e.target.value)}
                placeholder="e.g., M.Sc, B.Ed"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experience">Experience (Years) *</Label>
              <Input
                id="experience"
                type="number"
                value={formData.experience}
                onChange={(e) => handleChange("experience", e.target.value)}
                placeholder="Years of experience"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="Phone number"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Complete address"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adding Teacher..." : "Add Teacher"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}