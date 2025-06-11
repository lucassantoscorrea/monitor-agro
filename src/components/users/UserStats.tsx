
import { Card, CardContent } from "@/components/ui/card";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastAccess: string;
}

interface UserStatsProps {
  users: User[];
}

const UserStats = ({ users }: UserStatsProps) => {
  return (
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
  );
};

export default UserStats;
