from app.config import supabase

def validate_user_credentials(user_register, password):
    try:
        # Adicione prints para debug
        print("Tentando validar usuário:", user_register)
        
        # Realiza a consulta ao Supabase
        response = supabase.table("usuarios").select("*").eq("userRegister", user_register).execute()
        
        # Verifica a resposta recebida
        if response.data:
            # print("Dados encontrados no Supabase:", response.data)
            user_data = response.data[0]
            
            # Verifica a senha
            if user_data.get("password") == password:
                print("Senha válida para o usuário.")
                return {
                    "is_valid": True,
                    "user_data": {
                        "nome": user_data["nome"],
                        "password": user_data["password"],
                        "userRegister": user_data["userRegister"],
                        "accessLevel": user_data["accessLevel"],
                    }
                }
            else:
                print("Senha inválida para o usuário.")
        
        # Se não encontrou ou a senha está errada
        return {"is_valid": False, "message": "Credenciais inválidas"}
    
    except Exception as e:
        print(f"Erro ao acessar o Supabase: {e}")
        return {"is_valid": False, "message": "Erro no servidor"}
    
