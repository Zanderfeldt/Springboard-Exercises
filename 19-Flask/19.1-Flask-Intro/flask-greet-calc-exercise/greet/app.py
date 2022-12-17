from flask import Flask, request

app = Flask(__name__)


@app.route('/welcome')
def welcome_page():
    return 'welcome'


@app.route('/welcome/home')
def welcome_home_page():
    return 'welcome home'


@app.route('/welcome/back')
def welcome_back_page():
    return 'welcome back'
