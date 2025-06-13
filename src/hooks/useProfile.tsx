
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
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        console.log('Buscando perfil para usuário:', user.id);
        
        // Usar a view para evitar problemas de recursão
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Erro ao buscar perfil:', error);
          
          // Se a view não funcionar, tentar buscar diretamente
          const { data: directData, error: directError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
            
          if (directError) {
            console.error('Erro ao buscar perfil diretamente:', directError);
          } else {
            console.log('Perfil encontrado diretamente:', directData);
            setProfile(directData);
          }
        } else {
          console.log('Perfil encontrado:', data);
          setProfile(data);
        }
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const isAdmin = profile?.role === 'administrador';
  
  console.log('Profile:', profile);
  console.log('IsAdmin:', isAdmin);
  console.log('Role:', profile?.role);

  return {
    profile,
    loading,
    isAdmin
  };
};
