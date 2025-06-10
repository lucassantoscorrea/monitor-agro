
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, ArrowLeft } from "lucide-react";

interface ForgotPasswordPageProps {
  onBackToLogin: () => void;
}

const ForgotPasswordPage = ({ onBackToLogin }: ForgotPasswordPageProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simular envio de email
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (email) {
      setIsSuccess(true);
    } else {
      setError("Digite um e-mail válido");
    }
    
    setIsLoading(false);
  };

  if (isSuccess) {
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
              <CardTitle className="text-2xl">E-mail Enviado!</CardTitle>
              <CardDescription>
                Verifique sua caixa de entrada e siga as instruções para redefinir sua senha
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={onBackToLogin}
                className="w-full h-12 text-lg font-medium"
              >
                Voltar ao Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
            <CardTitle className="text-2xl">Esqueci minha senha</CardTitle>
            <CardDescription>
              Digite seu e-mail para receber instruções de redefinição
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
                {isLoading ? "Enviando..." : "Enviar instruções"}
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={onBackToLogin}
                className="w-full h-12 text-lg font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
