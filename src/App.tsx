import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginForm } from "./components/auth/LoginForm";
import { RegisterForm } from "./components/auth/RegisterForm";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import TaskBoard from "./pages/TaskBoard";
import MessageCenter from "./pages/MessageCenter";
import Students from "./pages/Students";
import Staff from "./pages/Staff";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          } />
          <Route path="/taskboard" element={
            <DashboardLayout>
              <TaskBoard />
            </DashboardLayout>
          } />
          <Route path="/messages" element={
            <DashboardLayout>
              <MessageCenter />
            </DashboardLayout>
          } />
          <Route path="/staff/*" element={
            <DashboardLayout>
              <Staff />
            </DashboardLayout>
          } />
          <Route path="/education/students" element={
            <DashboardLayout>
              <Students />
            </DashboardLayout>
          } />
          <Route path="/education/*" element={
            <DashboardLayout>
              <Students />
            </DashboardLayout>
          } />
          <Route path="/account/*" element={
            <DashboardLayout>
              <Account />
            </DashboardLayout>
          } />
          <Route path="/settings" element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          } />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
