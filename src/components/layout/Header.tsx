import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, Menu, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  onToggleSidebar: () => void;
  user?: { email: string; role: string } | null;
}

export function Header({ onToggleSidebar, user }: HeaderProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  const getUserInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  const getRoleDisplay = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <header className="h-16 bg-gradient-to-r from-header-primary to-header-secondary text-white shadow-lg">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onToggleSidebar}
            className="text-white hover:bg-white/10 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">Academic ERP</h1>
              <p className="text-sm text-white/80 hidden sm:block">Educational Management System</p>
            </div>
          </div>
        </div>

        {user && (
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{user.email}</p>
              <p className="text-xs text-white/80">{getRoleDisplay(user.role)}</p>
            </div>
            <Avatar className="h-10 w-10 border-2 border-white/20">
              <AvatarFallback className="bg-white/10 text-white">
                {getUserInitials(user.email)}
              </AvatarFallback>
            </Avatar>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-white hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}