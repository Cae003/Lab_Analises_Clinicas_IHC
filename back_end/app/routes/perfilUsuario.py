from flask import Blueprint, jsonify, request
from app.services.getUser_service import get_user_by_register  # Função que busca o usuário no banco
from app.utils.formataData import format_cep, format_cpf, format_date, format_telefone

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/api/profile/<userRegister>', methods=['GET'])
def get_user_profile(userRegister):
    user_data = get_user_by_register(userRegister)  # Função para buscar os dados do usuário no Supabase
    if user_data:
        user_data["cpf"] = format_cpf(user_data["cpf"])
        user_data["cep"] = format_cep(user_data["cep"])
        user_data["datanasc"] = format_date(user_data["datanasc"])
        user_data["telefone1"] = format_telefone(user_data["telefone1"])
        user_data["telefone2"] = format_telefone(user_data["telefone2"]) if user_data.get("telefone2") else None

        return jsonify(user_data), 200
    else:
        return jsonify({"error": "Usuário não encontrado"}), 404
