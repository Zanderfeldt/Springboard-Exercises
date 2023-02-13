"""Example flask app that stores passwords in clear text. Yeck."""

from flask import Flask, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import connect_db, db, BadUser
from forms import RegisterForm, LoginForm

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///hashing_login"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = "abc123"

connect_db(app)
db.create_all()

toolbar = DebugToolbarExtension(app)


@app.route("/")
def homepage():
    """Show homepage with links to site areas."""

    return render_template("index.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user: produce form & handle form submission."""

    form = RegisterForm()

    if form.validate_on_submit():
        name = form.username.data
        pwd = form.password.data

        user = BadUser(username=name, password=pwd)
        db.session.add(user)
        db.session.commit()

        # on successful login, redirect to secret page
        return redirect("/secret")

    else:
        return render_template("register.html", form=form)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Produce login form or handle login."""

    form = LoginForm()

    if form.validate_on_submit():
        name = form.username.data
        pwd = form.password.data

        user = BadUser.query.filter_by(username=name).first()

        if user and user.password == pwd:
            # on successful login, redirect to secret page
            return redirect("/secret")

        else:
            # re-render the login page with an error
            form.username.errors = ["Bad name/password"]

    return render_template("login.html", form=form)
# end_login


@app.route("/secret")
def secret():
    """Example hidden page for logged-in users only."""

    return render_template("secret.html")
