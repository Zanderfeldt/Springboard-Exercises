from models import User, Post, Tag, db
from app import app

db.drop_all()
db.create_all()

User.query.delete()

alan = User(first_name='Alan', last_name='Alda')
joel = User(first_name='Joel', last_name='Burton')
jane = User(first_name='Jane', last_name='Smith')

db.session.add(alan)
db.session.add(joel)
db.session.add(jane)

db.session.commit()

alan_post = Post(title='Hi', content='testtesttesttest', user=alan)

db.session.add(alan)

db.session.commit()
