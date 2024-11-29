from flask import Flask
from flask_cors import CORS
from app.config import supabase
from app.routes import register_blueprints  # Importa a função para registrar os blueprints

def create_app():
    app = Flask(__name__)
    CORS(app, origins=["http://localhost:3000"])

    
    register_blueprints(app) # Registra o blueprint
    return app