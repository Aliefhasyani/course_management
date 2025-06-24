// client/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, setUser }) {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 to-blue-700 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link className="text-white text-2xl font-extrabold tracking-wide" to="/">🎓 Course Manager</Link>
        <div className="flex items-center gap-6">
          <Link className="text-blue-100 hover:text-yellow-300 font-medium transition" to="/">Home</Link>
          {user && user.role === 'admin' && (
            <Link className="text-yellow-300 hover:text-white font-medium transition" to="/admin">Admin Panel</Link>
          )}
          {!user && (
            <>
              <Link className="text-blue-100 hover:text-yellow-300 font-medium transition" to="/login">Login</Link>
              <Link className="text-blue-100 hover:text-yellow-300 font-medium transition" to="/register">Register</Link>
            </>
          )}
          {user && (
            <>
              <span className="ml-2 text-yellow-200 font-semibold">{user.username} <span className="text-xs bg-blue-800 px-2 py-1 rounded ml-1">{user.role}</span></span>
              <button
                className="ml-4 px-4 py-1 bg-yellow-400 text-blue-900 font-bold rounded hover:bg-yellow-300 transition"
                onClick={() => setUser(null)}
              >
                Logout
              </button>
              {/* Tambahkan link ke keranjang */}
              <Link to="/cart" className="text-blue-100 hover:text-yellow-300 font-medium transition">
                Keranjang
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;