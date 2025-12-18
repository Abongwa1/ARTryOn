import { createClient } from "@supabase/supabase-js";
import 'expo-sqlite/localStorage/install';
import "react-native-url-polyfill/auto";

// const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
// const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

const SUPABASE_URL = 'https://arahvjrnnmkyajoyzsir.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyYWh2anJubm1reWFqb3l6c2lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNzQ2NjUsImV4cCI6MjA3ODc1MDY2NX0.-8M8308Ps1vbOr7SPt1DGkKOhS9c9THTG1c3g34mykc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
