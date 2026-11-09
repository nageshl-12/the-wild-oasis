import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://hovamjuoqexoukogzrtt.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvdmFtanVvcWV4b3Vrb2d6cnR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5MjUyNDMsImV4cCI6MjEwNjUwMTI0M30.jS-dcdMSF5OaXjMeUQAK2R7Xvu_QxQcRnWOxVvDjUvk';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
export { supabaseUrl };
