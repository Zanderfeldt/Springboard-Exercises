from flask import Flask, request, render_template, redirect, flash, session
from surveys import satisfaction_survey
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

responses = []

@app.route('/')
def show_survey_home():
    '''Shows survey home page'''

    survey = satisfaction_survey

    title = survey.title
    instructions = survey.instructions

    return render_template('home.html', title=title, instructions=instructions)



@app.route('/begin', methods=["POST"])
def begin_survey():
    """Clear responses on start"""
    responses = []
    

    return redirect('/questions/0')


@app.route('/answer', methods=["POST"])
def record_answer():
    """Record user's answer"""
    
    choice = request.form['answer']
    responses.append(choice)
    
    if (len(responses) == len(satisfaction_survey.questions)):
        return redirect('/complete')
    
    else:
        return redirect(f'/questions/{len(responses)}')


@app.route('/questions/<int:qid>')
def show_question(qid):
    """Display current question"""

    if (responses is None):
        return redirect('/')

    if (len(responses) == len(satisfaction_survey.questions)):
        return redirect('/complete')    

    if (len(responses) != qid):
        flash(f'Invalid question id: {qid}')
        return redirect(f"/questions/{len(responses)}")

    question = satisfaction_survey.questions[qid]
    
    return render_template('questions.html', qid=qid, question=question)


@app.route('/complete')
def show_thanks():
    """Thank user for completing survey"""

    return render_template('complete.html')