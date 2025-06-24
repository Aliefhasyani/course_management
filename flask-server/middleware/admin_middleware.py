from functools import wraps
from flask import request, jsonify

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        role = request.headers.get('Role')
        if role != 'admin':
            return jsonify({'message': 'Admins only!'}), 403
        return f(*args, **kwargs)
    return decorated_function