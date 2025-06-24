import './App.css';
import './index.css';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from 'react-router-dom';

function AdminPanel({ user }) {
  const [adminData, setAdminData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetch('http://192.168.1.9:5000/api/admin-panel', {
        headers: { Role: user.role }
      })
        .then(res => {
          if (!res.ok) throw new Error('Forbidden');
          return res.json();
        })
        .then(data => setAdminData(data))
        .catch(() => setError('You are not authorized to view this page.'));
    }
  }, [user]);

  if (!user || user.role !== 'admin') {
    return <div className="text-center text-red-600 mt-10 text-xl">Access denied. Admins only.</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-16 bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Admin Panel</h2>
      {error && <div className="text-red-600">{error}</div>}
      {adminData ? (
        <div>
          <p className="mb-2">{adminData.message}</p>
          <p className="font-semibold">Total Courses: {adminData.courses_count}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}


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
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function CourseList({ courses }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-10 text-center drop-shadow">Udemy Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {courses.map(course => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transform transition duration-300 hover:-translate-y-2 hover:scale-105 p-5 flex flex-col"
            >
              <img src={course.pic} alt={course.title} className="rounded-lg mb-4 h-40 object-cover shadow" />
              <div className="flex-1 flex flex-col">
                <h2 className="text-lg font-bold mb-1 text-blue-900">{course.title}</h2>
                <p className="text-xs text-gray-500 mb-1">{course.category}</p>
                <p className="text-green-700 font-bold mb-2">{course.org_price}</p>
                <Link
                  className="mt-auto inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition font-semibold text-center"
                  to={`/course/${course.id}`}
                >
                  View Details
                </Link>
                <br></br>
                <Link
                  className="mt-auto inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 transition font-semibold text-center"
                  to={`/course/${course.id}`}
                >
                  Buy Course
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetch(`http://192.168.1.9:5000/api/courses/${id}`)
      .then(res => res.json())
      .then(data => setCourse(data));
  }, [id]);

  if (!course) return <div className="loading text-center mt-20 text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-8">
        <h2 className="text-3xl font-extrabold mb-4 text-blue-900">{course.title}</h2>
        <img src={course.pic} alt={course.title} className="rounded-lg mb-6 w-full max-h-64 object-cover shadow" />
        <div className="space-y-2 text-gray-700">
          <p><span className="font-semibold">Category:</span> {course.category}</p>
          <p><span className="font-semibold">Language:</span> {course.language}</p>
          <p><span className="font-semibold">Platform:</span> {course.platform}</p>
          <p><span className="font-semibold">Price:</span> <span className="text-green-700 font-bold">{course.org_price}</span></p>
          <p className="font-semibold mt-4">Description:</p>
          <p>{course.description}</p>
        </div>
        <Link className="mt-8 inline-block text-blue-700 hover:underline font-semibold" to="/">← Back to Courses</Link>
      </div>
    </div>
  );
}

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'buyer' });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://192.168.1.9:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(async res => {
        const data = await res.json();
        setMessage(data.message);
        setSuccess(res.status === 201);
      });
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


function Login({ setUser }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://192.168.1.9:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
          setSuccess(true);
          setMessage('Login successful!');
        } else {
          setSuccess(false);
          setMessage(data.message);
        }
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-extrabold mb-6 text-blue-900 text-center">Login</h2>
        {success ? (
          <div className="text-green-600 text-center font-semibold">
            <Link to="/" className="text-blue-600 hover:underline">Go to Courses</Link>
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


function App() {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://192.168.1.9:5000/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<CourseList courses={courses} />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPanel user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;