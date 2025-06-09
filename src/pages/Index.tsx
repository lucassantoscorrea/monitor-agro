
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import LoginPage from "@/components/auth/LoginPage";
import DashboardPage from "@/components/dashboard/DashboardPage";
import ProductsPage from "@/components/products/ProductsPage";
import ReportsPage from "@/components/reports/ReportsPage";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "products":
        return <ProductsPage />;
      case "reports":
        return <ReportsPage />;
      default:
        return <DashboardPage />;
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background to-secondary/20">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <div className="border-b bg-white/50 backdrop-blur-sm p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div className="flex items-center gap-2">
                  <select className="text-sm bg-transparent border-none font-medium text-primary">
                    <option>Agro Solutions Ltda</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Próxima busca: <span className="font-medium text-accent">Hoje às 14:00</span>
                </span>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">JS</span>
                </div>
              </div>
            </div>
          </div>
          {renderPage()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
