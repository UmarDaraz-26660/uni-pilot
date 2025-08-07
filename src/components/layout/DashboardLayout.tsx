import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  if (!user) {
    return null; // Loading state or redirect
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onToggleSidebar={toggleSidebar} user={user} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        <main className="flex-1 lg:ml-64 transition-all duration-300 ease-in-out">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}