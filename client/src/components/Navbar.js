import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Tambahkan useNavigate

function Navbar({ user, setUser, cart }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Inisialisasi navigate

  const closeMenu = () => setIsMenuOpen(false);

  // Fungsi logout yang langsung redirect ke login
  const handleLogout = () => {
    setUser(null);
    closeMenu();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#18122B] via-[#393053] to-[#443C68] shadow-lg border-b-2 border-fuchsia-700/30 font-futuristic">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link className="flex items-center gap-2" to="/" onClick={closeMenu}>
              {/* Futuristic SVG Logo */}
              <span className="relative">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <defs>
                    <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#a21caf" />
                      <stop offset="1" stopColor="#2563eb" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  {/* Play Button Shape */}
                  <polygon
                    points="13,10 32,20 13,30"
                    fill="url(#logo-gradient)"
                    filter="url(#glow)"
                    stroke="#fff"
                    strokeWidth="1.5"
                    opacity="0.95"
                  />
                  {/* Circle Border */}
                  <circle
                    cx="20" cy="20" r="18"
                    stroke="url(#logo-gradient)"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.7"
                  />
                </svg>
              </span>
              <span className="text-fuchsia-400 text-2xl font-extrabold tracking-widest font-futuristic drop-shadow-lg">
                CourseNJZ
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link className="hover:text-fuchsia-400 transition px-3 py-2 rounded-md" to="/">Home</Link>
              <Link className="hover:text-fuchsia-400 transition px-3 py-2 rounded-md" to="/courses">Courses</Link>
              <Link className="hover:text-fuchsia-400 transition px-3 py-2 rounded-md" to="/faqs">FAQ</Link>
              <Link className="hover:text-fuchsia-400 transition px-3 py-2 rounded-md" to="/posts">Posts</Link>
              {(user?.role === 'admin' || user?.role === 'seller') && (
                <Link className="text-fuchsia-400 hover:text-blue-400 font-bold transition px-3 py-2 rounded-md border-b-2 border-fuchsia-400" to="/admin">
                  Admin Panel
                </Link>
              )}
            </div>
          </div>

          {/* Desktop User Info */}
          <div className="hidden md:flex md:items-center md:gap-4">
            {user ? (
              <>
                <Link to="/cart" className="relative p-1 rounded-full text-blue-200 hover:text-fuchsia-400 focus:outline-none transition">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-2 bg-fuchsia-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#18122B]">
                      {cart.length}
                    </span>
                  )}
                </Link>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full ring-2 ring-fuchsia-400">
                      <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}&background=random`} alt="user avatar" />
                    </div>
                  </label>
                  <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 border border-fuchsia-700/30">
                    <li className="p-2 font-semibold">{user.username} <span className="badge badge-sm">{user.role}</span></li>
                    {/* <li><Link to="/profile">Profile</Link></li> */}
                    <li>
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn btn-sm btn-ghost font-futuristic">Login</Link>
                <Link to="/register" className="btn btn-sm btn-primary font-futuristic">Register</Link>
              </div>
            )}
          </div>

          {/* Hamburger for Mobile */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-base-200 inline-flex items-center justify-center p-2 rounded-md text-fuchsia-400 hover:text-blue-400 hover:bg-base-100 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link onClick={closeMenu} className="hover:bg-fuchsia-900/30 hover:text-fuchsia-400 block px-3 py-2 rounded-md text-base font-medium transition" to="/">Home</Link>
          <Link onClick={closeMenu} className="hover:bg-fuchsia-900/30 hover:text-fuchsia-400 block px-3 py-2 rounded-md text-base font-medium transition" to="/courses">Courses</Link>
          <Link onClick={closeMenu} className="hover:bg-fuchsia-900/30 hover:text-fuchsia-400 block px-3 py-2 rounded-md text-base font-medium transition" to="/faqs">FAQ</Link>
          <Link onClick={closeMenu} className="hover:bg-fuchsia-900/30 hover:text-fuchsia-400 block px-3 py-2 rounded-md text-base font-medium transition" to="/posts">Posts</Link>
          {(user?.role === 'admin' || user?.role === 'seller') && (
            <Link onClick={closeMenu} className="text-fuchsia-400 hover:bg-blue-900/30 hover:text-blue-400 block px-3 py-2 rounded-md text-base font-bold border-b-2 border-fuchsia-400" to="/admin">
              Admin Panel
            </Link>
          )}
        </div>
        {/* User Info di Mobile Menu */}
        <div className="pt-4 pb-3 border-t border-fuchsia-700/30">
          {user ? (
            <>
              <div className="px-5 flex items-center justify-between">
                <div>
                  <div className="text-base font-medium leading-none text-fuchsia-300">{user.username}</div>
                  <div className="text-sm font-medium leading-none text-blue-200">{user.role}</div>
                </div>
                <Link to="/cart" onClick={closeMenu} className="relative p-1 rounded-full text-blue-200 hover:text-fuchsia-400 focus:outline-none">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  {cart.length > 0 && <span className="absolute -top-1 -right-2 badge badge-error badge-sm">{cart.length}</span>}
                </Link>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:bg-fuchsia-700 hover:text-white transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="px-2 space-y-1">
              <Link to="/login" onClick={closeMenu} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:bg-fuchsia-900/30">Login</Link>
              <Link to="/register" onClick={closeMenu} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:bg-fuchsia-900/30">Register</Link>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .font-futuristic {
          font-family: 'Orbitron', 'Montserrat', 'Segoe UI', Arial, sans-serif;
          letter-spacing: 2px;
        }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap" rel="stylesheet" />
    </nav>
  );
}

export default Navbar;