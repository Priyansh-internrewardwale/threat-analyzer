# Initializes Flask app and SQLAlchemy
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('config.py')

    CORS(app)  

    db.init_app(app)

    from routes import bp as routes_bp
    app.register_blueprint(routes_bp)

    return app
