
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';
import { Eye, EyeOff, Save, Key, AlertTriangle } from 'lucide-react';

interface SystemCredentialsData {
  username: string;
  password: string;
}

const SystemCredentials = () => {
  const [credentials, setCredentials] = useState<SystemCredentialsData>({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof SystemCredentialsData, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!credentials.username || !credentials.password) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call to save encrypted credentials
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Credenciais salvas com segurança!');
    } catch (error) {
      toast.error('Erro ao salvar credenciais');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestConnection = async () => {
    if (!credentials.username || !credentials.password) {
      toast.error('Por favor, preencha as credenciais primeiro');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate testing connection to "Menor Preço" system
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Conexão testada com sucesso! Credenciais válidas.');
    } catch (error) {
      toast.error('Falha na conexão. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Key className="w-5 h-5 text-primary" />
          <CardTitle>Credenciais do Sistema "Menor Preço"</CardTitle>
        </div>
        <CardDescription>
          Configure suas credenciais para que o MonitorAgro possa acessar 
          o sistema "Menor Preço" automaticamente em seu nome.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Segurança das suas credenciais</p>
              <p>
                Suas credenciais são criptografadas e armazenadas com segurança. 
                Elas são usadas apenas para acessar o sistema "Menor Preço" e 
                coletar informações de preços em seu nome.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Usuário/E-mail do sistema "Menor Preço"</Label>
            <Input
              id="username"
              type="text"
              value={credentials.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              placeholder="Digite seu usuário ou e-mail"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha do sistema "Menor Preço"</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Digite sua senha"
                disabled={isLoading}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Como usar suas credenciais salvas:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>O sistema fará login automaticamente no "Menor Preço"</li>
              <li>Buscará os preços dos produtos cadastrados</li>
              <li>Atualizará as informações em tempo real</li>
              <li>Você pode acompanhar tudo pelos relatórios</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="flex-1"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Salvando...' : 'Salvar Credenciais'}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleTestConnection}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? 'Testando...' : 'Testar Conexão'}
          </Button>
        </div>

        {credentials.username && credentials.password && (
          <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md">
            <strong>Status:</strong> Credenciais configuradas. 
            O sistema pode acessar o "Menor Preço" automaticamente.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SystemCredentials;
