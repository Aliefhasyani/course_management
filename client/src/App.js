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

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetch(`http://192.168.1.9:5000/api/courses`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(c => String(c.id) === id);
        setCourse(found);
      });
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
      <Routes>
        <Route path="/" element={<CourseList courses={courses} />} />
        <Route path="/course/:id" element={<CourseDetail />} />
      </Routes>
    </Router>
  );
}

export default App;