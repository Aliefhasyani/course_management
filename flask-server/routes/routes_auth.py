from flask import Blueprint, request, jsonify
from models.User import db, User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter((User.username == data['username']) | (User.email == data['email'])).first():
        return jsonify({'message': 'Username or email already exists'}), 400
    user = User(
    username=data['username'],
    email=data['email'],
    role=data.get('role', 'buyer')  
)
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if user and user.check_password(data['password']):
        return jsonify({'message': 'Login successful', 'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'role': user.role
        }})
    return jsonify({'message': 'Invalid username or password'}), 401