from flask import Blueprint, jsonify, request
from app.config import supabase
from app.utils.formataData import unformat_date, unformat_string

editProfile_bp = Blueprint('editProfile', __name__)

@editProfile_bp.route('/api/profile/update/<string:userRegister>', methods=['PUT'])
def update_profile(userRegister):
    data = request.json

    try:
        # Extrai as informações a serem atualizadas
        update_data = {
            "nome": data.get("nome"),
            "datanasc": unformat_date(data.get("datanasc")),
            "password": data.get("password"),
            "sexo": data.get("sexo"),
            "endereco": data.get("endereco"),
            "cep": unformat_string(data.get("cep")),
            "cidade": data.get("cidade"),
            "bairro": data.get("bairro"),
            "email": data.get("email"),
            "telefone1": unformat_string(data.get("telefone1")),
            "telefone2": unformat_string(data.get("telefone2")) if data.get("telefone2") else None
        }
        print("Update: ",update_data)

        # Atualiza os dados no banco de dados com base no `user_register`
        response = supabase.table('usuarios').update(update_data).eq('userRegister', userRegister).execute()

        if response.data:
            return jsonify(response.data), 200
        else:
            return jsonify({"error": "Erro ao atualizar perfil"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500
