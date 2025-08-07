import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Account() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Account Management</h1>
        <p className="text-muted-foreground">Financial management and fee tracking</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Account management features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}