from flask import Flask, request, jsonify, render_template

from models import db, connect_db, Todo

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///todos_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = "oh-so-secret"

connect_db(app)


@app.route('/')
def index_page():
    """Renders html template that includes some JS - NOT PART OF JSON API!"""
    todos = Todo.query.all()
    return render_template('index.html', todos=todos)

# *****************************
# RESTFUL TODOS JSON API
# *****************************
@app.route('/api/todos')
def list_todos():
    """Returns JSON w/ all todos"""
    all_todos = [todo.serialize() for todo in Todo.query.all()]
    return jsonify(todos=all_todos)


@app.route('/api/todos/<int:id>')
def get_todo(id):
    """Returns JSON for one todo in particular"""
    todo = Todo.query.get_or_404(id)
    return jsonify(todo=todo.serialize())


@app.route('/api/todos', methods=["POST"])
def create_todo():
    """Creates a new todo and returns JSON of that created todo"""
    new_todo = Todo(title=request.json["title"])
    db.session.add(new_todo)
    db.session.commit()
    response_json = jsonify(todo=new_todo.serialize())
    return (response_json, 201)


@app.route('/api/todos/<int:id>', methods=["PATCH"])
def update_todo(id):
    """Updates a particular todo and responds w/ JSON of that updated todo"""
    todo = Todo.query.get_or_404(id)
    todo.title = request.json.get('title', todo.title)
    todo.done = request.json.get('done',  todo.done)
    db.session.commit()
    return jsonify(todo=todo.serialize())


@app.route('/api/todos/<int:id>', methods=["DELETE"])
def delete_todo(id):
    """Deletes a particular todo"""
    todo = Todo.query.get_or_404(id)
    db.session.delete(todo)
    db.session.commit()
    return jsonify(message="deleted")
