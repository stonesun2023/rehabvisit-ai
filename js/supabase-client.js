import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_URL = 'https://euqcngqpbeigbpggmzan.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1cWNuZ3FwYmVpZ2JwZ2dtemFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3OTY5NTUsImV4cCI6MjA4NzM3Mjk1NX0.gdmccnZZn1gM8TvbJWqLsTwyEN_Z0l2wCYuobIygvsc'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)