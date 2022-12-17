# python3 -m venv venv
# source venv/bin/activate
# (venv)$ pip3 install flask
# (venv)$ flask run


# if file is not named 'app.py', in console you must run
# FLASK_APP='name_of_file.py' flask run

# DEVELOPMENT MODE:
# FLASK_ENV=development flask run
# after you can set variable: export FLASK_ENV=development

from flask import Flask, request

app = Flask(__name__)


@app.route('/')
def home_page():
    html = """
    <html>
      <body>
        <h1>Home Page</h1>
        <p>Welcome to my simple app!</p>
        <a href='/hello'>Go to hello page</a>
      </body>
    </html>
    """
    return html


@app.route('/hello')
def say_hello():
    html = """
    <html>
      <body>
        <h1>Hello!</h1>
      </body>
    </html>
    """
    return html


@app.route('/goodbye')
def say_goodbye():
    return "GOODBYE!"


@app.route('/search')
def search():
    term = request.args["term"]
    return f"<h1>Search Results For: {term}</h1>"


# @app.route("/post", methods=["POST"])
# def post_demo():
#     return "YOU MADE A POST REQUEST!"

# @app.route("/get", methods=["GET"])
# def get_demo():
#     return "YOU MADE A GET REQUEST!"

@app.route('/add-comment')
def add_comment_form():
    return """
      <form method="POST">
        <input type='text' placeholder='comment' name='comment'/>
        <input type='text' placeholder='username' name='username'/>
        <button>Submit</button>
      </form>
    """


@app.route('/add-comment', methods=["POST"])
def save_comment():
    comment = request.form["comment"]
    username = request.form["username"]
    print(request.form)
    return f"""
      <h1>SAVED YOUR COMMENT WITH TEXT OF {comment}!</h1>
      <ul>
        <li>Username: {username}</li>
        <li>Comment: {comment}</li>
      </ul>
      """


# declaring route with variable IN it, denoted by '<>'

@app.route('/r/<subreddit>')
def show_subreddit(subreddit):
    return f"<h1>Browsing the {subreddit} Subreddit</hi>"


@app.route('/r/<subreddit>/comments/<int:post_id>')
def show_comments(subreddit, post_id):
    return f"<h1>Viewing comments for post with id: {post_id} from the {subreddit} Subreddit</h1>"


POSTS = {
    1: 'I like chicken tenders',
    2: 'I hate mayo!',
    3: 'Double rainbow all the way',
    4: 'YOLO OMG (kill me)'
}

# use 'int:' to make route variable a number instead of string


@app.route('/posts/<int:id>')
def find_post(id):
    post = POSTS.get(id, "Post not found")
    return f"<p>{post}</p>"
