import { supabase } from '@/types/supabase';

export const api = {
  getProducts: async () => {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  getProductById: async (id: string) => {
    const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },

  getUserCaptures: async (userId: string) => {
    const { data, error } = await supabase.from('captures').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  request3DModel: async (userId: string, imageUrl: string) => {
    const { data, error } = await supabase.functions.invoke('generate-3d-model', { body: { user_id: userId, image_url: imageUrl } });
    if (error) throw error;
    return data;
  }
};
