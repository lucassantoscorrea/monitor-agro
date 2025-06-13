
-- Criar função para lidar com novos usuários
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  org_id uuid;
BEGIN
  -- Primeiro, criar a organização se o nome foi fornecido
  IF NEW.raw_user_meta_data ->> 'organization_name' IS NOT NULL THEN
    INSERT INTO public.organizations (name)
    VALUES (NEW.raw_user_meta_data ->> 'organization_name')
    RETURNING id INTO org_id;
  ELSE
    -- Se não foi fornecido nome da organização, criar uma padrão
    INSERT INTO public.organizations (name)
    VALUES ('Organização de ' || COALESCE(NEW.raw_user_meta_data ->> 'name', 'Usuário'))
    RETURNING id INTO org_id;
  END IF;

  -- Depois, criar o perfil do usuário vinculado à organização
  INSERT INTO public.profiles (id, organization_id, email, name, role)
  VALUES (
    NEW.id,
    org_id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'name',
    'admin' -- Primeiro usuário da organização será admin
  );

  RETURN NEW;
END;
$$;

-- Criar trigger que executa a função quando um usuário é criado
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Adicionar políticas RLS para as tabelas se ainda não existirem
DO $$
BEGIN
  -- Políticas para organizations
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'organizations' 
    AND policyname = 'Users can view their own organization'
  ) THEN
    CREATE POLICY "Users can view their own organization" 
      ON public.organizations 
      FOR SELECT 
      USING (
        id = (SELECT organization_id FROM public.profiles WHERE id = auth.uid())
      );
  END IF;

  -- Políticas para profiles
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Users can view profiles in their organization'
  ) THEN
    CREATE POLICY "Users can view profiles in their organization" 
      ON public.profiles 
      FOR SELECT 
      USING (
        organization_id = (SELECT organization_id FROM public.profiles WHERE id = auth.uid())
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Users can update their own profile'
  ) THEN
    CREATE POLICY "Users can update their own profile" 
      ON public.profiles 
      FOR UPDATE 
      USING (id = auth.uid());
  END IF;
END
$$;
