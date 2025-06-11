
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Trash2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import EditUserDialog from "./EditUserDialog";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastAccess: string;
}

interface UsersTableProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const UsersTable = ({ users, setUsers, searchTerm, setSearchTerm }: UsersTableProps) => {
  const { toast } = useToast();

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveUser = (userId: number) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    toast({
      title: "Usuário removido com sucesso",
      description: "O usuário foi removido do sistema.",
    });
  };

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
                    <EditUserDialog 
                      user={user}
                      users={users}
                      setUsers={setUsers}
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleRemoveUser(user.id)}
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
  );
};

export default UsersTable;
