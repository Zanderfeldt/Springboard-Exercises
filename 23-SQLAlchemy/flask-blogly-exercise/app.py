"""Blogly application."""

from flask import Flask, request, render_template, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Post, Tag

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
    """Show recent list of posts"""

    posts = Post.query.order_by(Post.created_at.desc()).limit(5).all()
    return render_template('homepage.html', posts=posts)


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

    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    flash(f"User {user.first_name} {user.last_name} deleted!")

    return redirect('/users')

# POST ROUTES----------------------------------------------


@app.route('/users/<int:user_id>/posts/new')
def show_new_post_form(user_id):
    """Show form to add a new post for user"""

    user = User.query.get_or_404(user_id)
    tags = Tag.query.all()
    return render_template('new_post.html', user=user, tags=tags)


@app.route('/users/<int:user_id>/posts/new', methods=['POST'])
def add_new_post(user_id):
    """Adds new post to list of user posts"""

    user = User.query.get_or_404(user_id)
    tag_ids = [int(num) for num in request.form.getlist('tags')]
    tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()

    new_post = Post(title=request.form['title'],
                    content=request.form['content'], user=user, tags=tags)

    db.session.add(new_post)
    db.session.commit()
    flash(f"Post '{new_post.title}' added!")

    return redirect(f"/users/{user.id}")


@app.route('/posts/<int:post_id>')
def show_post(post_id):
    '''Show content for given post'''

    post = Post.query.get_or_404(post_id)

    return render_template('show_post.html', post=post)


@app.route('/posts/<int:post_id>/edit')
def show_edit_post(post_id):
    """Show form to edit post"""

    post = Post.query.get_or_404(post_id)
    tags = Tag.query.all()
    return render_template('edit_post.html', post=post, tags=tags)


@app.route('/posts/<int:post_id>/edit', methods=['POST'])
def edit_post(post_id):
    """Edit information about existing post"""

    post = Post.query.get_or_404(post_id)
    post.title = request.form['title']
    post.content = request.form['content']

    tag_ids = [int(num) for num in request.form.getlist("tags")]
    post.tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()

    db.session.add(post)
    db.session.commit()
    flash(f'Post {post.title} edited!')

    return redirect(f'/users/{post.user_id}')


@app.route('/posts/<int:post_id>/delete', methods=['POST'])
def delete_post(post_id):
    """Delete post"""

    post = Post.query.get_or_404(post_id)

    db.session.delete(post)
    db.session.commit()
    flash(f"Post {post.title} deleted!")

    return redirect(f"/users/{post.user_id}")

# TAG ROUTES -----------------------------------------------


@app.route('/tags')
def tags_index():
    """Show page with all tags"""

    tags = Tag.query.all()
    return render_template('tag_list.html', tags=tags)


@app.route('/tags/new')
def tags_new_form():
    """Show form to create new tag"""

    posts = Post.query.all()
    return render_template('new_tag.html', posts=posts)


@app.route('/tags/new', methods=['POST'])
def tags_new():
    """Handle form submission to create new tag"""

    post_ids = [int(num) for num in request.form.getlist('posts')]
    posts = Post.query.filter(Post.id.in_(post_ids)).all()
    new_tag = Tag(name=request.form['name'], posts=posts)

    db.session.add(new_tag)
    db.session.commit()
    flash(f"Tag '{new_tag.name}' added!")

    return redirect('/tags')


@app.route('/tags/<int:tag_id>')
def show_tag(tag_id):
    """Show page with info on single tag"""

    tag = Tag.query.get_or_404(tag_id)
    return render_template('show_tag.html', tag=tag)


@app.route('/tags/<int:tag_id>/edit')
def tags_edit_form(tag_id):
    """Show form to edit tag"""

    tag = Tag.query.get_or_404(tag_id)
    posts = Post.query.all()
    return render_template('tag_edit.html', tag=tag, posts=posts)


@app.route('/tags/<int:tag_id>/edit', methods=["POST"])
def edit_tag(tag_id):
    """Handle form submission to edit tag"""

    tag = Tag.query.get_or_404(tag_id)
    tag.name = request.form['name']
    post_ids = [int(num) for num in request.form.getlist("posts")]
    tag.posts = Post.query.filter(Post.id.in_(post_ids)).all()

    db.session.add(tag)
    db.session.commit()
    flash(f"Tag '{tag.name}' edited!")

    return redirect('/tags')


@app.route('/tags/<int:tag_id>/delete', methods=["POST"])
def delete_tag(tag_id):
    """Handle form submission to delete tag"""

    tag = Tag.query.get_or_404(tag_id)
    db.session.delete(tag)
    db.session.commit()
    flash(f"Tag '{tag.name}' deleted!")

    return redirect('/tags')
