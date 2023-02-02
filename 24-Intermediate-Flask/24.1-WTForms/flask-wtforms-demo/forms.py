"""Forms for our demo Flask app."""

from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import InputRequired, Optional, Email


class AddSnackForm(FlaskForm):
    """Form for adding snacks."""

    name = StringField("Snack Name")
    price = FloatField("Price in USD")


class UserForm(FlaskForm):
    """Form for adding/editing friend."""

    name = StringField("Name",
                       validators=[InputRequired()])
    email = StringField("Email Address",
                        validators=[Optional(), Email()])
