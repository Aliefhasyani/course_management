import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCoursesApi } from '../api'; // Import fungsi API

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getCoursesApi(); // Panggil fungsi API
        setCourses(data);
      } catch (err) {
        setError("Gagal mengambil data kursus. Pastikan backend berjalan dan data sudah diimpor.");
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-gray-500 text-xl">Memuat kursus...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-600 text-xl">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-10 text-center drop-shadow">Udemy Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {courses.length > 0 ? (
            courses.map(course => (
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
                    to={`/course/${course.id}`} // Seharusnya ini link pembelian kursus sebenarnya
                  >
                    Buy Course
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Tidak ada kursus yang ditemukan. Pastikan backend berjalan dan data sudah diimpor.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseList;