
-- Verificar e corrigir as políticas RLS
-- Primeiro, vamos revisar a função get_current_user_role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
DECLARE
  user_role TEXT;
BEGIN
  -- Verificar se o usuário está autenticado
  IF auth.uid() IS NULL THEN
    RETURN NULL;
  END IF;
  
  -- Buscar o role do usuário
  SELECT role INTO user_role 
  FROM public.profiles 
  WHERE id = auth.uid();
  
  RETURN user_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Remover todas as políticas existentes
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow profile creation" ON public.profiles;

-- Recriar políticas mais robustas
-- Política para usuários verem seu próprio perfil
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT 
  USING (auth.uid() = id);

-- Política para administradores verem todos os perfis
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT 
  USING (
    auth.uid() IS NOT NULL AND 
    public.get_current_user_role() = 'administrador'
  );

-- Política para usuários atualizarem seu próprio perfil
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE 
  USING (auth.uid() = id);

-- Política para inserção de novos perfis
CREATE POLICY "Allow profile creation" ON public.profiles
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Criar uma função para debug das políticas
CREATE OR REPLACE FUNCTION public.debug_user_access()
RETURNS TABLE(
  current_user_id UUID,
  current_user_role TEXT,
  is_authenticated BOOLEAN
) AS $$
BEGIN
  RETURN QUERY SELECT 
    auth.uid() as current_user_id,
    public.get_current_user_role() as current_user_role,
    (auth.uid() IS NOT NULL) as is_authenticated;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
