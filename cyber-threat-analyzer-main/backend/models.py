# Defines the database schema using SQLAlchemy ORM
from __init__ import db  
class Threat(db.Model):
    """Represents a cybersecurity threat record in the database."""
    __tablename__ = 'threats'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(100), nullable=False)
    severity = db.Column(db.String(20), nullable=False)

    def to_dict(self):
        """Returns a dictionary representation of the threat record."""
        return {
            'id': self.id,
            'description': self.description,
            'category': self.category,
            'severity': self.severity
        }
