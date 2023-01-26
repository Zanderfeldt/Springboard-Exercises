"""Blogly application."""

from flask import Flask, request, render_template, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User

app = Flask(__name__)
app.app_context().push()
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'secret'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)
db.create_all()


@app.route('/')
def home_page():
    """For now, redirects to user list"""
    return redirect('/users')


@app.route('/users')
def list_users():
    """Shows list of  all users in db"""
    users = User.query.all()
    return render_template('user_list.html', users=users)


@app.route('/users/new')
def show_new_user_form():
    """Shows form to create a new user"""

    return render_template('new_user.html')


@app.route('/users/new', methods=["POST"])
def create_new_user():
    """Creates a new user"""

    first_name = request.form["firstname"]
    last_name = request.form["lastname"]
    image = request.form["img"]
    image = image if image else None

    new_user = User(first_name=first_name,
                    last_name=last_name, image_url=image)
    db.session.add(new_user)
    db.session.commit()

    return redirect('/users')


@app.route('/users/<int:user_id>')
def show_user(user_id):
    """Show details about a single user"""

    user = User.query.get_or_404(user_id)
    return render_template('user_details.html', user=user)


@app.route('/users/<int:user_id>/edit')
def show_edit_user(user_id):
    """Show page to edit information about an existing user"""

    user = User.query.get_or_404(user_id)
    return render_template('user_edit.html', user=user)


@app.route('/users/<int:user_id>/edit', methods=["POST"])
def edit_user(user_id):
    """Save changes made on edit user page to db"""

    first_name = request.form["firstname"]
    last_name = request.form["lastname"]
    image = request.form["img"]
    image = image if image else None

    user = User.query.get_or_404(user_id)
    user.first_name = first_name
    user.last_name = last_name
    user.image_url = image

    db.session.add(user)
    db.session.commit()

    return redirect('/users')


@app.route('/users/<int:user_id>/delete', methods=['POST'])
def delete_user(user_id):
    """Delete user from database"""

    User.query.filter_by(id=user_id).delete()

    db.session.commit()

    return redirect('/users')
