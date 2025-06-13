
-- Primeiro, remover todas as políticas existentes que podem estar causando recursão
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- Desabilitar RLS temporariamente para limpar qualquer estado problemático
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Reabilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Criar políticas simples e funcionais
-- Política para SELECT: usuários podem ver perfis da mesma organização
CREATE POLICY "Users can view profiles from same organization" 
ON public.profiles 
FOR SELECT 
USING (
  organization_id IN (
    SELECT organization_id 
    FROM public.profiles 
    WHERE id = auth.uid()
  )
);

-- Política para UPDATE: usuários podem atualizar apenas seu próprio perfil
CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
USING (id = auth.uid());

-- Política para INSERT: permitir inserção durante o registro (via trigger)
CREATE POLICY "Allow profile creation" 
ON public.profiles 
FOR INSERT 
WITH CHECK (true);

-- Criar uma view para facilitar consultas de perfis sem recursão
CREATE OR REPLACE VIEW public.user_profiles AS
SELECT 
  id,
  organization_id,
  email,
  name,
  role,
  created_at,
  updated_at
FROM public.profiles;
