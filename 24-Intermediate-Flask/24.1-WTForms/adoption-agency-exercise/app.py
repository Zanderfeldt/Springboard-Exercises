from flask import Flask, request, render_template,  redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Pet
from forms import AddPetForm

app = Flask(__name__)
app.app_context().push()
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adopt'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)
db.create_all


@app.route('/')
def show_pets():
    """Show list of pets at adoption agency"""

    pets = Pet.query.all()
    return render_template('pets.html', pets=pets)


@app.route('/add', methods=["GET", "POST"])
def add_pet():
    """Show form and handle submission of new pet"""

    form = AddPetForm()

    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        photo_url = form.photo_url.data
        age = form.age.data
        notes = form.notes.data
        pet = Pet(name=name, species=species,
                  photo_url=photo_url, age=age, notes=notes)

        db.session.add(pet)
        db.session.commit()
        flash(f"{name} the {species} has been put up for adoption!")
        return redirect('/')
    else:
        return render_template('add_pet_form.html', form=form)


@app.route('/<int:pet_id>', methods=["GET", "POST"])
def edit_pet(pet_id):
    """Show page of details for specific pet and form to edit"""

    pet = Pet.query.get_or_404(pet_id)
    form = AddPetForm(obj=pet)

    if form.validate_on_submit():
        pet.name = form.name.data
        pet.species = form.species.data
        pet.photo_url = form.photo_url.data
        pet.age = form.age.data
        pet.notes = form.notes.data
        db.session.commit()
        flash(f"{pet.name} has been updated!")
        return redirect('/')
    else:
        return render_template('/edit_pet_form.html', form=form, pet=pet)
