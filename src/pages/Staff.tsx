import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Staff() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
        <p className="text-muted-foreground">Manage staff members and their information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Staff management features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}