import './App.css';
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
      <h1>Udemy Courses</h1>
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

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link className="navbar-brand" to="/">Course Manager</Link>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
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

  useEffect(() => {
    fetch('http://192.168.1.9:5000/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);

  return (
    <Router>
      <Navbar /> {/* Add the Navbar here */}
      <Routes>
        <Route path="/" element={<CourseList courses={courses} />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}


function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'student' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://192.168.1.9:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => setMessage(data.message));
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
      {message && <div style={{marginTop: 10}}>{message}</div>}
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

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
          setMessage('Login successful!');
        } else {
          setMessage(data.message);
        }
      });
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {user ? (
        <div>
          <p>Welcome, {user.username} ({user.role})!</p>
          <Link to="/">Go to Courses</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>
      )}
      {message && <div style={{marginTop: 10}}>{message}</div>}
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}

export default App;