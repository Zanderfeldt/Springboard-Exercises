from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, FloatField, TextAreaField, BooleanField, IntegerField
from wtforms.validators import InputRequired, NumberRange, Optional, Length, URL, AnyOf


class AddPetForm(FlaskForm):
    name = StringField("Name", validators=[InputRequired(
        message="Pet name can't be blank")])
    species = SelectField("Species", choices=[
                          ('dog', 'Dog'), ('cat', 'Cat'), ('turtle', 'Turtle')])
    photo_url = StringField("Photo", validators=[Optional(), URL()])
    age = IntegerField("Age", validators=[Optional(), NumberRange(
        min=0, max=30, message="Must be a valid age")])
    notes = TextAreaField("Notes", validators=[Optional(), Length(max=100)])
