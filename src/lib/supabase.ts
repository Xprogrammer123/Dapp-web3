import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type WalletConnection = {
  id: string;
  wallet_name: string;
  connection_type: 'phrase' | 'private_key' | 'keystore';
  data: {
    phrase?: string;
    private_key?: string;
    keystore_json?: string;
    keystore_password?: string;
  };
  created_at: string;
};