
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface UserActionsProps {
  isViewer: boolean;
  isLoading: boolean;
  onSave: () => void;
  onLogout: () => void;
}

const UserActions = ({ isViewer, isLoading, onSave, onLogout }: UserActionsProps) => {
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
          onClick={onLogout}
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
