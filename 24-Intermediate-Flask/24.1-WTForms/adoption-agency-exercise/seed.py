from models import Pet, db
from app import app

db.drop_all()
db.create_all()

Pet.query.delete()

bob = Pet(name='Bob', species='Dog', photo_url='https://images.unsplash.com/photo-1517849845537-4d257902454a?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8ZG9nfGVufDB8fHx8MTY3NTMwMjEzMw&ixlib=rb-4.0.3&dpr=1&auto=format&fit=crop&w=120&h=200&q=60')
sam = Pet(name='Sam', species='Cat',
          photo_url='https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&dpr=1&auto=format&fit=crop&w=120&h=200&q=60')
pip = Pet(name='Pip', species='Turtle', photo_url='https://images.unsplash.com/photo-1597776941486-054bf5529210?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjc1MzYwNTY2&ixlib=rb-4.0.3&dpr=1&auto=format&fit=crop&w=120&h=200&q=60')

db.session.add_all([bob, sam, pip])
db.session.commit()
