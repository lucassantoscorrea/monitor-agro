
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useProfile } from './useProfile';

export interface User {
  id: string;
  organization_id: string;
  email: string;
  name: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

export const useUsers = () => {
  const { profile } = useProfile();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    if (!profile?.organization_id) {
      setUsers([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('organization_id', profile.organization_id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar usuários:', error);
      } else {
        setUsers(data || []);
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [profile?.organization_id]);

  const addUser = async (email: string, name: string, role: string) => {
    if (!profile?.organization_id) {
      throw new Error('Organização não encontrada');
    }

    try {
      // Enviar convite para o usuário se cadastrar
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password: Math.random().toString(36).slice(-8) + 'A1!', // Senha temporária
        options: {
          data: {
            name: name,
            organization_id: profile.organization_id,
            role: role
          },
          emailRedirectTo: `${window.location.origin}/auth`
        }
      });

      if (signUpError) {
        throw signUpError;
      }

      console.log('Convite enviado para:', email);
      
      // Se o usuário foi criado, criar o perfil imediatamente
      if (signUpData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: signUpData.user.id,
            organization_id: profile.organization_id,
            email,
            name,
            role
          });

        if (profileError) {
          console.error('Erro ao criar perfil:', profileError);
          // Continuar mesmo se houver erro, pois o trigger pode ter criado o perfil
        }
      }

      // Recarregar lista de usuários
      await fetchUsers();
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      throw error;
    }
  };

  return {
    users,
    loading,
    addUser,
    refetch: fetchUsers
  };
};
