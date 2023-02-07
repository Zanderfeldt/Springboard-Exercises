from unittest import TestCase

from app import app
from models import db, Dessert

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///desserts_test'
app.config['SQLALCHEMY_ECHO'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

db.drop_all()
db.create_all()


class DessertViewsTestCase(TestCase):
    """Tests for views about desserts."""

    def setUp(self):
        """Make demo data."""

        Dessert.query.delete()
        db.session.commit()

        dessert = Dessert(name='TestCake', calories=10)
        db.session.add(dessert)
        db.session.commit()

        self.dessert_id = dessert.id

    def tearDown(self):
        """Clean up fouled transactions."""

        db.session.rollback()

    def test_all_desserts(self):
        with app.test_client() as client:
            resp = client.get("/desserts")
            self.assertEqual(resp.status_code, 200)

            self.assertEqual(
                resp.json,
                {'desserts': [{
                    'id': self.dessert_id,
                    'name': 'TestCake',
                    'calories': 10
                }]})

    def test_get_single_dessert(self):
        with app.test_client() as client:
            resp = client.get(f"/desserts/{self.dessert_id}")
            self.assertEqual(resp.status_code, 200)

            self.assertEqual(
                resp.json,
                {'dessert': {
                    'id': self.dessert_id,
                    'name': 'TestCake',
                    'calories': 10}})

    def test_create_dessert(self):
        with app.test_client() as client:
            resp = client.post(
                "/desserts", json={
                    "name": "TestCake2",
                    "calories": 20,
                })
            self.assertEqual(resp.status_code, 201)

            # don't know what ID it will be, so test then remove
            self.assertIsInstance(resp.json['dessert']['id'], int)
            del resp.json['dessert']['id']

            self.assertEqual(
                resp.json,
                {"dessert": {'name': 'TestCake2', 'calories': 20}})

            self.assertEqual(Dessert.query.count(), 2)
