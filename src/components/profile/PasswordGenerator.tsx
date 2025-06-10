
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/sonner';
import { Copy, RefreshCw, Shield } from 'lucide-react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });

  const generatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let availableChars = '';
    if (options.uppercase) availableChars += uppercaseChars;
    if (options.lowercase) availableChars += lowercaseChars;
    if (options.numbers) availableChars += numberChars;
    if (options.symbols) availableChars += symbolChars;

    if (availableChars === '') {
      toast.error('Selecione pelo menos uma opção de caracteres');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      newPassword += availableChars[randomIndex];
    }

    setPassword(newPassword);
    toast.success('Senha gerada com sucesso!');
  };

  const copyPassword = async () => {
    if (!password) {
      toast.error('Gere uma senha primeiro');
      return;
    }

    try {
      await navigator.clipboard.writeText(password);
      toast.success('Senha copiada para a área de transferência!');
    } catch (error) {
      toast.error('Erro ao copiar senha');
    }
  };

  const handleOptionChange = (option: keyof typeof options, checked: boolean) => {
    setOptions(prev => ({ ...prev, [option]: checked }));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <CardTitle>Gerador de Senhas Seguras</CardTitle>
        </div>
        <CardDescription>
          Gere senhas fortes para usar no sistema "Menor Preço". 
          Dessa forma, mantemos suas senhas pessoais em segurança.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-amber-600 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Por que usar senhas geradas?</p>
              <p>
                Use senhas únicas geradas aqui para o sistema "Menor Preço". 
                Isso protege suas senhas pessoais e mantém sua conta segura.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="length">Comprimento da senha: {length}</Label>
            <input
              id="length"
              type="range"
              min="8"
              max="32"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>8</span>
              <span>32</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Caracteres incluídos:</Label>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="uppercase"
                checked={options.uppercase}
                onCheckedChange={(checked) => handleOptionChange('uppercase', !!checked)}
              />
              <Label htmlFor="uppercase" className="text-sm font-normal">
                Letras maiúsculas (A-Z)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="lowercase"
                checked={options.lowercase}
                onCheckedChange={(checked) => handleOptionChange('lowercase', !!checked)}
              />
              <Label htmlFor="lowercase" className="text-sm font-normal">
                Letras minúsculas (a-z)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="numbers"
                checked={options.numbers}
                onCheckedChange={(checked) => handleOptionChange('numbers', !!checked)}
              />
              <Label htmlFor="numbers" className="text-sm font-normal">
                Números (0-9)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="symbols"
                checked={options.symbols}
                onCheckedChange={(checked) => handleOptionChange('symbols', !!checked)}
              />
              <Label htmlFor="symbols" className="text-sm font-normal">
                Símbolos (!@#$%^&*...)
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="generated-password">Senha gerada:</Label>
          <div className="flex gap-2">
            <Input
              id="generated-password"
              value={password}
              placeholder="Clique em 'Gerar Senha' para criar uma nova senha"
              readOnly
              className="font-mono"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={copyPassword}
              disabled={!password}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Button onClick={generatePassword} className="w-full">
          <RefreshCw className="w-4 h-4 mr-2" />
          Gerar Nova Senha
        </Button>
      </CardContent>
    </Card>
  );
};

export default PasswordGenerator;
