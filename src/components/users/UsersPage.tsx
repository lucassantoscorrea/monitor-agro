
import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import AddUserDialog from "./AddUserDialog";
import UserStats from "./UserStats";
import UsersTable from "./UsersTable";

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "João Silva",
      email: "joao@empresa.com",
      role: "Administrador",
      status: "Ativo",
      lastAccess: "10/06/2025 09:15"
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@empresa.com",
      role: "Usuário",
      status: "Ativo",
      lastAccess: "09/06/2025 16:30"
    },
    {
      id: 3,
      name: "Carlos Oliveira",
      email: "carlos@empresa.com",
      role: "Visualizador",
      status: "Inativo",
      lastAccess: "05/06/2025 14:20"
    }
  ]);

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
              <AddUserDialog users={users} setUsers={setUsers} />
            </div>

            <UserStats users={users} />

            <UsersTable 
              users={users}
              setUsers={setUsers}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default UsersPage;
