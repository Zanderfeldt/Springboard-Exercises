from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)


class BadUser(db.Model):
    "Site user."

    __tablename__ = "bad_users"

    id = db.Column(db.Integer, 
                   primary_key=True, 
                   autoincrement=True)

    username = db.Column(db.Text, 
                         nullable=False, 
                         unique=True)

    password = db.Column(db.Text, 
                         nullable=False)
