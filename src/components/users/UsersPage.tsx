
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { useProfile } from "@/hooks/useProfile";
import AddUserDialog from "./AddUserDialog";
import UserStats from "./UserStats";
import UsersTable from "./UsersTable";

const UsersPage = () => {
  const { profile, loading, isAdmin } = useProfile();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <SidebarInset>
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Acesso Negado
                </h1>
                <p className="text-muted-foreground">
                  Apenas administradores podem acessar esta página.
                </p>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <div className="flex-1 space-y-6 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Usuários</h1>
                <p className="text-muted-foreground mt-2">
                  Gerencie usuários e suas permissões no sistema
                </p>
              </div>
              <AddUserDialog />
            </div>

            <UserStats />
            <UsersTable />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default UsersPage;
