from flask import Flask, render_template, flash, redirect, render_template
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User

from forms import AddSnackForm
from forms import UserForm

app = Flask(__name__)
app.config["SECRET_KEY"] = "oh-so-secret"
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///flask_wtforms"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

debug = DebugToolbarExtension(app)

connect_db(app)


@app.route("/")
def homepage():
    """Show homepage links."""

    return render_template("index.html")


@app.route("/add", methods=["GET", "POST"])
def add_snack():
    """Snack add form; handle adding."""

    form = AddSnackForm()

    if form.validate_on_submit():
        name = form.name.data
        price = form.price.data
        flash(f"Added {name} at {price}")
        return redirect("/add")

    else:
        return render_template(
            "snack_add_form.html", form=form)


@app.route("/users/<int:uid>/edit", methods=["GET", "POST"])
def edit_user(uid):
    """Show user edit form and handle edit."""

    user = User.query.get_or_404(uid)
    form = UserForm(obj=user)

    if form.validate_on_submit():
        user.name = form.name.data
        user.email = form.email.data
        db.session.commit()
        flash(f"User {uid} updated!")
        return redirect(f"/users/{uid}/edit")

    else:
        return render_template("user_form.html", form=form)
