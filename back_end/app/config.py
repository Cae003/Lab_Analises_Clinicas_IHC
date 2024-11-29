from supabase import create_client

# Configurações para Supabase
SUPABASE_URL = "https://bqjtsrwodyiuskkjgicj.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxanRzcndvZHlpdXNra2pnaWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2ODUwMDEsImV4cCI6MjA0MjI2MTAwMX0.Uv4904b4eGouie-326ptreEsEe_Yisnz_1BBs5vjfGk"

# Conecta ao Supabase
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)