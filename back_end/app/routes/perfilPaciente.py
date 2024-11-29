from flask import Blueprint, jsonify
from app.services.getUser_service import get_paciente
from app.utils.formataData import format_cep, format_cpf, format_date, format_telefone

perfilPaciente_bp = Blueprint('perfilPaciente', __name__)

@perfilPaciente_bp.route('/api/paciente/<registropaciente>', methods=['GET'])
def get_perfil_paciente(registropaciente):
    paciente_data = get_paciente(registropaciente)
    if paciente_data:
        paciente_data["cpf"] = format_cpf(paciente_data["cpf"])
        paciente_data["cep"] = format_cep(paciente_data["cep"])
        paciente_data["datanasc"] = format_date(paciente_data["datanasc"])
        paciente_data["telefone1"] = format_telefone(paciente_data["telefone1"])
        paciente_data["telefone2"] = format_telefone(paciente_data["telefone2"]) if paciente_data.get("telefone2") else None

        return jsonify(paciente_data), 200
    else:
        return jsonify({"error": "Usuário não encontrado"}), 404
