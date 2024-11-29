from flask import Blueprint, jsonify, request
from app.config import supabase
from app.utils.formataData import unformat_date, unformat_string

editPerfilPaciente_bp = Blueprint('editPerfilPaciente', __name__)

@editPerfilPaciente_bp.route('/api/paciente/update/<string:registropaciente>', methods=['PUT'])
def update_perfil_Paciente(registropaciente):
    data = request.json

    try:
        # Extrai as informações a serem atualizadas
        update_data = {
            "nome": data.get("nome"),
            "nomeSocial": data.get("nomeSocial")if data.get("nomeSocial") else None,            
            "datanasc": unformat_date(data.get("datanasc")),
            "cpf": unformat_string(data.get("cpf")),
            "nomeMae": data.get("nomeMae"),
            "nomeResponsavel": data.get("nomeResponsavel") if data.get("nomeResponsavel") else None,
            "sexo": data.get("sexo"),
            "endereco": data.get("endereco"),
            "cidade": data.get("cidade"),
            "bairro": data.get("bairro"),
            "cep": unformat_string(data.get("cep")),
            "email": data.get("email"),
            "telefone1": unformat_string(data.get("telefone1")),
            "telefone2": unformat_string(data.get("telefone2")) if data.get("telefone2") else None
        }

        # Atualiza os dados no banco de dados com base no `user_register`
        response = supabase.table('pacientes').update(update_data).eq('registropaciente', registropaciente).execute()
        # print(response)

        if response.data:
            return jsonify(response.data), 200
        else:
            return jsonify({"error": "Erro ao atualizar perfil"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500
