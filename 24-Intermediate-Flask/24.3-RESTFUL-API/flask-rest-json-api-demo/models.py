"""Model classes for desserts app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Dessert(db.Model):
    """Dessert."""

    __tablename__ = "dessert"

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True,
    )

    name = db.Column(
        db.String(50),
        nullable=False,
        unique=True
    )

    calories = db.Column(
        db.Integer(),
        nullable=False
    )


def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)
