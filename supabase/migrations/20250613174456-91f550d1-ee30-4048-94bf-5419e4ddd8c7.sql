
-- Criar tabela de organizações
CREATE TABLE public.organizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de perfis de usuário
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  organization_id UUID REFERENCES public.organizations NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS em ambas as tabelas
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas para organizations
CREATE POLICY "Users can view their own organization" 
  ON public.organizations 
  FOR SELECT 
  USING (
    id = (SELECT organization_id FROM public.profiles WHERE id = auth.uid())
  );

-- Políticas para profiles
CREATE POLICY "Users can view profiles in their organization" 
  ON public.profiles 
  FOR SELECT 
  USING (
    organization_id = (SELECT organization_id FROM public.profiles WHERE id = auth.uid())
  );

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (id = auth.uid());

-- Inserir uma organização de exemplo
INSERT INTO public.organizations (name) VALUES ('Agro Solutions Ltda');
