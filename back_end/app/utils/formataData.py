import re
from datetime import datetime

def format_cpf(cpf):
    cpf = re.sub(r'\D', '', cpf)
    return f'{cpf[:3]}.{cpf[3:6]}.{cpf[6:9]}-{cpf[9:]}'

def format_cep(cep):
    cep = re.sub(r'\D', '', cep)
    return f'{cep[:5]}-{cep[5:]}'

def format_date(date_str):
    date_obj = datetime.strptime(date_str, '%Y-%m-%d')
    return date_obj.strftime('%d/%m/%Y')

def format_telefone(telefone):
    telefone = re.sub(r'\D', '', telefone)
    return f'({telefone[:2]}) {telefone[2:7]}-{telefone[7:11]}'

#Funções para retirar os caracteres não numericos dos dados
def unformat_string(formatted_string):
    return re.sub(r'\D', '', formatted_string)

def unformat_date(formatted_date):
    date_obj = datetime.strptime((formatted_date), '%d/%m/%Y')
    return date_obj.strftime('%Y-%m-%d')
