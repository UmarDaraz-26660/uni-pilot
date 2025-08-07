import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  CheckSquare, 
  MessageSquare, 
  Users, 
  BookOpen, 
  CreditCard, 
  Settings,
  ChevronRight,
  ChevronDown
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Task Board",
    href: "/taskboard",
    icon: CheckSquare,
  },
  {
    name: "Message Center",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    name: "Staff",
    href: "/staff",
    icon: Users,
    children: [
      { name: "All Staff", href: "/staff" },
      { name: "Teachers", href: "/staff/teachers" },
      { name: "Administration", href: "/staff/admin" },
    ],
  },
  {
    name: "Education",
    href: "/education",
    icon: BookOpen,
    children: [
      { name: "Students", href: "/education/students" },
      { name: "Classes", href: "/education/classes" },
      { name: "Subjects", href: "/education/subjects" },
      { name: "Attendance", href: "/education/attendance" },
    ],
  },
  {
    name: "Account",
    href: "/account",
    icon: CreditCard,
    children: [
      { name: "Fee Management", href: "/account/fees" },
      { name: "Financial Reports", href: "/account/reports" },
      { name: "Transactions", href: "/account/transactions" },
    ],
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + "/");
  };

  const isExpanded = (itemName: string) => {
    return expandedItems.includes(itemName);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-sidebar border-r border-sidebar-border z-50 transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const itemIsActive = isActive(item.href);
              const itemIsExpanded = isExpanded(item.name);
              
              return (
                <div key={item.name}>
                  {item.children ? (
                    <div>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-between text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          itemIsActive && "bg-sidebar-primary text-sidebar-primary-foreground"
                        )}
                        onClick={() => toggleExpanded(item.name)}
                      >
                        <div className="flex items-center">
                          <Icon className="mr-3 h-5 w-5" />
                          {item.name}
                        </div>
                        {itemIsExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                      {itemIsExpanded && (
                        <div className="ml-8 mt-2 space-y-1">
                          {item.children.map((child) => (
                            <NavLink
                              key={child.href}
                              to={child.href}
                              onClick={onClose}
                              className={({ isActive }) => cn(
                                "block px-3 py-2 text-sm rounded-md transition-colors",
                                isActive
                                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                              )}
                            >
                              {child.name}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <NavLink
                      to={item.href}
                      onClick={onClose}
                      className={({ isActive }) => cn(
                        "flex items-center w-full px-3 py-3 rounded-md transition-colors",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </NavLink>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}