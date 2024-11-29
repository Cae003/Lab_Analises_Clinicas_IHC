from flask import Blueprint, jsonify
from app.config import supabase
from datetime import datetime

pacientes_bp = Blueprint('pacientes', __name__)

def format_date(date_str):
    date_obj = datetime.strptime(date_str, '%Y-%m-%d')
    return date_obj.strftime('%d/%m/%Y')

@pacientes_bp.route('/api/listarPacientes', methods=['GET'])
def get__todos_pacientes():
    try:
        response = supabase.table("pacientes").select("nome, registropaciente, datanasc").execute()
        pacientes = response.data

        pacientes_data = []
        for paciente in pacientes:
            paciente_info = {
                "nome": paciente["nome"],
                "datanasc": paciente["datanasc"].split("T")[0].split("-")[::-1],  # Formata para dd/mm/yyyy
                "registropaciente": paciente["registropaciente"]
            }
            paciente_info["datanasc"] = "/".join(paciente_info["datanasc"])
            pacientes_data.append(paciente_info)
        return jsonify(pacientes_data), 200
    except Exception as e:
        print(f"Erro ao acessar o Supabase: {e}")
        return jsonify({"error": str(e)}), 500