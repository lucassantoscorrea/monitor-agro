
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import ProfileHeader from './ProfileHeader';
import UserInfoForm from './UserInfoForm';
import UserActions from './UserActions';
import PasswordGenerator from './PasswordGenerator';
import SystemCredentials from './SystemCredentials';

interface User {
  name: string;
  email: string;
  organization: string;
  permission: 'visualizador' | 'usuario' | 'administrador';
}

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock user data - in real app this would come from authentication context
  const [user, setUser] = useState<User>({
    name: 'João Silva',
    email: 'joao.silva@empresa.com',
    organization: 'Empresa ABC',
    permission: 'usuario'
  });

  const isViewer = user.permission === 'visualizador';
  const canEditPermissions = user.permission === 'usuario' || user.permission === 'administrador';

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
            <ProfileHeader />

            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account">Informações da Conta</TabsTrigger>
                <TabsTrigger value="credentials">Credenciais do Sistema</TabsTrigger>
                <TabsTrigger value="password">Gerador de Senhas</TabsTrigger>
              </TabsList>

              <TabsContent value="account" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações da Conta</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <UserInfoForm
                      user={user}
                      isViewer={isViewer}
                      canEditPermissions={canEditPermissions}
                      onInputChange={handleInputChange}
                    />
                    <UserActions
                      isViewer={isViewer}
                      isLoading={isLoading}
                      onSave={handleSave}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="credentials" className="mt-6">
                <SystemCredentials />
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
