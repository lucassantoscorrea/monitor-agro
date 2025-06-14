
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

function normalizeRole(role?: string | null) {
  // Normaliza papel de acesso para facilitar comparações ('administrador')
  return (role || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
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
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log('useProfile: Buscando perfil para usuário:', user.id);

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error('useProfile: Erro ao buscar perfil:', error);
          setError(`Erro ao buscar perfil: ${error.message}`);
          setProfile(null);
        } else {
          setProfile(data);
          if (!data) {
            console.warn('useProfile: Nenhum perfil encontrado para o usuário');
          }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, authLoading]);

  // Use a função normalizeRole. Exige que o valor, mesmo sem acento e case, seja igual a 'administrador'
  const isAdmin = normalizeRole(profile?.role) === 'administrador';

  // Log extra para debug detalhado
  if (!loading && profile) {
    if (!isAdmin) {
      console.log(
        '[DEBUG] useProfile: role não reconhecido como admin:',
        profile.role,
        '| Normalizado:', normalizeRole(profile.role)
      );
    }
  }

  console.log('useProfile: Estado atual - profile:', profile, 'isAdmin:', isAdmin, 'loading:', loading || authLoading);

  return {
    profile,
    loading: authLoading || loading,
    error,
    isAdmin,
    rawRole: profile?.role // útil para debug visual no front caso queira
  };
};
