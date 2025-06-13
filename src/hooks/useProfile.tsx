
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
      if (!user) {
        console.log('useProfile: Usuário não autenticado');
        setProfile(null);
        setLoading(authLoading);
        setError(null);
        return;
      }

      if (profile && profile.id === user.id) {
        console.log('useProfile: Perfil já carregado para este usuário');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        console.log('useProfile: Buscando perfil para usuário:', user.id);
        
        // Testar a função de debug primeiro
        const { data: debugData, error: debugError } = await supabase
          .rpc('debug_user_access');
        
        if (debugError) {
          console.error('useProfile: Erro no debug:', debugError);
        } else {
          console.log('useProfile: Debug info:', debugData);
        }
        
        // Buscar o perfil do usuário
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('useProfile: Erro ao buscar perfil:', error);
          setError(`Erro ao buscar perfil: ${error.message}`);
          setProfile(null);
        } else {
          console.log('useProfile: Perfil encontrado:', data);
          console.log('useProfile: Role do usuário:', data?.role);
          setProfile(data);
        }
      } catch (error) {
        console.error('useProfile: Erro interno:', error);
        setError('Erro interno ao buscar perfil');
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.id, authLoading]);

  const isAdmin = profile?.role === 'administrador';
  
  console.log('useProfile: Estado atual - profile:', profile, 'isAdmin:', isAdmin, 'loading:', loading || authLoading);
  
  return {
    profile,
    loading: authLoading || loading,
    error,
    isAdmin
  };
};
