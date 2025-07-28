import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xqygsqdprsvhrhymrjym.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxeWdzcWRwcnN2aHJoeW1yanltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MDAyMDksImV4cCI6MjA2OTI3NjIwOX0.QGqpUo81C5AXtxgp2nbrb5h0CyShyR2JG7zyPhtPtIo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
