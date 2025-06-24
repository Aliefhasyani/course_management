from flask import Blueprint, request, jsonify
from models.User import db, User 
from werkzeug.security import generate_password_hash

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'buyer') 

    if not username or not email or not password:
        return jsonify({"message": "Username, email, and password are required!"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"message": "Username already exists."}), 409
    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already registered."}), 409

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, email=email, password=hashed_password, role=role)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully!", "user": new_user.to_dict()}), 201

@auth_bp.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        return jsonify({"message": "Login successful!", "user": {"username": user.username, "role": user.role}}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401