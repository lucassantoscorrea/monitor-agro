
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import PasswordGenerator from './PasswordGenerator';

interface User {
  name: string;
  email: string;
  organization: string;
  permission: 'visualizador' | 'gerente' | 'admin';
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock user data - in real app this would come from authentication context
  const [user, setUser] = useState<User>({
    name: 'João Silva',
    email: 'joao.silva@empresa.com',
    organization: 'Empresa ABC',
    permission: 'gerente'
  });

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

  const isViewer = user.permission === 'visualizador';
  const canEditPermissions = user.permission === 'gerente' || user.permission === 'admin';

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Alterações salvas com sucesso!');
    } catch (error) {
      toast.error('Erro ao salvar alterações');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    toast.success('Saindo da conta...');
    // In real app, this would clear authentication state
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const handleInputChange = (field: keyof User, value: string) => {
    if (!isViewer) {
      setUser(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Meu Perfil</h1>
              <p className="text-muted-foreground mt-2">
                Gerencie suas informações da conta e permissões
              </p>
            </div>

            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Informações da Conta</TabsTrigger>
                <TabsTrigger value="password">Gerador de Senhas</TabsTrigger>
              </TabsList>

              <TabsContent value="account" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações da Conta</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        value={user.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
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
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={isViewer}
                        placeholder="Digite seu e-mail"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organization">Organização atual</Label>
                      <Select
                        value={user.organization}
                        onValueChange={(value) => handleInputChange('organization', value)}
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
                          onValueChange={(value) => handleInputChange('permission', value as User['permission'])}
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

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <Button
                        onClick={handleSave}
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
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="password" className="mt-6">
                <PasswordGenerator />
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ProfilePage;
