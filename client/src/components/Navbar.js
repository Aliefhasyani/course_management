import React, { useState } from 'react'; // 1. Impor useState
import { Link } from 'react-router-dom';

function Navbar({ user, setUser, cart }) {
  // 2. State untuk mengontrol visibilitas menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fungsi untuk menutup menu saat link di-klik (opsional tapi bagus untuk UX)
  const closeMenu = () => setIsMenuOpen(false);

  return (
    // Menggunakan bg-base-300 dari DaisyUI untuk konsistensi dengan tema Home baru
    <nav className="sticky top-0 z-50 bg-base-300 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Bagian Kiri: Logo */}
          <div className="flex-shrink-0">
            <Link className="text-primary text-2xl font-bold tracking-wide" to="/" onClick={closeMenu}>
              🎓 CourseMgr
            </Link>
          </div>

          {/* Bagian Tengah: Menu untuk Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link className="text-base-content hover:text-primary font-medium transition px-3 py-2 rounded-md" to="/">Home</Link>
              <Link className="text-base-content hover:text-primary font-medium transition px-3 py-2 rounded-md" to="/courses">Courses</Link>
              <Link className="text-base-content hover:text-primary font-medium transition px-3 py-2 rounded-md" to="/faqs">FAQ</Link>
              <Link className="text-base-content hover:text-primary font-medium transition px-3 py-2 rounded-md" to="/posts">Posts</Link>
              {user?.role === 'admin' && (
                <Link className="text-accent hover:text-primary font-bold transition px-3 py-2 rounded-md" to="/admin">Admin Panel</Link>
              )}
            </div>
          </div>

          {/* Bagian Kanan: Ikon & User Info untuk Desktop */}
          <div className="hidden md:flex md:items-center md:gap-4">
            {user ? (
              <>
                <Link to="/cart" className="relative p-1 rounded-full text-base-content hover:text-primary focus:outline-none">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-2 bg-error text-error-content text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Link>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                       {/* Gunakan gambar user jika ada, jika tidak, gunakan placeholder */}
                       <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}&background=random`} alt="user avatar" />
                    </div>
                  </label>
                  <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                    <li className="p-2 font-semibold">{user.username} <span className="badge badge-sm">{user.role}</span></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><button onClick={() => { setUser(null); closeMenu(); }}>Logout</button></li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn btn-sm btn-ghost">Login</Link>
                <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
              </div>
            )}
          </div>

          {/* 3. Tombol Hamburger untuk Mobile (muncul di bawah 768px) */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-base-200 inline-flex items-center justify-center p-2 rounded-md text-base-content hover:text-primary hover:bg-base-100 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Ikon hamburger (jika menu tertutup) */}
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
              /* Ikon close 'X' (jika menu terbuka) */
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Menu Dropdown untuk Mobile */}
      {/* Muncul hanya jika isMenuOpen === true, dan disembunyikan di layar 'md' ke atas */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link onClick={closeMenu} className="text-base-content hover:bg-base-200 hover:text-primary block px-3 py-2 rounded-md text-base font-medium" to="/">Home</Link>
          <Link onClick={closeMenu} className="text-base-content hover:bg-base-200 hover:text-primary block px-3 py-2 rounded-md text-base font-medium" to="/courses">Courses</Link>
          <Link onClick={closeMenu} className="text-base-content hover:bg-base-200 hover:text-primary block px-3 py-2 rounded-md text-base font-medium" to="/faqs">FAQ</Link>
          <Link onClick={closeMenu} className="text-base-content hover:bg-base-200 hover:text-primary block px-3 py-2 rounded-md text-base font-medium" to="/posts">Posts</Link>
           {user?.role === 'admin' && (
             <Link onClick={closeMenu} className="text-accent hover:bg-base-200 hover:text-primary block px-3 py-2 rounded-md text-base font-bold" to="/admin">Admin Panel</Link>
           )}
        </div>
        {/* User Info di Mobile Menu */}
<div className="pt-4 pb-3 border-t border-base-200">
  {user ? (
    // TAMBAHKAN PEMBUNGKUS FRAGMENT DI SINI
    <> 
      <div className="px-5 flex items-center justify-between">
        <div>
          <div className="text-base font-medium leading-none">{user.username}</div>
          <div className="text-sm font-medium leading-none text-base-content/70">{user.role}</div>
        </div>
        <Link to="/cart" onClick={closeMenu} className="relative p-1 rounded-full text-base-content hover:text-primary focus:outline-none">
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          {cart.length > 0 && <span className="absolute -top-1 -right-2 badge badge-error badge-sm">{cart.length}</span>}
        </Link>
      </div>
      <div className="mt-3 px-2 space-y-1">
        <button
          onClick={() => { setUser(null); closeMenu(); }}
          className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-base-content hover:bg-error hover:text-error-content"
        >
          Logout
        </button>
      </div>
    </> // JANGAN LUPA PENUTUP FRAGMENTNYA
  ) : (
    // Bagian ini sudah benar karena hanya punya satu div induk
    <div className="px-2 space-y-1">
        <Link to="/login" onClick={closeMenu} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-base-content hover:bg-base-200">Login</Link>
        <Link to="/register" onClick={closeMenu} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-base-content hover:bg-base-200">Register</Link>
    </div>
  )}
</div>
      </div>
    </nav>
  );
}

export default Navbar;