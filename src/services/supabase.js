// src/services/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vfcljgfuziitrnivoarv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmY2xqZ2Z1emlpdHJuaXZvYXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3NTYyOTksImV4cCI6MjA3MzMzMjI5OX0.GbSGWlkPd22DK_3sc50jTaNmjB7pvZkpWgSpCOclTP8";

export const supabase = createClient(supabaseUrl, supabaseKey);

// Konfigurasi untuk menonaktifkan verifikasi email
export async function signUp(email, password, userData) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
      emailRedirectTo: window.location.origin,
    },
  });

  if (error) throw error;
  return data;
}
