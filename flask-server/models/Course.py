from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sku = db.Column(db.String(100))
    pic = db.Column(db.String(500))
    title = db.Column(db.String(255), nullable=False)
    coupon = db.Column(db.String(500))
    org_price = db.Column(db.String(50))
    description = db.Column(db.Text)
    category = db.Column(db.String(255))
    language = db.Column(db.String(50))
    platform = db.Column(db.String(50))
    rating = db.Column(db.Float)
    duration = db.Column(db.Integer)
    expiry = db.Column(db.String(100))
    savedtime = db.Column(db.String(100))