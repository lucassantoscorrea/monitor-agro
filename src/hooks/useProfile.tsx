
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

export interface Profile {
  id: string;
  organization_id: string;
  email: string;
  name: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      // Se não há usuário ou ainda está carregando auth, resetar estado
      if (!user) {
        setProfile(null);
        setLoading(authLoading);
        setError(null);
        return;
      }

      // Se já temos o perfil para este usuário, não refazer a consulta
      if (profile && profile.id === user.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        console.log('Buscando perfil para usuário:', user.id);
        
        // Fazer apenas uma consulta direta à tabela profiles
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Erro ao buscar perfil:', error);
          setError(error.message);
          setProfile(null);
        } else {
          console.log('Perfil encontrado:', data);
          setProfile(data);
        }
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        setError('Erro interno ao buscar perfil');
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.id, authLoading]); // Dependências otimizadas

  // Memoizar o cálculo de isAdmin para evitar re-computações
  const isAdmin = profile?.role === 'administrador';
  
  return {
    profile,
    loading: authLoading || loading,
    error,
    isAdmin
  };
};
