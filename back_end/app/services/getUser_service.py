from app.config import supabase

def get_user_by_register(userRegister):
    try:
        response = supabase.table("usuarios").select("*").eq("userRegister", userRegister).execute()
        if response.data:
            return response.data[0]  # Retorna o primeiro resultado encontrado
        return None
    except Exception as e:
        print(f"Erro ao acessar o Supabase: {e}")
        return None

def get_paciente(registropaciente):
    try:
        response = supabase.table("pacientes").select("*").eq("registropaciente", registropaciente).execute()
        if response.data:
            return response.data[0]
        return None
    except Exception as e:
        print(f"Erro ao acessar o Supabase: {e}")
        return None