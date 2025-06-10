
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface User {
  name: string;
  email: string;
  organization: string;
  permission: 'visualizador' | 'gerente' | 'admin';
}

interface UserInfoFormProps {
  user: User;
  isViewer: boolean;
  canEditPermissions: boolean;
  onInputChange: (field: keyof User, value: string) => void;
}

const UserInfoForm = ({ user, isViewer, canEditPermissions, onInputChange }: UserInfoFormProps) => {
  const organizations = [
    'Empresa ABC',
    'Tech Solutions',
    'Inovação Corp',
    'StartUp XYZ'
  ];

  const permissions = [
    { value: 'visualizador', label: 'Visualizador' },
    { value: 'gerente', label: 'Gerente' },
    { value: 'admin', label: 'Administrador' }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          value={user.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          disabled={isViewer}
          placeholder="Digite seu nome"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          disabled={isViewer}
          placeholder="Digite seu e-mail"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="organization">Organização atual</Label>
        <Select
          value={user.organization}
          onValueChange={(value) => onInputChange('organization', value)}
          disabled={isViewer}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma organização" />
          </SelectTrigger>
          <SelectContent>
            {organizations.map((org) => (
              <SelectItem key={org} value={org}>
                {org}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {canEditPermissions && (
        <div className="space-y-2">
          <Label htmlFor="permission">Permissão</Label>
          <Select
            value={user.permission}
            onValueChange={(value) => onInputChange('permission', value as User['permission'])}
            disabled={isViewer}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma permissão" />
            </SelectTrigger>
            <SelectContent>
              {permissions.map((permission) => (
                <SelectItem key={permission.value} value={permission.value}>
                  {permission.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default UserInfoForm;
