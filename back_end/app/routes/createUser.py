from flask import Blueprint, jsonify, request
from app.utils.formataData import unformat_string
import random
import string
from app.config import supabase

# Blueprint para as rotas de cadastro de usuário
cadastroUser_bp = Blueprint('cadastroUser', __name__)

# Função para gerar uma senha aleatória
def generate_random_password():
    # Definir comprimento fixo da senha (mínimo 8)
    length = 8

    upper = random.choice(string.ascii_uppercase)
    lower = random.choice(string.ascii_lowercase)
    digit = random.choice(string.digits)
    special = random.choice(string.punctuation)

    # Preencher o restante com caracteres aleatórios
    remaining_length = length - 4
    remaining_characters = string.ascii_letters + string.digits
    remaining = ''.join(random.choice(remaining_characters) for _ in range(remaining_length))

    # Combinar todos os caracteres e embaralhar a ordem
    password = upper + lower + digit + special + remaining
    password_list = list(password)
    random.shuffle(password_list)
    senha = ''.join(password_list)

    return senha

# Função para buscar o próximo userRegister disponível
def get_next_user_register(accessLevel):
    try:
        # Obtém a lista de registros com o accessLevel fornecido
        response = supabase.table('usuarios').select('userRegister').eq('accessLevel', accessLevel).order('userRegister', desc=True).limit(1).execute()

        # Caso existam registros, calcula o próximo userRegister
        if response.data:
            last_register = response.data[0]['userRegister']
            next_register = str(int(last_register) + 1).zfill(6)  # Incrementa o número e preenche com zeros à esquerda
        else:
            # Caso não existam registros, começa do valor inicial para o accessLevel específico
            access_initials = {"Recepcionista": "010001", "Tecnico": "020001", "Analista": "030001"}  # Exemplo de inicialização para diferentes accessLevels
            next_register = access_initials.get(accessLevel, "020001")  # Default para "020001"

        return next_register
    except Exception as e:
        raise Exception(f"Erro ao buscar userRegister: {str(e)}")

@cadastroUser_bp.route('/api/user/cadastroUser', methods=['POST'])
def register_user():
    data = request.json

    try:
        # Dados obrigatórios do cadastro
        user_data = {
            "nome": data.get("nome"),
            "datanasc": data.get("datanasc"),
            "cpf": unformat_string(data.get("cpf")),
            "sexo": data.get("sexo"),
            "accessLevel": data.get("accessLevel"),
            "endereco": data.get("endereco"),
            "cidade": data.get("cidade"),
            "bairro": data.get("bairro"),
            "cep": unformat_string(data.get("cep")),
            "email": data.get("email"),
            "telefone1": unformat_string(data.get("telefone1")),
            "telefone2": unformat_string(data.get("telefone2")) if data.get("telefone2") else None,
        }

        if user_data:
            accessLevel = user_data.get('accessLevel')
            next_user_register = get_next_user_register(accessLevel)
            random_password = generate_random_password()

            cadastro = {
                **user_data,
                "userRegister": next_user_register,
                "password": random_password
            } 
            response = supabase.table('usuarios').insert(cadastro).execute()

            if response.data:
                return jsonify(response.data), 201
            else:
                return jsonify({"error": "Erro ao cadastrar usuário"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500
