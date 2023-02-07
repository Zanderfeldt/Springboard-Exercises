"""Flask app for dessert demo."""

from flask import Flask, request, jsonify
from models import db, connect_db, Dessert

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///desserts'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)


def serialize_dessert(dessert):
    """Serialize a dessert SQLAlchemy obj to dictionary."""

    return {
        "id": dessert.id,
        "name": dessert.name,
        "calories": dessert.calories,
    }

@app.route("/desserts")
def list_all_desserts():
    """Return JSON {'desserts': [{id, name, calories}, ...]}"""

    desserts = Dessert.query.all()
    serialized = [serialize_dessert(d) for d in desserts]

    return jsonify(desserts=serialized)
    # end list_all_desserts

@app.route("/desserts/<dessert_id>")
def list_single_dessert(dessert_id):
    """Return JSON {'dessert': {id, name, calories}}"""

    dessert = Dessert.query.get(dessert_id)
    serialized = serialize_dessert(dessert)

    return jsonify(dessert=serialized)
    # end list_single_dessert

@app.route("/desserts", methods=["POST"])
def create_dessert():
    """Create dessert from form data & return it.

    Returns JSON {'dessert': {id, name, calories}}
    """

    name = request.json["name"]
    calories = request.json["calories"]

    new_dessert = Dessert(name=name, calories=calories)

    db.session.add(new_dessert)
    db.session.commit()

    serialized = serialize_dessert(new_dessert)

    # Return w/status code 201 --- return tuple (json, status)
    return ( jsonify(dessert=serialized), 201 )
    # end create_dessert
