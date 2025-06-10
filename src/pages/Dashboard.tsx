
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import DashboardPage from "@/components/dashboard/DashboardPage";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <DashboardPage />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
