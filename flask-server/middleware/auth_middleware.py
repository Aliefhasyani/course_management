from functools import wraps
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from models.User import User  # Pastikan import ini sesuai dengan struktur proyek Anda

def token_required(fn):
    """
    Decorator untuk memastikan request memiliki token JWT yang valid.
    Juga mengambil data user dari database dan menyediakannya ke fungsi yang di-wrap.
    """
    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
            identity = get_jwt_identity()
            # Ambil user berdasarkan ID dari token
            current_user = User.query.get(identity['user_id'])
            if not current_user:
                return jsonify({"error": "User not found!"}), 404
            # Kirim objek user ke fungsi yang di-wrap
            return fn(current_user, *args, **kwargs)
        except Exception as e:
            return jsonify({"error": "Token is invalid or expired", "details": str(e)}), 401
    return wrapper

def seller_required(fn):
    """
    Decorator untuk memastikan hanya user dengan peran 'seller' atau 'admin' yang bisa mengakses.
    """
    @wraps(fn)
    @token_required  # Menggunakan token_required untuk mendapatkan data user terlebih dahulu
    def wrapper(current_user, *args, **kwargs):
        if current_user.role.lower() != 'seller' and not current_user.is_admin:
            return jsonify({"error": "A seller account is required for this action"}), 403
        return fn(current_user, *args, **kwargs)
    return wrapper