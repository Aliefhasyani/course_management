import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCoursesApi } from '../api';

// Helper function untuk format harga (sedikit disempurnakan)
function formatPrice(price) {
  if (price === null || price === undefined) return 'N/A';
  const priceString = String(price).toLowerCase().trim();
  
  if (priceString.includes('free') || priceString.includes('gratis')) {
    return 'Gratis';
  }
  
  // Jika sudah ada simbol mata uang, gunakan itu
  if (priceString.startsWith('$') || priceString.startsWith('rp')) {
    return price;
  }
  
  // Jika tidak, asumsikan itu angka dan tambahkan '$'
  if (!isNaN(priceString)) {
    return `$${priceString}`;
  }
  
  return price; // Kembalikan apa adanya jika format tidak dikenali
}


function CourseList({ addToCart, user }) { // Menerima prop 'user' untuk menampilkan tombol 'Add to Cart'
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State baru untuk fungsionalitas filter dan search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getCoursesApi();
        setCourses(data);

        // Ekstrak kategori unik dari data kursus
        const uniqueCategories = ['All', ...new Set(data.map(course => course.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError("Gagal mengambil data kursus. Pastikan backend berjalan.");
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);
  
  // Logika untuk memfilter kursus berdasarkan search dan kategori
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
    <div className="min-h-screen bg-base-200 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Halaman */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-base-content">Jelajahi Semua Kursus</h1>
          <p className="mt-4 text-lg text-base-content/70">Temukan kursus yang tepat untuk meningkatkan keahlian Anda.</p>
        </div>

        {/* Filter dan Search Bar */}
        <div className="mb-10 p-4 bg-base-100 rounded-lg shadow-md flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Cari kursus berdasarkan judul..."
            className="input input-bordered w-full md:flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="select select-bordered w-full md:w-auto"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Grid Daftar Kursus */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <div
                key={course.id}
                className="card bg-base-100 shadow-lg transition-transform duration-300 hover:-translate-y-2 flex flex-col"
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
                  <h2 className="card-title h-16 line-clamp-2 flex-grow-0">{course.title}</h2>
                  <div className="my-4">
                    {course.discount_price ? (
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-secondary">{formatPrice(course.discount_price)}</span>
                        <span className="text-md line-through text-base-content/50">{formatPrice(course.org_price)}</span>
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-primary">{formatPrice(course.org_price)}</span>
                    )}
                  </div>
                  {/* Tombol Aksi */}
                  <div className="card-actions justify-end mt-auto space-y-2 w-full">
                     <Link to={`/course/${course.id}`} className="btn btn-outline btn-primary w-full">
                        Lihat Detail
                      </Link>
                    {/* Hanya tampilkan tombol Add to Cart jika user sudah login */}
                    {user && (
                      <button
                        className="btn btn-primary w-full"
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
              <h3 className="text-2xl font-semibold">Tidak Ada Kursus yang Ditemukan</h3>
              <p className="text-base-content/60 mt-2">Coba ubah kata kunci pencarian atau filter kategori Anda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseList;