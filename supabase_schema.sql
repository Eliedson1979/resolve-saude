-- Tabelas para o ResolveSaúde

-- 1. Perfis de Usuários (Extensão do Auth.Users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  insurance_provider TEXT,
  plan_type TEXT,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Documentos (Laudos, Carteirinhas, etc)
CREATE TABLE documentos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL, -- 'laudo', 'carteirinha', 'receita', 'exame'
  file_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Solicitações e Acompanhamento de Guias
CREATE TABLE solicitacoes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  procedure_name TEXT NOT NULL,
  provider_name TEXT,
  status TEXT DEFAULT 'pendente', -- 'pendente', 'em_analise', 'autorizado', 'negado'
  protocol_number TEXT,
  deadline DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Consultas Jurídicas
CREATE TABLE consultas_juridicas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  subject TEXT NOT NULL, -- 'negativa_procedimento', 'reajuste_abusivo', 'atraso_marcado'
  description TEXT,
  status TEXT DEFAULT 'agendado', -- 'agendado', 'em_andamento', 'concluido'
  meeting_link TEXT,
  meeting_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Dependentes
CREATE TABLE dependentes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  relationship TEXT,
  birth_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- RLS (Row Level Security) - Exemplo básico
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

ALTER TABLE documentos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own documents" ON documentos FOR ALL USING (auth.uid() = user_id);

ALTER TABLE solicitacoes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own requests" ON solicitacoes FOR SELECT USING (auth.uid() = user_id);

ALTER TABLE consultas_juridicas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own legal consultations" ON consultas_juridicas FOR SELECT USING (auth.uid() = user_id);

ALTER TABLE dependentes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their dependents" ON dependentes FOR ALL USING (auth.uid() = owner_id);
