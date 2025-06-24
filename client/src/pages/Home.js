import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCoursesApi } from '../api'; 
import QuoteCarousel from '../components/QuoteCarousel'; 

function Home() {
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const quoteImages = [
    '/images/quote1.jpg', // Pastikan kamu menempatkan gambar ini di client/public/images/
    '/images/quote2.jpg',
    '/images/quote3.jpg',
  ];

  useEffect(() => {
    const fetchRecommendedCourses = async () => {
      try {
        setLoading(true);
        const allCourses = await getCoursesApi();
        const randomCourses = allCourses.sort(() => 0.5 - Math.random()).slice(0, 3);
        setRecommendedCourses(randomCourses);
      } catch (err) {
        setError("Gagal memuat kursus rekomendasi.");
        console.error("Error fetching recommended courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedCourses();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section / Welcome */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 text-center py-16 px-4">
        <h1 className="text-5xl font-extrabold text-blue-800 mb-4 drop-shadow-lg">
          Selamat Datang di Course Manager!
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Temukan dan kelola kursus online terbaik dari berbagai platform. Tingkatkan skillmu dan raih impianmu.
        </p>
        <Link 
          to="/courses" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition transform hover:scale-105 inline-block"
        >
          Jelajahi Semua Kursus
        </Link>
      </div>

      {/* About Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Tentang Kami</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Course Manager adalah platform yang dirancang untuk membantumu menemukan kursus online gratis dan berbayar dari Udemy dan platform lainnya. Kami menyaring kursus-kursus terbaik, menyediakan detail lengkap, dan mempermudah kamu untuk memulai perjalanan belajarmu. Misi kami adalah membuat pendidikan berkualitas mudah diakses untuk semua orang.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto mt-4">
            Kami percaya bahwa belajar adalah investasi terbaik untuk masa depan. Bergabunglah dengan komunitas kami dan mulailah perjalanan belajarmu hari ini!
          </p>
        </div>
      </section>

      {/* Recommended Courses Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold text-blue-800 mb-10 text-center drop-shadow">
            Kursus Rekomendasi
          </h2>
          {loading ? (
            <div className="text-center text-gray-500 text-xl">Memuat rekomendasi kursus...</div>
          ) : error ? (
            <div className="text-center text-red-600 text-xl">{error}</div>
          ) : recommendedCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendedCourses.map(course => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl shadow-xl p-5 flex flex-col hover:shadow-2xl transform transition duration-300 hover:-translate-y-1"
                >
                  <img src={course.pic} alt={course.title} className="rounded-lg mb-4 h-40 object-cover w-full shadow" />
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-lg font-bold mb-1 text-blue-900">{course.title}</h3>
                    <p className="text-xs text-gray-500 mb-1">{course.category}</p>
                    <p className="text-green-700 font-bold mb-2">{course.org_price}</p>
                    <Link
                      className="mt-auto inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition font-semibold text-center"
                      to={`/course/${course.id}`}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Tidak ada kursus rekomendasi saat ini.</p>
          )}
          <div className="text-center mt-10">
            <Link to="/courses" className="text-blue-600 hover:underline text-lg font-semibold">
              Lihat Semua Kursus →
            </Link>
          </div>
        </div>
      </section>

      {/* Quotes Carousel Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-10">Inspirasi Belajar</h2>
          <QuoteCarousel images={quoteImages} />
 
        </div>
      </section>
    </div>
  );
}

export default Home;