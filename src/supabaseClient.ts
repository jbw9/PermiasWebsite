import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pgluboxwxqyzdlfemkij.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnbHVib3h3eHF5emRsZmVta2lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY1Mjc4MzQsImV4cCI6MjA0MjEwMzgzNH0.YB3s7Y9thW-qsnzFfIJ8ibRVtdNu1cTRnm7BSb_by_g";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
