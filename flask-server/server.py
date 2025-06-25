from flask import Flask
from models.Course import db
from routes.routes_udemy import udemy_bp
from routes.routes_auth import auth_bp
from flask_cors import CORS
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@127.0.0.1:3306/course_management'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'very-very-long-random-secret-key-haha'  
jwt = JWTManager(app)

db.init_app(app)
app.register_blueprint(udemy_bp)
app.register_blueprint(auth_bp)





if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)