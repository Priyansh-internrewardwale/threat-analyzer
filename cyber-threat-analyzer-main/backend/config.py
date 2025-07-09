# Configuration settings for Flask app
import os
# Absolute path to a local SQLite file 
basedir = os.path.abspath(os.path.dirname(__file__))
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'threats.db')
SQLALCHEMY_TRACK_MODIFICATIONS = False
SECRET_KEY = 'your-secure-random-secret'  # Optional for sessions/JWT later
