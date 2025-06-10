
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginPage from "./components/auth/LoginPage";
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProductsPage from "./components/products/ProductsPage";
import ReportViewPage from "./components/reports/ReportViewPage";
import ReportsPage from "./components/reports/ReportsPage";
import ProfilePage from "./components/profile/ProfilePage";
import UsersPage from "./components/users/UsersPage";
import { useState } from "react";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isAuthenticated, login } = useAuth();
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
  };

  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        {showForgotPassword ? (
          <ForgotPasswordPage onBackToLogin={handleBackToLogin} />
        ) : (
          <LoginPage onLogin={login} onForgotPassword={handleForgotPassword} />
        )}
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/reports/:id" element={<ReportViewPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
