
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastAccess: string;
}

interface AddUserDialogProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const AddUserDialog = ({ users, setUsers }: AddUserDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userStatus, setUserStatus] = useState("Ativo");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAddUser = async () => {
    if (!userName.trim() || !userEmail.trim() || !userRole) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      toast({
        title: "Erro",
        description: "Digite um e-mail válido",
        variant: "destructive",
      });
      return;
    }

    // Verificar se email já existe
    const emailExists = users.some(user => user.email.toLowerCase() === userEmail.toLowerCase());
    if (emailExists) {
      toast({
        title: "Erro",
        description: "Este e-mail já está cadastrado",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simular salvamento
    setTimeout(() => {
      const newUser: User = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        name: userName,
        email: userEmail,
        role: userRole,
        status: userStatus,
        lastAccess: "Nunca acessou"
      };
      
      setUsers(prev => [...prev, newUser]);
      
      setIsLoading(false);
      setIsDialogOpen(false);
      resetForm();
      
      toast({
        title: "Sucesso",
        description: "Usuário adicionado com sucesso",
      });
    }, 1000);
  };

  const resetForm = () => {
    setUserName("");
    setUserEmail("");
    setUserRole("");
    setUserStatus("Ativo");
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => {
      setIsDialogOpen(open);
      if (!open) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 h-12 px-6">
          <Plus className="w-5 h-5 mr-2" />
          Adicionar Usuário
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Usuário</DialogTitle>
          <DialogDescription>
            Preencha as informações para criar um novo usuário
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="addUserName">Nome *</Label>
            <Input
              id="addUserName"
              placeholder="Digite o nome do usuário..."
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="addUserEmail">E-mail *</Label>
            <Input
              id="addUserEmail"
              type="email"
              placeholder="Digite o e-mail..."
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="addUserRole">Permissão *</Label>
            <Select value={userRole} onValueChange={setUserRole}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma permissão" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Administrador">Administrador</SelectItem>
                <SelectItem value="Usuário">Usuário</SelectItem>
                <SelectItem value="Visualizador">Visualizador</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="addUserStatus">Status *</Label>
            <Select value={userStatus} onValueChange={setUserStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            onClick={handleAddUser}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Criando...
              </>
            ) : (
              "Criar Usuário"
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsDialogOpen(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
