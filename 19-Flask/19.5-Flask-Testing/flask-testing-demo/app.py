"""Simple Flask app to demonstrate some testing."""

from flask import Flask, request, render_template, redirect, session

app = Flask(__name__)
app.config['SECRET_KEY'] = "abc123"


@app.route('/')
def index():
    """Show homepage."""

    # Keep a count of how many times page is visited
    session['count'] = session.get('count', 0) + 1

    return render_template("index.html")


@app.route('/fav-color', methods=['POST'])
def fav_color():
    """Show favorite color."""

    fav_color = request.form.get('color')

    return render_template("color.html", fav_color=fav_color)


@app.route('/redirect-me')
def redirect_me():
    """Redirect user to homepage."""

    return redirect("/")
