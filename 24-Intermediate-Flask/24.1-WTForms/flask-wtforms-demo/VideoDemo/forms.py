from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, BooleanField, IntegerField, RadioField, SelectField
from wtforms.validators import InputRequired, Email, Optional


states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA",
          "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
          "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
          "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
          "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]


class AddSnackForm(FlaskForm):
    email = StringField("Email", validators=[Optional(), Email()])
    name = StringField("Snack Name",  validators=[
                       InputRequired(message="Snack Name can't be blank")])
    price = FloatField("Price in USD")
    quantity = IntegerField("How many?")
    is_healthy = BooleanField("This is a healthy snack")

    # category = RadioField("Category", choices=[
    #                       ('ic', 'Ice Cream'),  ('chips', 'Potato Chips'),  ('candy', 'Candy/Sweets')])
    category = SelectField("Category", choices=[
                          ('ic', 'Ice Cream'),  ('chips', 'Potato Chips'),  ('candy', 'Candy/Sweets')])


class EmployeeForm(FlaskForm):
    name = StringField("Employee Name", validators=[
                       InputRequired(message="Name cannot be blank")])
    state = SelectField('State', choices=[(st, st) for st in states])
    dept_code = SelectField("Department Code")
