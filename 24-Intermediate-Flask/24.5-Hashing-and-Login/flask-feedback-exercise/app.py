from flask import Flask, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from werkzeug.exceptions import Unauthorized
from models import connect_db, db, User, Feedback
from forms import UserForm, LoginForm, DeleteForm, FeedbackForm
from sqlalchemy.exc import IntegrityError


app = Flask(__name__)
app.app_context().push()
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///feedback"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = "abc123"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

connect_db(app)
db.create_all()

toolbar = DebugToolbarExtension(app)


@app.route('/')
def home_page():

    return redirect('/register')


@app.route('/register', methods=['GET', 'POST'])
def register_user():
    """Display and handle form submission to create a new user"""

    if "user" in session:
        return redirect(f"/users/{session['user']}")

    form = UserForm()
    if form.validate_on_submit():

        new_user = User.register(
            form.username.data,
            form.password.data,
            form.email.data,
            form.first_name.data,
            form.last_name.data)
        db.session.add(new_user)
        try:
            db.session.commit()
        except IntegrityError:
            form.username.errors.append("Username already taken")
            return render_template('register.html', form=form)
        session['user'] = new_user.username
        flash('Account Successfully Created!', "success")
        return redirect(f'/users/{new_user.username}')

    return render_template('register.html', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login_user():
    """Show login form"""

    if 'user' in session:
        return redirect(f'/users/{session["user"]}')

    form = LoginForm()
    if form.validate_on_submit():

        user = User.authenticate(form.username.data, form.password.data)
        if user:
            flash(f"Welcome back, {user.username}!", "success")
            session['user'] = user.username
            return redirect(f'/users/{user.username}')
        else:
            form.username.errors = ['Invalid username/password']

    return render_template('login.html', form=form)


@app.route('/logout')
def logout_user():
    session.pop('user')
    flash("Goodbye!", "info")
    return redirect('/')


@app.route('/users/<username>')
def show_user_info(username):
    """Show information about logged in user"""
    if "user" not in session:
        flash("Please login first!", "danger")
        return redirect('/login')

    user = User.query.get_or_404(username)
    form = DeleteForm()
    return render_template('user_info.html', user=user, form=form)


@app.route('/users/<username>/delete', methods=['POST'])
def remove_user(username):
    """Remove user and redirect to login"""

    if 'user' not in session or username != session['user']:
        raise Unauthorized()

    user = User.query.get(username)
    db.session.delete(user)
    db.session.commit()
    session.pop('user')

    return redirect('/login')


@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def add_feedback(username):
    """Display and handle feedback form"""

    if 'user' not in session or username != session['user']:
        flash("You're not authorized to do that!", "danger")
        return redirect('/login')

    form = FeedbackForm()

    if form.validate_on_submit():
        feedback = Feedback(title=form.title.data,
                            content=form.content.data, username=username)
        db.session.add(feedback)
        db.session.commit()

        return redirect(f'/users/{username}')

    else:
        return render_template('add_feedback.html', form=form)


@app.route('/feedback/<int:feedback_id>/update', methods=["GET", "POST"])
def edit_feedback(feedback_id):
    """Display and handle form to update/edit feedback"""

    feedback = Feedback.query.get_or_404(feedback_id)

    if 'user' not in session or feedback.username != session['user']:
        flash("You're not authorized to do that!", "danger")
        return redirect('/login')

    form = FeedbackForm(obj=feedback)

    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data

        db.session.commit()

        return redirect(f'/users/{feedback.username}')

    return render_template('edit_feedback.html', form=form, feedback=feedback)


@app.route('/feedback/<int:feedback_id>/delete', methods=['POST'])
def delete_feedback(feedback_id):
    """Delete feedback from database and page"""

    feedback = Feedback.query.get_or_404(feedback_id)
    if 'user' not in session or feedback.username != session['user']:
        flash("You're not authorized to do that!", "danger")
        return redirect('/login')

    form = DeleteForm()

    if form.validate_on_submit():
        db.session.delete(feedback)
        db.session.commit()

    return redirect(f'/users/{feedback.username}')


@app.route('/secret')
def show_secret():
    """Show secret page"""
    if "user" not in session:
        flash("Please login first!", "danger")
        return redirect('/login')

    return render_template('secret.html')
