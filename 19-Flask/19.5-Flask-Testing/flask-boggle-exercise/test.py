from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    def setUp(self):
        """To do before every test"""

        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_homepage(self):
        """Test if info is in session and HTML is displayed"""
        with self.client:
            response = self.client.get('/')
            self.assertIn('board', session)
            self.assertIsNone(session.get('highscore'))
            self.assertIsNone(session.get('nplays'))
            self.assertIn(b'<p>High Score:', response.data)
            self.assertIn(b'Score:', response.data)
            self.assertIn(b'Seconds Left:', response.data)

    def test_valid_word(self):
        """Test if word is valid with a modified board in session"""

        with self.client as client:
            with client.session_transaction() as sess:
                sess['board'] = [['B', 'A', 'D', 'D', 'D'],
                                 ['B', 'A', 'D', 'D', 'D'],
                                 ['B', 'A', 'D', 'D', 'D'],
                                 ['B', 'A', 'D', 'D', 'D'],
                                 ['B', 'A', 'D', 'D', 'D']]
        response = self.client.get('/check-word?word=bad')
        self.assertEqual(response.json['result'], 'ok')

    def test_invalid_word(self):
        """Test that invalid word is not in dict"""

        self.client.get('/')
        response = self.client.get('/check-word?word=impossible')
        self.assertEqual(response.json['result'], 'not-on-board')

    def test_non_english_word(self):
        """Test if word is on board"""

        self.client.get('/')
        response = self.client.get('/check-word?word=alksdjasdfgasdf')
        self.assertEqual(response.json['result'], 'not-word')
