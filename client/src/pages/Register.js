import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUserApi } from '../api';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'buyer' });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const data = await registerUserApi(form);
      setMessage(data.message);
      setSuccess(true);
    } catch (error) {
      setMessage(error.message || 'Terjadi kesalahan saat pendaftaran.');
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-extrabold mb-6 text-blue-900 text-center">Register</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <select name="role" value={form.role} onChange={handleChange} className="border rounded px-3 py-2">
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white rounded py-2 mt-2 hover:bg-blue-700 transition font-semibold">Register</button>
        </form>
        {message && <div className={success ? "text-green-600 mt-4 text-center" : "text-red-600 mt-4 text-center"}>{message}</div>}
        <p className="mt-4 text-center text-sm">Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link></p>
      </div>
    </div>
  );
}

export default Register;