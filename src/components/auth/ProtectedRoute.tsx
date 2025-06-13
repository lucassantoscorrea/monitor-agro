
import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthPage from './AuthPage';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  // Loading simples e direto
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Verificação direta se não há usuário
  if (!user) {
    return <AuthPage />;
  }

  // Renderizar children apenas quando autenticado
  return <>{children}</>;
};

export default ProtectedRoute;
