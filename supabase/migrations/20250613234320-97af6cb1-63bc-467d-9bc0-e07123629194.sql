
-- Remover TODAS as políticas existentes da tabela profiles
DROP POLICY IF EXISTS "Users can view profiles from same organization" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow profile creation" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Criar função de segurança para obter o papel do usuário atual
-- Isso evita recursão infinita nas políticas RLS
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Habilitar RLS na tabela profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Criar política simples para usuários verem seu próprio perfil
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Criar política para usuários atualizarem seu próprio perfil
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Criar política para administradores verem todos os perfis usando a função
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.get_current_user_role() = 'administrador');

-- Política para inserção de novos perfis (necessária para o cadastro)
CREATE POLICY "Allow profile creation" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
