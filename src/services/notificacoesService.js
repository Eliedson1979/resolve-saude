import { supabase } from './supabaseClient';

export const notificacoesService = {
    async getNotificacoes() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        const { data, error } = await supabase
            .from('notificacoes')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async markAsRead(notificationId) {
        const { error } = await supabase
            .from('notificacoes')
            .update({ read: true })
            .eq('id', notificationId);

        if (error) throw error;
    },

    async markAllAsRead() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase
            .from('notificacoes')
            .update({ read: true })
            .eq('user_id', user.id)
            .eq('read', false);

        if (error) throw error;
    },

    onNewNotification(callback) {
        return supabase
            .channel('notificacoes_channel')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'notificacoes'
                },
                (payload) => callback(payload.new)
            )
            .subscribe();
    },

    // Apenas para simulação e teste da IA/Sistema
    async createSystemNotification(title, message, type = 'info') {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
            .from('notificacoes')
            .insert([
                {
                    user_id: user.id,
                    title,
                    message,
                    type
                }
            ]);

        if (error) throw error;
        return data;
    }
};
