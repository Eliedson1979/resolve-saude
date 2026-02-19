import { supabase } from './supabaseClient';
import { notificacoesService } from './notificacoesService';

export const documentosService = {
    // Buscar lista de documentos do usuário
    async getDocumentos() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Usuário não autenticado');

        const { data, error } = await supabase
            .from('documentos')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Upload de documento real para o Supabase Storage e registro no banco
    async uploadDocumento(file, metadata) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Usuário não autenticado');

        // 1. Upload para o Storage (Bucket 'documentos')
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        const filePath = fileName;

        const { error: storageError } = await supabase.storage
            .from('documentos')
            .upload(filePath, file);

        if (storageError) throw storageError;

        // 2. Obter URL pública do arquivo
        const { data: { publicUrl } } = supabase.storage
            .from('documentos')
            .getPublicUrl(filePath);

        // 3. Salvar metadados na tabela 'documentos'
        const { data, error: dbError } = await supabase
            .from('documentos')
            .insert([
                {
                    user_id: user.id,
                    title: metadata.title || file.name,
                    category: metadata.category || 'outros',
                    file_url: publicUrl,
                }
            ])
            .select();

        if (dbError) throw dbError;

        // 4. Simulação de Análise por IA (Cérebro do Projeto)
        this.simularAnaliseIA(data[0]);

        return data[0];
    },

    async simularAnaliseIA(documento) {
        // Simular tempo de processamento da IA
        setTimeout(async () => {
            const mensagens = {
                'exame': `A Resolve IA analisou seu exame "${documento.title}". Os valores parecem estar dentro da normalidade para seu perfil.`,
                'receita': `Nova receita identificada: "${documento.title}". Gostaria de agendar lembretes para os medicamentos?`,
                'laudo': `O laudo "${documento.title}" foi processado. Ele confirma a autorização para seu procedimento solicitado.`,
                'outros': `Documento "${documento.title}" salvo com sucesso e indexado no seu histórico.`
            };

            const mensagem = mensagens[documento.category] || mensagens['outros'];

            try {
                await notificacoesService.createSystemNotification(
                    '🤖 Análise IA Concluída',
                    mensagem,
                    'success'
                );
            } catch (err) {
                console.error('Erro ao enviar notificação de IA:', err);
            }
        }, 3000);
    }
};
