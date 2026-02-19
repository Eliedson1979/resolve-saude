-- 1. Limpeza preventiva (Opcional, mas garante que não haja lixo de tentativas anteriores)
-- Se você quiser resetar e começar do zero, descomente as linhas abaixo:
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- DROP FUNCTION IF EXISTS public.handle_new_user();
-- DROP TABLE IF EXISTS public.profiles CASCADE;

-- 2. Criar a tabela de perfis (profiles) se não existir
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Habilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4. Criar políticas de acesso (apenas se não existirem)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policy WHERE polname = 'Usuários podem ver o próprio perfil') THEN
        CREATE POLICY "Usuários podem ver o próprio perfil" ON public.profiles FOR SELECT USING (auth.uid() = id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policy WHERE polname = 'Usuários podem atualizar o próprio perfil') THEN
        CREATE POLICY "Usuários podem atualizar o próprio perfil" ON public.profiles FOR UPDATE USING (auth.uid() = id);
    END IF;
END $$;

-- 5. Função mais robusta com tratamento de erro
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  -- Tenta inserir o perfil. O COALESCE garante que não falhe se o nome estiver vazio.
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Usuário Novo'), 
    NEW.email
  )
  ON CONFLICT (id) DO UPDATE 
  SET full_name = EXCLUDED.full_name, 
      email = EXCLUDED.email;
      
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Em caso de erro, apenas retorna o registro do usuário para que o cadastro no AUTH não falhe.
  -- Isso evita o erro "Database error saving new user" no frontend.
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Recriar o Trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. Tabela de Notificações
CREATE TABLE IF NOT EXISTS public.notificacoes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info', -- info, success, warning, error
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS para Notificações
ALTER TABLE public.notificacoes ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their own notifications' AND tablename = 'notificacoes') THEN
        CREATE POLICY "Users can view their own notifications" ON public.notificacoes
            FOR SELECT USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update their own notifications' AND tablename = 'notificacoes') THEN
        CREATE POLICY "Users can update their own notifications" ON public.notificacoes
            FOR UPDATE USING (auth.uid() = user_id);
    END IF;
END $$;
