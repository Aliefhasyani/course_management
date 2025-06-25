import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCoursesApi } from '../api';
import QuoteCarousel from '../components/QuoteCarousel';

// Komponen ikon tidak perlu diubah
const FeatureIcon = ({ children }) => (
  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-primary-content">
    {children}
  </div>
);

function Home() {
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const quoteImages = [
    '/images/quote1.jpg',
    '/images/quote2.jpg',
    '/images/quote3.jpg',
  ];

  return (
    <div className="home-page bg-base-100 text-base-content">
      {/* Hero Section */}
      <section className="hero min-h-[90vh] lg:min-h-[80vh] bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse max-w-7xl mx-auto px-4 py-8">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
            // Penyesuaian ukuran gambar untuk mobile dan desktop
            className="w-full max-w-xs md:max-w-md rounded-lg shadow-2xl"
            alt="Tim belajar bersama"
          />
          {/* Penyesuaian perataan teks */}
          <div className="lg:mr-10 mt-8 lg:mt-0 text-center lg:text-left">
            {/* Ukuran font yang responsif */}
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Gerbang Anda Menuju <span className="text-primary">Pengetahuan</span> Tanpa Batas
            </h1>
            <p className="py-6 text-base md:text-lg">
              Temukan ribuan kursus online dari berbagai penyedia terkemuka. Mulai perjalanan belajar Anda bersama kami dan capai potensi penuh Anda.
            </p>
            <Link to="/courses" className="btn btn-primary btn-lg shadow-lg">
              Mulai Jelajahi
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* Penyesuaian spasi vertikal */}
      <section className="py-16 lg:py-20 px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Kenapa Memilih Kami?</h2>
          <p className="mt-4 text-base md:text-lg text-base-content/80">
            Kami menyediakan platform yang mudah digunakan untuk membantu Anda mencapai tujuan belajar.
          </p>
        </div>
        {/* Grid ini sudah responsif */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto mt-12 text-center">
          {/* ... konten fitur tetap sama ... */}
           <div className="p-6">
            <FeatureIcon>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </FeatureIcon>
            <h3 className="text-xl font-semibold mt-4">Konten Terkurasi</h3>
            <p className="mt-2 text-base-content/70">Kursus dipilih secara cermat untuk memastikan kualitas terbaik.</p>
          </div>
          <div className="p-6">
            <FeatureIcon>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" /></svg>
            </FeatureIcon>
            <h3 className="text-xl font-semibold mt-4">Fleksibilitas Belajar</h3>
            <p className="mt-2 text-base-content/70">Akses materi kapan saja, di mana saja, sesuai dengan kecepatan Anda.</p>
          </div>
          <div className="p-6">
            <FeatureIcon>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </FeatureIcon>
            <h3 className="text-xl font-semibold mt-4">Komunitas Pembelajar</h3>
            <p className="mt-2 text-base-content/70">Bergabung dengan ribuan pembelajar lain dan bertukar pikiran.</p>
          </div>
        </div>
      </section>

      {/* Recommended Courses Section */}
      <section className="py-16 lg:py-20 px-4 bg-base-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Pilihan Kursus Unggulan</h2>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : error ? (
            <div role="alert" className="alert alert-error max-w-md mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>
          ) : recommendedCourses.length > 0 ? (
            // Grid ini sudah sangat responsif
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendedCourses.map(course => (
                <div key={course.id} className="card bg-base-100 shadow-lg transition-transform duration-300 hover:-translate-y-2">
                  {/* ... konten kartu tetap sama ... */}
                  <figure className="h-48 overflow-hidden">
                    <img src={course.pic} alt={course.title} className="w-full h-full object-cover" />
                  </figure>
                  <div className="card-body">
                    <div className="flex justify-between items-center mb-2">
                      <div className="badge badge-accent font-semibold">{course.category}</div>
                      {course.org_price?.toLowerCase().includes('free') && (
                        <div className="badge badge-success font-bold">GRATIS</div>
                      )}
                    </div>
                    <h3 className="card-title h-16 line-clamp-2">{course.title}</h3>
                    <div className="flex items-center mt-4 mb-4">
                      {course.discount_price ? (
                        <>
                          <span className="text-2xl font-bold text-secondary">{course.discount_price}</span>
                          <span className="text-md line-through text-base-content/50 ml-2">{course.org_price}</span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-success">{course.org_price}</span>
                      )}
                    </div>
                    <div className="card-actions justify-end">
                      <Link to={`/course/${course.id}`} className="btn btn-primary w-full">
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Tidak ada kursus rekomendasi saat ini.</p>
          )}
          <div className="text-center mt-16">
            <Link to="/courses" className="btn btn-outline btn-primary btn-wide">
              Lihat Semua Kursus
            </Link>
          </div>
        </div>
      </section>

      {/* ... bagian Testimonials dan Final CTA tetap sama karena sudah cukup responsif ... */}
      <section className="py-16 lg:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Apa Kata Mereka?</h2>
          <p className="mb-12 text-base md:text-lg text-base-content/80">
            Kisah sukses dari para pelajar kami yang telah meraih tujuannya.
          </p>
          <QuoteCarousel images={quoteImages} />
        </div>
      </section>

      <section className="bg-primary text-primary-content">
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Siap untuk Mulai Belajar?</h2>
          <p className="my-4 text-base md:text-lg">
            Jelajahi ratusan kursus dan temukan yang paling cocok untuk Anda.
          </p>
          <Link to="/courses" className="btn btn-secondary btn-lg mt-4">
            Jelajahi Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;