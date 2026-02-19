import { supabase } from './supabaseClient';

export const consultasService = {
    // Buscar todas as consultas do usuário logado
    async getConsultas() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Usuário não autenticado');

        // Nota: Usando 'consultas_juridicas' como exemplo conforme o schema SQL
        // Em uma versão real, poderíamos ter uma tabela específica 'consultas_medicas'
        const { data, error } = await supabase
            .from('consultas_juridicas')
            .select('*')
            .eq('user_id', user.id)
            .order('meeting_time', { ascending: true });

        if (error) throw error;
        return data;
    },

    // Agendar nova consulta
    async createConsulta(consultaData) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Usuário não autenticado');

        const { data, error } = await supabase
            .from('consultas_juridicas')
            .insert([
                {
                    ...consultaData,
                    user_id: user.id,
                    status: 'agendado'
                }
            ])
            .select();

        if (error) throw error;
        return data;
    }
};
