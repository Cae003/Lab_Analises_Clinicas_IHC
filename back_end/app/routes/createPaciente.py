from flask import Blueprint, jsonify, request
from app.utils.formataData import unformat_date, unformat_string
from datetime import datetime
from app.config import supabase

# Blueprint para as rotas de cadastro de usuário
cadastroPaciente_bp = Blueprint('cadastroPaciente', __name__)

# Função para buscar o próximo userRegister disponível
def get_next_paciente_register():
    try:
        data_atual = datetime.now().strftime("%d%m%y") # Ano, mês e dia atuais
        # Obtém a lista de registros com o accessLevel fornecido
        response = supabase.table('pacientes').select('registropaciente').order('registropaciente', desc=True).limit(1).execute()

        # Caso existam registros, calcula o próximo userRegister
        if response.data:
            last_register = response.data[0]['registropaciente']
            data_registro = last_register[:6]
            sequencia_atual = last_register[6:]
            
            # Verifica se a data do registro corresponde à data atual
            if data_registro != data_atual:
                # Reinicia a sequência se a data não corresponde
                sequencia_nova = "001"
            else:
                # Incrementa a sequência
                sequencia_nova = f"{int(sequencia_atual) + 1:03d}"

            # Cria o próximo registro
            next_register = f"{data_atual}{sequencia_nova}"
        
        return next_register
    except Exception as e:
        return f"{data_atual}001"

@cadastroPaciente_bp.route('/api/paciente/cadastroPaciente', methods=['POST'])
def create_paciente():
    data = request.json
    # print(data)

    try:
        # Dados obrigatórios do cadastro
        paciente_data = {
            "nome": data.get("nome"),
            "nomeSocial": data.get("nomeSocial")if data.get("nomeSocial") else None,
            "datanasc": data.get("datanasc"),
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
            "telefone2": unformat_string(data.get("telefone2")) if data.get("telefone2") else None,
        }

        if paciente_data:
            paciente_register = get_next_paciente_register()

            cadastro = {
                **paciente_data,
                "registropaciente": paciente_register,
            } 
            print(cadastro)
            response = supabase.table('pacientes').insert(cadastro).execute()

            if response.data:
                return jsonify(response.data), 201
            else:
                return jsonify({"error": "Erro ao cadastrar paciente"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500
