
-- Primeiro, remover o constraint existente
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;

-- Atualizar registros existentes que têm role "admin" para "administrador"
UPDATE public.profiles 
SET role = 'administrador' 
WHERE role = 'admin';

-- Atualizar registros existentes que têm role "user" para "usuario"
UPDATE public.profiles 
SET role = 'usuario' 
WHERE role = 'user';

-- Atualizar registros existentes que têm role "viewer" para "visualizador"
UPDATE public.profiles 
SET role = 'visualizador' 
WHERE role = 'viewer';

-- Agora criar o constraint com os valores corretos em português
ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_check 
CHECK (role = ANY (ARRAY['administrador'::text, 'usuario'::text, 'visualizador'::text]));

-- Atualizar a função do trigger para usar "administrador"
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
    'administrador' -- Primeiro usuário da organização será administrador
  );

  RETURN NEW;
END;
$$;
