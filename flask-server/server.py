from flask import Flask
from models.Course import db
from routes.routes_udemy import udemy_bp

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@127.0.0.1:3306/course_management'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
app.register_blueprint(udemy_bp)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)