from flask import request, jsonify, Blueprint
from app.services.auth_service import validate_user_credentials

login_bp = Blueprint("login", __name__)

@login_bp.route("/api/login", methods=["POST"])
def login():
    data = request.json
    user_register = data.get("userRegister")
    password = data.get("password")

    # Chama o serviço de autenticação
    result = validate_user_credentials(user_register, password)

    if result["is_valid"]:
        # Se as credenciais são válidas, retorna os dados do usuário
        return jsonify(result["user_data"]), 200
    else:
        # Caso contrário, retorna uma mensagem de erro
        return jsonify({"error": result["message"]}), 401