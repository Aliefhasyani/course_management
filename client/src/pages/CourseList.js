import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Tambahkan useLocation
import { getCoursesApi } from '../api';

// Helper function untuk format harga
function formatPrice(price) {
  if (price === null || price === undefined) return 'N/A';
  const priceString = String(price).toLowerCase().trim();
  if (priceString.includes('free') || priceString.includes('gratis')) return 'Gratis';
  if (priceString.startsWith('$') || priceString.startsWith('rp')) return price;
  if (!isNaN(priceString)) return `$${priceString}`;
  return price;
}

function CourseList({ addToCart, user }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State untuk fungsionalitas filter dan search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);

  const location = useLocation(); // Untuk membaca query string

  // Ambil kategori dari query string jika ada
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getCoursesApi();
        setCourses(data);
        const uniqueCategories = ['All', ...new Set(data.map(course => course.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError("Gagal mengambil data kursus.");
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);
  
  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div role="alert" className="alert alert-error max-w-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] py-16 px-4 relative overflow-hidden">
      {/* Futuristic glowing lines */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-blue-500/10 blur-2xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-1 h-full bg-fuchsia-500/10 blur-2xl animate-pulse" />
        <div className="absolute top-1/2 left-0 w-full h-1 bg-cyan-400/10 blur-2xl animate-pulse" style={{ transform: 'translateY(-50%)' }} />
        <div className="absolute top-1/3 left-0 w-full h-1 bg-purple-400/10 blur-2xl animate-pulse" />
      </div>
      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-100 font-futuristic">Jelajahi Semua Kursus</h1>
          <p className="mt-4 text-lg text-blue-200 font-futuristic">Temukan kursus yang tepat untuk meningkatkan keahlian Anda.</p>
        </div>

        {/* Filter dan Search Bar */}
        <div className="mb-10 p-4 bg-gradient-to-r from-blue-900/70 to-fuchsia-900/70 rounded-lg shadow-md flex flex-col md:flex-row gap-4 items-center border border-fuchsia-700/20">
          <input
            type="text"
            placeholder="Cari kursus berdasarkan judul..."
            className="input input-bordered w-full md:flex-1 bg-[#232142] text-white placeholder:text-violet-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="select select-bordered w-full md:w-auto bg-[#232142] text-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <div
                key={course.id}
                className="card bg-gradient-to-br from-blue-950/80 to-fuchsia-950/80 shadow-xl border border-fuchsia-700/20 transition-transform duration-300 hover:-translate-y-2 flex flex-col"
              >
                <figure className="h-48 overflow-hidden">
                  <img src={course.pic} alt={course.title} className="w-full h-full object-cover" />
                </figure>
                <div className="card-body flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <div className="badge badge-accent font-semibold">{course.category}</div>
                    {course.discount_price && (
                      <div className="badge badge-secondary">DISKON</div>
                    )}
                  </div>
                  <h2 className="card-title h-16 line-clamp-2 flex-grow-0 text-fuchsia-200 font-futuristic">{course.title}</h2>
                  <div className="my-4">
                    {course.discount_price ? (
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-fuchsia-400">{formatPrice(course.discount_price)}</span>
                        <span className="text-md line-through text-blue-200">{formatPrice(course.org_price)}</span>
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-blue-200">{formatPrice(course.org_price)}</span>
                    )}
                  </div>
                  <div className="card-actions justify-end mt-auto space-y-2 w-full">
                    <Link to={`/course/${course.id}`} className="btn btn-outline btn-primary w-full font-futuristic">
                      Lihat Detail
                    </Link>
                    {user && (
                      <button
                        className="btn btn-primary w-full font-futuristic"
                        onClick={() => addToCart(course)}
                      >
                        + Keranjang
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-base-100 rounded-lg">
              <h3 className="text-2xl font-semibold text-blue-100 font-futuristic">Tidak Ada Kursus yang Ditemukan</h3>
              <p className="text-blue-200 mt-2">Coba ubah kata kunci pencarian atau filter kategori Anda.</p>
            </div>
          )}
        </div>
      </div>
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

export default CourseList;
