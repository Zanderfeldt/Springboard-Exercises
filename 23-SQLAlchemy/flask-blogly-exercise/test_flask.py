from unittest import TestCase

from app import app
from models import db, User, Post, Tag

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

app.config['TESTING'] = True

app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()


# class UserViewsTestCase(TestCase):
#     """Tests for views for different User funcitonality pages"""

#     def setUp(self):
#         """Add sample user"""

#         User.query.delete()

#         user = User(first_name="Bob", last_name="Smith",
#                     image_url="https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg")
#         db.session.add(user)
#         db.session.commit()

#         self.user_id = user.id
#         self.user = user

#     def tearDown(self):
#         """Clean up any fouled transaction"""

#         db.session.rollback()

#     def test_user_list(self):
#         with app.test_client() as client:
#             resp = client.get('/users')
#             html = resp.get_data(as_text=True)

#             self.assertEqual(resp.status_code, 200)
#             self.assertIn('<h1>Users</h1>', html)

#     def test_show_user_details(self):
#         with app.test_client() as client:
#             resp = client.get(f'/users/{self.user_id}')
#             html = resp.get_data(as_text=True)

#             self.assertEqual(resp.status_code, 200)
#             self.assertIn('Bob', html)
#             self.assertIn(self.user.last_name, html)
#             self.assertIn(self.user.image_url, html)

#     def test_add_user(self):
#         with app.test_client() as client:
#             d = {"firstname": "Bill", "lastname": "Mathers",
#                  "img": "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg"}
#             resp = client.post('/users/new', data=d, follow_redirects=True)
#             html = resp.get_data(as_text=True)

#             self.assertEqual(resp.status_code, 200)
#             self.assertIn('Bill', html)

#     def test_edit_user(self):
#         with app.test_client() as client:
#             resp = client.get(f'/users/{self.user_id}/edit')
#             html = resp.get_data(as_text=True)

#             self.assertEqual(resp.status_code, 200)
#             self.assertIn('<h1>Edit User</h1>', html)
#             self.assertIn(
#                 '<input type="text" id="firstname" name="firstname" placeholder="Bob">', html)


class PostViewsTestCase(TestCase):
    """Test views for posts"""

    def setUp(self):

        user = User(first_name="Test", last_name="User",
                    image_url="https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg")

        db.session.add(user)
        db.session.commit()

        self.user_id = user.id
        self.user = user

        """Add sample post before every test method"""
        Post.query.delete()

        post = Post(title="Test", content="blablabla", user_id=self.user_id)

        db.session.add(post)
        db.session.commit()

        self.post_id = post.id
        self.post = post

    def tearDown(self):

        db.session.rollback()

    def test_create_post(self):
        with app.test_client() as client:
            d = {"title": "Test", "content": "Just a test",
                 "user_id": self.user_id}

            resp = client.post(
                f"/users/{self.user_id}/posts/new", data=d, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("<h1>Test User</h1>", html)

    def test_show_post(self):
        with app.test_client() as client:
            resp = client.get(f'/posts/{self.post_id}', follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Show Post Page', html)
