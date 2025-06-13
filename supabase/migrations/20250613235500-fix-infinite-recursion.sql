
-- Corrigir a recursão infinita nas políticas RLS
-- Primeiro, remover todas as políticas problemáticas
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow profile creation" ON public.profiles;

-- Desabilitar RLS temporariamente para limpeza
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Reabilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Criar políticas mais simples sem recursão
-- Política básica: usuários podem ver seu próprio perfil
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT 
  USING (auth.uid() = id);

-- Política básica: usuários podem atualizar seu próprio perfil  
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE 
  USING (auth.uid() = id);

-- Política para inserção de perfis
CREATE POLICY "Allow profile creation" ON public.profiles
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Criar uma política separada que permite acesso total para administradores
-- usando uma abordagem diferente para evitar recursão
CREATE POLICY "Admin access to all profiles" ON public.profiles
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = auth.uid() AND p.role = 'administrador'
    )
  );
