from flask import Blueprint, request, jsonify
from models.User import db, User 
from werkzeug.security import generate_password_hash
from flask_jwt_extended import create_access_token


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
        access_token = create_access_token(identity=str(user.id), additional_claims={"role": user.role})
        return jsonify({
            "message": "Login successful!",
            "access_token": access_token,
            "user": user.to_dict()
        }), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401



@auth_bp.route('/auth/users', methods=['GET'])

def get_all_users():
    users = User.query.all()
    users_data = [user.to_dict() for user in users]
    return jsonify(users_data), 200

@auth_bp.route('/auth/users', methods=['POST'])
def admin_create_user():
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

    return jsonify({"message": "User created successfully!", "user": new_user.to_dict()}), 201

@auth_bp.route('/auth/users/<int:user_id>', methods=['PUT'])

def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()

    if not data:
        return jsonify({"message": "No data provided for update."}), 400

    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    
    
    new_password = data.get('password')
    if new_password:
        user.set_password(new_password) 

    if 'role' in data:
     
        valid_roles = ['seller', 'buyer', 'admin']
        if data['role'] not in valid_roles:
            return jsonify({"message": f"Invalid role. Must be one of {valid_roles}."}), 400
        user.role = data['role']

    db.session.commit()
    return jsonify({"message": "User updated successfully!", "user": user.to_dict()}), 200

@auth_bp.route('/auth/users/<int:user_id>', methods=['DELETE'])

def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully!"}), 200