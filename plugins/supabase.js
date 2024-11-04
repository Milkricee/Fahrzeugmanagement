import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://tynypaolksqfixkiyquo.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5bnlwYW9sa3NxZml4a2l5cXVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3NDA1NTMsImV4cCI6MjA0NjMxNjU1M30.iVr-rK9bpozhG1dxXoFwRhji2m11UL4fBGpqIS4AsBo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('supabase', supabase);
});
