from app import db
from models import User

db.drop_all()
db.create_all()

u = User(name="Jane", email="jane@jane.com")
db.session.add(u)
db.session.commit()
