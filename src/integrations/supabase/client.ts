// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://twxxexxeojjhbaokjjgz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3eHhleHhlb2pqaGJhb2tqamd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5NDAwNjUsImV4cCI6MjA2MDUxNjA2NX0.MdDAHAxciAkFlWua13J-oZv7rYkv7vAg9aHxp3NKAFs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);