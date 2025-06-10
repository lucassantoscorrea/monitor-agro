
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
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
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    const colors = {
      "Administrador": "bg-red-100 text-red-700",
      "Usuário": "bg-blue-100 text-blue-700",
      "Visualizador": "bg-gray-100 text-gray-700"
    };
    return <Badge className={colors[role as keyof typeof colors] || "bg-gray-100 text-gray-700"}>{role}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    if (status === "Ativo") {
      return <Badge className="bg-green-100 text-green-700">Ativo</Badge>;
    }
    return <Badge variant="outline" className="border-red-500 text-red-700">Inativo</Badge>;
  };

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
              <Button className="bg-primary hover:bg-primary/90 h-12 px-6">
                <Plus className="w-5 h-5 mr-2" />
                Adicionar Usuário
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary">{users.length}</div>
                  <p className="text-sm text-muted-foreground">Total de Usuários</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-green-600">
                    {users.filter(u => u.status === "Ativo").length}
                  </div>
                  <p className="text-sm text-muted-foreground">Usuários Ativos</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {users.filter(u => u.role === "Administrador").length}
                  </div>
                  <p className="text-sm text-muted-foreground">Administradores</p>
                </CardContent>
              </Card>
            </div>

            <Card className="premium-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Lista de Usuários
                    </CardTitle>
                    <CardDescription>
                      Usuários cadastrados no sistema
                    </CardDescription>
                  </div>
                  <div className="relative w-72">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Buscar usuários..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredUsers.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {searchTerm ? "Nenhum usuário encontrado." : "Nenhum usuário cadastrado"}
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>E-mail</TableHead>
                        <TableHead>Permissão</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Último Acesso</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id} className="hover:bg-secondary/30">
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{getRoleBadge(user.role)}</TableCell>
                          <TableCell>{getStatusBadge(user.status)}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{user.lastAccess}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="mr-2">
                              <Edit className="w-4 h-4" />
                              Editar
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Remover
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default UsersPage;
