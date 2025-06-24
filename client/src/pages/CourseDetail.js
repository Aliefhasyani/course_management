import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseByIdApi } from '../api'; // Pastikan import API dari folder yang benar

// Menerima prop 'addToCart'
function CourseDetail({ addToCart }) { 
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const data = await getCourseByIdApi(id); // Panggil fungsi API
        setCourse(data);
      } catch (err) {
        setError("Gagal mengambil detail kursus.");
        console.error("Error fetching course detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return <div className="loading text-center mt-20 text-gray-500 text-xl">Memuat detail kursus...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-600 text-xl">{error}</div>;
  }

  if (!course) {
    return <div className="text-center mt-20 text-gray-500 text-xl">Kursus tidak ditemukan.</div>;
  }

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
        <button
          className="mt-8 inline-block bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition"
          onClick={() => addToCart(course)} // Memanggil fungsi addToCart
        >
          Add to Cart
        </button>
        {/* Link kembali ke halaman Courses */}
        <Link className="mt-4 block text-blue-700 hover:underline font-semibold" to="/courses">← Back to Courses</Link>
      </div>
    </div>
  );
}

export default CourseDetail;