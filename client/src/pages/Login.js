import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { loginUserApi } from '../api';

function Login({ setUser }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage('');
  try {
    const data = await loginUserApi(form.username, form.password);
    setUser(data.user);
    // Save the token for future authenticated requests
    localStorage.setItem('access_token', data.access_token);
    setSuccess(true);
    setMessage('Login successful!');
    navigate('/'); // Redirect to Home
  } catch (error) {
    setSuccess(false);
    setMessage(error.message || 'Terjadi kesalahan saat login.');
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-extrabold mb-6 text-blue-900 text-center">Login</h2>
        {success ? (
          <div className="text-green-600 text-center font-semibold text-lg">
            Login Berhasil! Selamat datang, {form.username}.
            {/* Link ini tidak perlu lagi karena sudah otomatis redirect */}
            {/* <Link to="/" className="text-blue-600 hover:underline">Go to Courses</Link> */}
          </div>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <button type="submit" className="bg-blue-600 text-white rounded py-2 mt-2 hover:bg-blue-700 transition font-semibold">Login</button>
          </form>
        )}
        {message && <div className={success ? "text-green-600 mt-4 text-center" : "text-red-600 mt-4 text-center"}>{message}</div>}
        {!success && <p className="mt-4 text-center text-sm">Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link></p>}
      </div>
    </div>
  );
}

export default Login;