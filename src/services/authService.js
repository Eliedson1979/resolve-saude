import { supabase } from './supabaseClient';

export const authService = {
    // Inscrição de novo usuário
    async signUp(email, password, fullName) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                }
            }
        });
        if (error) throw error;
        return data;
    },

    // Login de usuário
    async signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data;
    },

    // Logout de usuário
    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    // Obter usuário atual
    async getCurrentUser() {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    },

    // Monitorar estado da autenticação
    onAuthStateChange(callback) {
        return supabase.auth.onAuthStateChange((_event, session) => {
            callback(session?.user ?? null);
        });
    }
};
