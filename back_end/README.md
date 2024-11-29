project/
│
├── backend/                        # Código do back-end
│   │
│   ├── .venv/                       # Ambiente virtual do back-end
│   │                               # Contém bibliotecas instaladas para o Flask e outras dependências
│   │
│   ├── app/                        # Código principal do aplicativo Flask
│   │   ├── __init__.py             # Inicializa a aplicação Flask e configurações iniciais
│   │   ├── models/                 # Modelos de dados e consultas ao Supabase
│   │   │   ├── __init__.py
│   │   │   └── supabase_models.py  # Classes ou funções para manipulação de dados com o Supabase
│   │   │
│   │   ├── routes/                 # Rotas da aplicação
│   │   │   ├── __init__.py
│   │   │   ├── api_routes.py       # Endpoints da API que o React consome
│   │   │   └── auth_routes.py      # Endpoints de autenticação e autorização
│   │   │
│   │   ├── services/               # Lógica de negócios e serviços da aplicação
│   │   │   ├── __init__.py
│   │   │   └── exam_service.py     # Lógica específica para manipulação de exames
│   │   │
│   │   ├── schemas/                # Schemas para validação de dados (ex.: com Marshmallow)
│   │   │   ├── __init__.py
│   │   │   └── exam_schema.py      # Validação dos dados dos exames recebidos
│   │   │
│   │   ├── utils/                  # Funções auxiliares para diferentes partes do código
│   │   │   ├── __init__.py
│   │   │   └── helper_functions.py # Funções auxiliares, como formatação de dados
│   │   │
│   │   └── config.py               # Configurações do projeto, incluindo integração com Supabase, CORS, etc.
│   │
│   ├── migrations/                 # Migrações de banco de dados (se precisar versionar o banco)
│   │
│   ├── static/                     # Arquivos estáticos que o back-end precisa servir, como imagens
│   │
│   ├── tests/                      # Testes unitários e de integração
│   │   ├── __init__.py
│   │   └── test_routes.py          # Testes para as rotas da API
│   │
│   ├── .env                        # Variáveis de ambiente, como chaves e URLs do Supabase (não versionado)
│   ├── requirements.txt            # Lista de dependências do Python usadas no back-end
│   ├── wsgi.py                     # Configuração para servidores de produção, como Gunicorn
│   └── run.py                      # Arquivo para rodar o servidor Flask em desenvolvimento

Sempre que copiar o repositorio realizar as seguintes configurações:
    - cd .\back_end
    
    Tirei a necessidade de criar o ambiente virtual

Para instalar todas a dependencias existentes do projeto usando o requirements: 
    - pip install -r requirements.txt
Para atualizar o arquivo requirements.txt com novas bibliotecas instaladas segue codigo de uso no terminal:
    - pip freeze > requirements.txt

Para rodar o back_end:
    - python run.py
