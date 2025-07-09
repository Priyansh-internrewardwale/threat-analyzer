# Ingests threat records from threats_cleaned.csv into the database after initializing schema
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

import csv
from backend import db, create_app
from backend.models import Threat

# Create the Flask app instance
app = create_app()

def ingest():
    with app.app_context():
        db.drop_all()           # Drops existing tables
        db.create_all()         # Creates fresh schema

        # Load cleaned data
        with open('data/threats_cleaned.csv', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                threat = Threat(
                    description=row['description'],  
                    category=row['category'],
                    severity=row['severity']
                )
                db.session.add(threat)

            db.session.commit()  

if __name__ == "__main__":
    ingest()


