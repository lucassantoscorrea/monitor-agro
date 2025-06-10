
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Eye } from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
  onForgotPassword: () => void;
}

const LoginPage = ({ onLogin, onForgotPassword }: LoginPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simular autenticação
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password) {
      onLogin();
    } else {
      setError("Credenciais inválidas");
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setError("");

    // Simular login demo com delay menor
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onLogin();
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 shadow-lg">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">MonitorAgro</h1>
          <p className="text-muted-foreground">Monitoramento inteligente de preços agrícolas</p>
        </div>

        <Card className="glass-effect premium-shadow">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Entrar no MonitorAgro</CardTitle>
            <CardDescription>
              Acesse sua conta para monitorar preços de defensivos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              {error && (
                <div className="text-destructive text-sm bg-destructive/10 p-3 rounded-md">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Ou</span>
                </div>
              </div>

              <Button 
                type="button"
                variant="outline"
                onClick={handleDemoLogin}
                className="w-full h-12 text-lg font-medium border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                disabled={isLoading}
              >
                <Eye className="w-5 h-5 mr-2" />
                {isLoading ? "Entrando..." : "Login Demo"}
              </Button>

              <div className="text-center mt-4">
                <button 
                  type="button"
                  onClick={onForgotPassword}
                  className="text-primary hover:text-primary/80 text-sm font-medium"
                >
                  Esqueci minha senha
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
