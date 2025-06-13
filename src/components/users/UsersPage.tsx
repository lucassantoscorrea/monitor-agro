
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { useProfile } from "@/hooks/useProfile";
import AddUserDialog from "./AddUserDialog";
import UserStats from "./UserStats";
import UsersTable from "./UsersTable";

const UsersPage = () => {
  const { profile, loading, isAdmin, error } = useProfile();

  console.log('UsersPage: profile:', profile, 'loading:', loading, 'isAdmin:', isAdmin, 'error:', error);

  if (loading) {
    console.log('UsersPage: Mostrando loading');
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <SidebarInset>
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  }

  if (error) {
    console.log('UsersPage: Mostrando erro:', error);
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <SidebarInset>
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Erro ao carregar perfil
                </h1>
                <p className="text-muted-foreground">
                  {error}
                </p>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Debug: Profile = {profile ? 'presente' : 'null'}</p>
                  <p>Debug: Role = {profile?.role || 'não definido'}</p>
                </div>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  }

  if (!profile) {
    console.log('UsersPage: Profile não encontrado');
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <SidebarInset>
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Perfil não encontrado
                </h1>
                <p className="text-muted-foreground">
                  Não foi possível carregar as informações do seu perfil.
                </p>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  }

  if (!isAdmin) {
    console.log('UsersPage: Usuário não é administrador - role:', profile.role);
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
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Seu role atual: {profile.role}</p>
                  <p>Role necessário: administrador</p>
                </div>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  }

  console.log('UsersPage: Renderizando página principal para administrador');
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
