from flask import Flask, request, render_template, redirect
from flask import session, make_response

app = Flask(__name__)

# Flask uses a secret key to encrypt cookies used to connect
# the browser to the session--so if you want to use sessions,
# you have to have a secret key. If the public learns this
# value, they can forge session information--so for sites with
# security concerns, make sure this isn't checked into a
# public place like GitHub
app.config["SECRET_KEY"] = "4534gdghjk5d#$RGR^HDG"


@app.before_request
def print_cookies():
    """For every single request that comes in, print out request.cookies (printed to terminal)"""
    print("*********************")
    print(request.cookies)
    print("*********************")


@app.route("/")
def index():
    """Homepage."""
    return render_template("index.html")


@app.route("/demo")
def res_demo():
    content = "<h1>HELLO!!</h1>"
    res = make_response(content)
    res.set_cookie("jolly_rancher_flavor", "grape")
    return res


################################################################
# Routes that demonstrate cookies


@app.route("/form-cookie")
def show_form():
    """Show form that prompts for favorite color."""

    return render_template("form-cookie.html")


@app.route("/handle-form-cookie")
def handle_form():
    """Return form response; include cookie for browser."""

    fav_color = request.args["fav_color"]

    # Get HTML to send back. Normally, we'd return this, but
    # we need to do in pieces, so we can add a cookie first
    html = render_template("response-cookie.html", fav_color=fav_color)

    # In order to set a cookie from Flask, we need to deal
    # with the response a bit more directly than usual.
    # First, let's make a response obj from that HTML
    resp = make_response(html)

    # Let's add a cookie to our response. (There are lots of
    # other options here--see the Flask docs for how to set
    # cookie expiration, domain it should apply to, or path)
    resp.set_cookie("fav_color", fav_color)

    return resp


@app.route("/later-cookie")
def later():
    """An example page that can use that cookie."""

    fav_color = request.cookies.get("fav_color", "<unset>")

    return render_template("later-cookie.html", fav_color=fav_color)


################################################################
# Routes that demonstrate sessions


@app.route("/form-session")
def show_sessions_form():
    """Show form that prompts for nickname and lucky number."""

    return render_template("form-session.html")


@app.route("/handle-form-session")
def handle_sessions_form():
    """Return agreeable response and save to session."""

    # Get nickname and lucky number from form and put them
    # into the session--this will automatically trigger Flask's
    # session machinery, so it will now send out a cookie with
    # a session ID. Since we're using the standard
    # "store session data as a cookie", it will include that
    session["nickname"] = request.args["nickname"]
    session["lucky_number"] = int(request.args["lucky_number"])

    # Since we stored this in the session, we don't even need
    # to pass it to the template directly--jinja templates
    # automatically have access to session information
    return render_template("response-session.html")


@app.route("/later-session")
def session_later():
    """An example page that uses that session info."""

    # We could simply get the information from the session
    # directly in our template (as shown in the template
    # for handle_session_form), but we'll demonstrate here
    # that we can also get to the session information in
    # Flask code
    nickname = session.get("nickname", "<no nickname>")

    return render_template("later-session.html", nickname=nickname)


# **************************
# SECRET-INVITE DEMO ROUTES:
# **************************


@app.route("/login-form")
def show_login_form():
    """Show form that prompts users to enter the secret access code"""
    return render_template("login-form.html")


@app.route("/login")
def verify_secret_code():
    """
    Checks to see if the entered access code is correct

    - If the code is incorrect, redirect users back to the login form to try again

    - If the code is correct...
        - set session to indicate that user has access
        - redirect to the secret invite
    """
    SECRET = "chickenz_are_gr8"
    entered_code = request.args["secret_code"]
    if entered_code == SECRET:
        session["entered-pin"] = True
        return redirect("/secret-invite")
    else:
        return redirect("/login-form")


@app.route("/secret-invite")
def show_secret_invite():
    """
    Check to see if session contains 'entered-pin' (if user entered the correct secret code)

    - If it does, render the invite template

    - If session['entered-pin'] is missing or False, redirect user to the form to enter the secret code
    """
    if session.get("entered-pin", False):
        return render_template("invite.html")
    else:
        return redirect("/login-form")
