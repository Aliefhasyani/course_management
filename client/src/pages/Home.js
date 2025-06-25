import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCoursesApi } from '../api';
import QuoteCarousel from '../components/QuoteCarousel';

// Komponen ikon tetap
const FeatureIcon = ({ children }) => (
  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-700 to-fuchsia-700 text-white shadow-lg">
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
 
  // Daftar kategori yang tersedia (ambil dari dropdown yang kamu lampirkan)
  const allCategories = [
    "Data Science, Development",
    "Business",
    "IT & Software",
    "Teaching & Academics, Test Prep",
    "Marketing",
    "Development",
    "IT & Software, Network & Security",
    "Uncategorized"
  ];

  // Pilih 3 kategori populer (misal: Data Science, Business, IT & Software)
  const categories = [
    { name: "Data Science, Development", icon: "📊" },
    { name: "Business", icon: "📈" },
    { name: "IT & Software", icon: "💻" }
  ];

  const tips = [
    {
      title: "Tentukan Tujuan Belajar",
      desc: "Pilih kursus yang sesuai dengan kebutuhan dan tujuan karirmu.",
      icon: "🎯"
    },
    {
      title: "Buat Jadwal Rutin",
      desc: "Luangkan waktu khusus setiap hari untuk belajar.",
      icon: "⏰"
    },
    {
      title: "Aktif di Komunitas",
      desc: "Diskusi dengan peserta lain untuk memperdalam pemahaman.",
      icon: "🤝"
    },
    {
      title: "Praktekkan Ilmu",
      desc: "Langsung terapkan materi yang sudah dipelajari.",
      icon: "🛠️"
    },
  ];

  // Fungsi untuk redirect ke halaman courses dengan filter kategori
  const handleCategoryClick = (category) => {
    window.location.href = `/courses?category=${encodeURIComponent(category)}`;
  };

  return (
    <div className="home-page min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] text-base-content relative overflow-hidden">
      {/* Futuristic glowing lines */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-blue-500/10 blur-2xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-1 h-full bg-fuchsia-500/10 blur-2xl animate-pulse" />
        <div className="absolute top-1/2 left-0 w-full h-1 bg-cyan-400/10 blur-2xl animate-pulse" style={{ transform: 'translateY(-50%)' }} />
        <div className="absolute top-1/3 left-0 w-full h-1 bg-purple-400/10 blur-2xl animate-pulse" />
      </div>

      {/* Hero Section */}
      <section className="hero min-h-[80vh] bg-transparent relative z-10">
        <div className="hero-content flex-col lg:flex-row-reverse max-w-7xl mx-auto px-4 py-8">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
            className="w-full max-w-xs md:max-w-md rounded-2xl shadow-2xl border-4 border-fuchsia-700/30"
            alt="Tim belajar bersama"
          />
          <div className="lg:mr-10 mt-8 lg:mt-0 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-blue-100 drop-shadow font-futuristic">
              Gerbang Anda Menuju <span className="text-fuchsia-400">Pengetahuan</span> Masa Depan
            </h1>
            <p className="py-6 text-base md:text-lg text-blue-200">
              Temukan ribuan kursus online dari berbagai penyedia terkemuka. Mulai perjalanan belajar Anda bersama kami dan capai potensi penuh Anda.
            </p>
            <Link to="/courses" className="btn btn-primary btn-lg shadow-lg font-futuristic tracking-widest">
              Mulai Jelajahi
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-fuchsia-300 font-futuristic text-center mb-8">Kategori Populer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map(cat => (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className="flex flex-col items-center bg-gradient-to-br from-blue-900/70 to-fuchsia-900/70 rounded-xl shadow p-4 border border-fuchsia-700/20 hover:scale-105 transition cursor-pointer focus:outline-none"
                type="button"
              >
                <span className="text-3xl md:text-4xl mb-2">{cat.icon}</span>
                <span className="font-semibold text-blue-100 text-center">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-20 px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-fuchsia-300 font-futuristic">Kenapa Memilih Kami?</h2>
          <p className="mt-4 text-base md:text-lg text-blue-200">
            Platform modern, mudah digunakan, dan siap membawa Anda ke masa depan pembelajaran digital.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto mt-12 text-center">
          <div className="p-6 bg-gradient-to-br from-blue-900/70 to-fuchsia-900/70 rounded-xl shadow-lg border border-fuchsia-700/20">
            <FeatureIcon>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </FeatureIcon>
            <h3 className="text-xl font-semibold mt-4 text-fuchsia-200 font-futuristic">Konten Terkurasi</h3>
            <p className="mt-2 text-blue-100">Kursus dipilih secara cermat untuk memastikan kualitas terbaik.</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-blue-900/70 to-fuchsia-900/70 rounded-xl shadow-lg border border-fuchsia-700/20">
            <FeatureIcon>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" /></svg>
            </FeatureIcon>
            <h3 className="text-xl font-semibold mt-4 text-fuchsia-200 font-futuristic">Fleksibilitas Belajar</h3>
            <p className="mt-2 text-blue-100">Akses materi kapan saja, di mana saja, sesuai dengan kecepatan Anda.</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-blue-900/70 to-fuchsia-900/70 rounded-xl shadow-lg border border-fuchsia-700/20">
            <FeatureIcon>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </FeatureIcon>
            <h3 className="text-xl font-semibold mt-4 text-fuchsia-200 font-futuristic">Komunitas Pembelajar</h3>
            <p className="mt-2 text-blue-100">Bergabung dengan ribuan pembelajar lain dan bertukar pikiran.</p>
          </div>
        </div>
      </section>

      {/* Recommended Courses Section */}
      <section className="py-16 lg:py-20 px-4 bg-gradient-to-br from-blue-900/60 to-fuchsia-900/60 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-fuchsia-300 font-futuristic">Pilihan Kursus Unggulan</h2>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendedCourses.map(course => (
                <div key={course.id} className="card bg-gradient-to-br from-blue-950/80 to-fuchsia-950/80 shadow-xl border border-fuchsia-700/20 transition-transform duration-300 hover:-translate-y-2">
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
                    <h3 className="card-title h-16 line-clamp-2 text-fuchsia-200">{course.title}</h3>
                    <div className="flex items-center mt-4 mb-4">
                      {course.discount_price ? (
                        <>
                          <span className="text-2xl font-bold text-fuchsia-400">{course.discount_price}</span>
                          <span className="text-md line-through text-blue-200 ml-2">{course.org_price}</span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-blue-200">{course.org_price}</span>
                      )}
                    </div>
                    <div className="card-actions justify-end">
                      <Link to={`/course/${course.id}`} className="btn btn-primary w-full font-futuristic">
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-blue-200">Tidak ada kursus rekomendasi saat ini.</p>
          )}
          <div className="text-center mt-16">
            <Link to="/courses" className="btn btn-outline btn-primary btn-wide font-futuristic">
              Lihat Semua Kursus
            </Link>
          </div>
        </div>
      </section>

      {/* Tips Belajar Section */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-fuchsia-300 font-futuristic text-center mb-8">Tips Belajar Efektif</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tips.map(tip => (
              <div key={tip.title} className="bg-gradient-to-br from-blue-900/70 to-fuchsia-900/70 rounded-xl shadow p-6 border border-fuchsia-700/20 flex flex-col items-center hover:scale-105 transition">
                <span className="text-4xl mb-3">{tip.icon}</span>
                <h4 className="font-bold text-fuchsia-200 mb-2 font-futuristic">{tip.title}</h4>
                <p className="text-blue-100 text-center">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-fuchsia-300 font-futuristic">Apa Kata Mereka?</h2>
          <p className="mb-12 text-base md:text-lg text-blue-200">
            Kisah sukses dari para pelajar kami yang telah meraih tujuannya.
          </p>
          <QuoteCarousel images={quoteImages} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-fuchsia-700 to-blue-700 text-white relative z-10">
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-futuristic">Siap untuk Mulai Belajar?</h2>
          <p className="my-4 text-base md:text-lg">
            Jelajahi ratusan kursus dan temukan yang paling cocok untuk Anda.
          </p>
          <Link to="/courses" className="btn btn-secondary btn-lg mt-4 font-futuristic">
            Jelajahi Sekarang
          </Link>
        </div>
      </section>
      <style>{`
        .font-futuristic {
          font-family: 'Orbitron', 'Montserrat', 'Segoe UI', Arial, sans-serif;
          letter-spacing: 2px;
        }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap" rel="stylesheet" />
    </div>
  );
}

export default Home;