import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, setUser, cart }) { // Menerima prop 'cart'
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 to-blue-700 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link className="text-white text-2xl font-extrabold tracking-wide" to="/">🎓 Course Manager</Link>
        <div className="flex items-center gap-6">
          <Link className="text-blue-100 hover:text-yellow-300 font-medium transition" to="/">Home</Link>
          <Link className="text-blue-100 hover:text-yellow-300 font-medium transition" to="/courses">Courses</Link>
          
          {user && ( // Hanya tampil jika user login
            <>
              {user.role === 'admin' && ( // Link Admin Panel hanya untuk admin
                <Link className="text-yellow-300 hover:text-white font-medium transition" to="/admin">Admin Panel</Link>
              )}
              
              {/* Link ke halaman Cart dengan jumlah item */}
              <Link className="text-blue-100 hover:text-yellow-300 font-medium transition relative" to="/cart">
                🛒 Cart ({cart.length})
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>

              {/* Tampilan user info dan Logout */}
              <span className="ml-2 text-yellow-200 font-semibold">{user.username} <span className="text-xs bg-blue-800 px-2 py-1 rounded ml-1">{user.role}</span></span>
              <button
                className="ml-4 px-4 py-1 bg-yellow-400 text-blue-900 font-bold rounded hover:bg-yellow-300 transition"
                onClick={() => setUser(null)}
              >
                Logout
              </button>
            </>
          )}

          {!user && ( // Tampilan Login/Register jika belum login
            <>
              <Link className="text-blue-100 hover:text-yellow-300 font-medium transition" to="/login">Login</Link>
              <Link className="text-blue-100 hover:text-yellow-300 font-medium transition" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;