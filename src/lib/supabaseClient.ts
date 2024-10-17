// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vngoguatelktkhnnlvtj.supabase.co'; // Ensure this is set in your .env file
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuZ29ndWF0ZWxrdGtobm5sdnRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxNTUwNjEsImV4cCI6MjA0NDczMTA2MX0.jTLKPjMErlGCg2yISGuaey_bxejgVTmJIV79Go8kIzU'; // Ensure this is set in your .env file

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
