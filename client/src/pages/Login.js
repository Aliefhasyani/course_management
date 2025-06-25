import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUserApi } from '../api';

function Login({ setUser }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const data = await loginUserApi(form.username, form.password);
      setUser(data.user);
      localStorage.setItem('access_token', data.access_token);
      setSuccess(true);
      setMessage('Login berhasil! Selamat datang, ' + form.username + '.');
      setTimeout(() => navigate('/'), 1000); // Redirect setelah 1 detik
    } catch (error) {
      setSuccess(false);
      setMessage(error.message || 'Terjadi kesalahan saat login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 relative bg-gradient-to-br from-[#18122B] via-[#393053] to-[#443C68] overflow-hidden">
      {/* Magical glowing orbs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-purple-700 opacity-30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500 opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-fuchsia-500 opacity-20 rounded-full blur-2xl animate-pulse" style={{ transform: 'translate(-50%, -50%)' }} />
      {/* Magical sparkles */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {[...Array(18)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      <div className="w-full max-w-md bg-base-100/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 z-10 border border-violet-700/40">
        <h2 className="text-3xl font-extrabold mb-6 text-primary text-center drop-shadow-lg font-magic">
          Login Portal
        </h2>
        {success ? (
          <div className="text-green-400 text-center font-semibold text-lg">
            Login berhasil! Selamat datang, {form.username}.
          </div>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
              className="input input-bordered w-full bg-[#232142] text-white placeholder:text-violet-300"
              autoComplete="username"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="input input-bordered w-full bg-[#232142] text-white placeholder:text-violet-300"
              autoComplete="current-password"
            />
            <button
              type="submit"
              className="btn btn-primary w-full font-semibold shadow-lg transition hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                <span>
                  <span className="loading loading-spinner loading-xs mr-2"></span>
                  Memproses...
                </span>
              ) : (
                <>Login</>
              )}
            </button>
          </form>
        )}
        {message && (
          <div className={`${success ? "text-green-400" : "text-red-400"} mt-4 text-center`}>
            {message}
          </div>
        )}
        {!success && (
          <p className="mt-4 text-center text-sm text-base-content/70">
            Belum punya akun?{' '}
            <Link to="/register" className="text-primary hover:underline font-semibold">
              Register
            </Link>
          </p>
        )}
      </div>
      {/* Optional: Custom font for magical effect */}
      <style>{`
        .font-magic {
          font-family: 'Cinzel Decorative', 'cursive', 'Segoe Script', system-ui;
          letter-spacing: 1px;
        }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&display=swap" rel="stylesheet" />
    </div>
  );
}

export default Login;