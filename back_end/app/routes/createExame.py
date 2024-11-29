from flask import Blueprint, jsonify, request
from datetime import datetime
from app.config import supabase

# Blueprint para as rotas de cadastro de usuário
cadastroExame_bp = Blueprint('cadastroExame', __name__)

# Função para buscar o próximo userRegister disponível
def get_next_exame_register():
    try:
        prefixo = "LAB01"
        data_atual = datetime.now().strftime("%Y%m%d") # Ano, mês e dia atuais
        # Obtém a lista de registros com o accessLevel fornecido
        response = supabase.table('exames').select('exameRegister').order('exameRegister', desc=True).limit(1).execute()

        # Caso existam registros, calcula o próximo userRegister
        if response.data:
            last_register = response.data[0]['exameRegister']
            prefixo, data_registro, sequencia_atual = last_register.split("-")
            
            # Verifica se a data do registro corresponde à data atual
            if data_registro != data_atual:
                # Reinicia a sequência se a data não corresponde
                sequencia_nova = "0001"
            else:
                # Incrementa a sequência
                sequencia_nova = f"{int(sequencia_atual) + 1:04d}"  # Incrementa e mantém 4 dígitos

            # Cria o próximo registro
            next_register = f"{prefixo}-{data_atual}-{sequencia_nova}"
        
        return next_register
    except Exception as e:
        return f"{prefixo}-{data_atual}-0001"
        

@cadastroExame_bp.route('/api/exame/cadastroExame', methods=['POST'])
def create_exame():
    data = request.json
    # print(data)

    try:
        # Dados obrigatórios do cadastro
        exame_data = {
            "registropaciente": data.get("registroPaciente"),
            "nomeSolicitante": data.get("nomeSolicitante"),
            "dataAtendimento": data.get("dataAtendimento"),
            "horarioAtendimento": data.get("horarioAtendimento"),
            "cnesnomeunidade": data.get("cnesnomeunidade"),
            "exameSolicitado": data.get("exameSolicitado"),
            "materialBio": data.get("materialBio") if data.get("materialBio") else None,
            "horarioColeta": data.get("horarioColetaMatBio") if data.get("horarioColetaMatBio") else None,
            "infoAdicionais": data.get("infoAdicionais") if data.get("infoAdicionais") else None,
            "profExecutaCad": data.get("nomePCadastro"),
            "previsaoEntrega": data.get("dataEntregaLaudo") if data.get("dataEntregaLaudo") else None,
            "urgencia": data.get("indicacaoUrgencia") if data.get("indicacaoUrgencia") else None,
            "infoPaciente": data.get("infoRelevantesPaciente") if data.get("infoRelevantesPaciente") else None,
        }

        if exame_data:
            exame_register = get_next_exame_register()

            cadastro = {
                **exame_data,
                "exameRegister": exame_register
            } 
            response = supabase.table('exames').insert(cadastro).execute()
            print(response.data)

            if response.data:
                return jsonify(response.data), 201
            else:
                return jsonify({"error": "Erro ao cadastrar exame"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500
