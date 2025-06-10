
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';

interface UserActionsProps {
  isViewer: boolean;
  isLoading: boolean;
  onSave: () => void;
}

const UserActions = ({ isViewer, isLoading, onSave }: UserActionsProps) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    toast.success('Saindo da conta...');
    // Reset authentication state immediately
    setTimeout(() => {
      logout();
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <Button
          onClick={onSave}
          disabled={isViewer || isLoading}
          className="flex-1"
        >
          {isLoading ? 'Salvando...' : 'Salvar alterações'}
        </Button>
        
        <Button
          variant="destructive"
          onClick={handleLogout}
          className="flex-1"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair da conta
        </Button>
      </div>

      {isViewer && (
        <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
          <strong>Aviso:</strong> Você tem permissão de visualizador. 
          Entre em contato com um gerente para editar suas informações.
        </div>
      )}
    </div>
  );
};

export default UserActions;
