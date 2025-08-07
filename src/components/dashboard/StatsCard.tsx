import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: "green" | "orange" | "blue" | "red";
}

const colorVariants = {
  green: "bg-success text-success-foreground",
  orange: "bg-warning text-warning-foreground", 
  blue: "bg-info text-info-foreground",
  red: "bg-destructive text-destructive-foreground",
};

export function StatsCard({ title, value, icon: Icon, color }: StatsCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex">
          <div className={`p-6 ${colorVariants[color]}`}>
            <Icon className="h-8 w-8" />
          </div>
          <div className="flex-1 p-6">
            <div className="text-2xl font-bold text-foreground">{value}</div>
            <div className="text-sm text-muted-foreground font-medium mt-1">{title}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}