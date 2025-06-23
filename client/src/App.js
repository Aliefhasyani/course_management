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

function CourseList({ courses }) {
  return (
    <div className="course-list-container">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Udemy Courses</h1>
      <div className="course-list">
        {courses.map(course => (
          <div className="course-card" key={course.id}>
            <img src={course.pic} alt={course.title} className="course-img" />
            <div className="course-info">
              <h2>{course.title}</h2>
              <p className="course-category">{course.category}</p>
              <p className="course-price">{course.org_price}</p>
              <Link className="details-link" to={`/course/${course.id}`}>View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Navbar({ user, setUser }) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link className="navbar-brand" to="/">Course Manager</Link>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
          {user && (
            <>
              <span style={{ color: "#fff", marginLeft: 18 }}>
                {user.username} ({user.role})
              </span>
              <button
                className="logout-btn"
                onClick={() => setUser(null)}
                style={{
                  marginLeft: 18,
                  background: "none",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "1rem"
                }}
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

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetch(`http://192.168.1.9:5000/api/courses/${id}`)
      .then(res => res.json())
      .then(data => setCourse(data));
  }, [id]);

  if (!course) return <div className="loading">Loading...</div>;

  return (
    <div className="course-detail-container">
      <h2>{course.title}</h2>
      <img src={course.pic} alt={course.title} className="course-detail-img" />
      <div className="course-detail-info">
        <p><strong>Category:</strong> {course.category}</p>
        <p><strong>Language:</strong> {course.language}</p>
        <p><strong>Platform:</strong> {course.platform}</p>
        <p><strong>Price:</strong> {course.org_price}</p>
        <p><strong>Description:</strong></p>
        <p>{course.description}</p>
        <a className="go-to-course" href={course.coupon} target="_blank" rel="noopener noreferrer">Go to Course</a>
        <br /><br />
        <Link className="back-link" to="/">← Back to Courses</Link>
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
      </Routes>
    </Router>
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
    <div className="auth-container">
      <h2>Register</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="auth-btn">Register</button>
      </form>
      {message && <div className={success ? "auth-success" : "auth-error"}>{message}</div>}
      <p style={{ marginTop: 12 }}>Already have an account? <Link to="/login">Login</Link></p>
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
    <div className="auth-container">
      <h2>Login</h2>
      {success ? (
        <div className="auth-success">
         
          <Link to="/">Go to Courses</Link>
        </div>
      ) : (
        <form className="auth-form" onSubmit={handleSubmit}>
          <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button type="submit" className="auth-btn">Login</button>
        </form>
      )}
      {message && <div className={success ? "auth-success" : "auth-error"}>{message}</div>}
      {!success && <p style={{ marginTop: 12 }}>Don't have an account? <Link to="/register">Register</Link></p>}
    </div>
  );
}

export default App;