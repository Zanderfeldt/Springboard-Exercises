# Put your app in here.
from flask import Flask, request
from operations import add, sub, mult, div

app = Flask(__name__)


@app.route('/add')
def do_add():
    """add a and b"""
    a = int(request.args['a'])
    b = int(request.args['b'])
    result = add(a, b)
    return str(result)


@app.route('/sub')
def do_sub():
    """subtract b from a"""
    a = int(request.args['a'])
    b = int(request.args['b'])
    result = sub(a, b)
    return str(result)


@app.route('/mult')
def do_mult():
    """multiply a and b"""
    a = int(request.args['a'])
    b = int(request.args['b'])
    result = mult(a, b)
    return str(result)


@app.route('/div')
def do_div():
    """divide a by b"""
    a = int(request.args['a'])
    b = int(request.args['b'])
    result = div(a, b)
    return str(result)

# PART 2: ALL IN ONE


operators = {
    'add': add,
    'sub': sub,
    'mult': mult,
    'div': div
}


@app.route('/math/<oper>')
def do_math(oper):
    """Do math on a and b"""

    a = int(request.args['a'])
    b = int(request.args['b'])
    result = operators[oper](a, b)

    return str(result)
