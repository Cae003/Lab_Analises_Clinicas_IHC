from flask import Blueprint
from .login import login_bp  # Importa o blueprint de login
from .perfilUsuario import profile_bp
from .editPerfilUsuario import editProfile_bp
from .createUser import cadastroUser_bp
from .createExame import cadastroExame_bp
from .listarPacientes import pacientes_bp
from .perfilPaciente import perfilPaciente_bp
from .createPaciente import cadastroPaciente_bp
from .editPerfilPaciente import editPerfilPaciente_bp
# Aqui você pode adicionar outros blueprints de rotas.
# Exemplo: from .routes import other_bp

# Registro do blueprint de login
def register_blueprints(app):
    app.register_blueprint(login_bp)
    app.register_blueprint(profile_bp)
    app.register_blueprint(editProfile_bp)
    app.register_blueprint(cadastroUser_bp)
    app.register_blueprint(cadastroExame_bp)
    app.register_blueprint(pacientes_bp)
    app.register_blueprint(perfilPaciente_bp)
    app.register_blueprint(cadastroPaciente_bp)
    app.register_blueprint(editPerfilPaciente_bp)
    # Registre outros blueprints aqui.
    # Exemplo: app.register_blueprint(other_bp)
    