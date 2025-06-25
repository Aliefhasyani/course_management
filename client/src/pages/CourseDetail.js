import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseByIdApi } from '../api';

// Helper function untuk format harga, kita gunakan lagi di sini
function formatPrice(price) {
  if (price === null || price === undefined) return 'N/A';
  const priceString = String(price).toLowerCase().trim();
  
  if (priceString.includes('free') || priceString.includes('gratis')) {
    return 'Gratis';
  }
  
  if (priceString.startsWith('$') || priceString.startsWith('rp')) {
    return price;
  }
  
  if (!isNaN(priceString)) {
    return `$${priceString}`;
  }
  
  return price;
}

// Menerima prop 'addToCart' dan 'user'
function CourseDetail({ addToCart, user }) { 
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const data = await getCourseByIdApi(id);
        setCourse(data);
      } catch (err) {
        setError("Gagal mengambil detail kursus. Mungkin kursus ini tidak ada.");
        console.error("Error fetching course detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  // Tampilan Loading yang lebih baik
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Tampilan Error yang lebih baik
  if (error || !course) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div role="alert" className="alert alert-error max-w-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{error || 'Kursus yang Anda cari tidak ditemukan.'}</span>
          <Link to="/courses" className="btn btn-sm">Kembali</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="text-sm breadcrumbs mb-6">
          <ul>
            <li><Link to="/">Home</Link></li> 
            <li><Link to="/courses">Courses</Link></li> 
            <li>{course.title}</li>
          </ul>
        </div>

        {/* Layout Utama Dua Kolom */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Kolom Kiri: Gambar & Aksi */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card bg-base-100 shadow-xl">
              <figure>
                <img src={course.pic} alt={course.title} className="w-full h-auto object-cover" />
              </figure>
              <div className="card-body">
                {/* Harga */}
                <div className="mb-4">
                  {course.discount_price ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-secondary">{formatPrice(course.discount_price)}</span>
                        <span className="text-xl line-through text-base-content/50">{formatPrice(course.org_price)}</span>
                      </div>
                    ) : (
                      <span className="text-4xl font-bold text-primary">{formatPrice(course.org_price)}</span>
                    )}
                </div>
                {/* Tombol Aksi */}
                {user ? (
                  <button
                    className="btn btn-primary btn-lg w-full"
                    onClick={() => addToCart(course)}
                  >
                    + Tambah ke Keranjang
                  </button>
                ) : (
                   <Link to="/login" className="btn btn-primary btn-lg w-full">Login untuk Membeli</Link>
                )}
              </div>
            </div>
            {/* Metadata Tambahan */}
             <div className="card bg-base-100 shadow-xl">
               <div className="card-body">
                  <h3 className="card-title">Detail Cepat</h3>
                  <ul className="space-y-2 mt-2 text-base-content/80">
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <span className="font-semibold">Platform:</span> {course.platform}
                    </li>
                     <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
                      <span className="font-semibold">Bahasa:</span> {course.language}
                    </li>
                  </ul>
               </div>
            </div>
          </div>

          {/* Kolom Kanan: Informasi Detail */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl p-6 md:p-8">
              <div className="badge badge-accent mb-4 py-3 px-4 font-semibold">{course.category}</div>
              <h1 className="text-4xl font-bold text-base-content leading-tight">{course.title}</h1>
              <div className="divider"></div>
              <h2 className="text-2xl font-bold mt-8 mb-4">Deskripsi Kursus</h2>
              {/* Menggunakan 'prose' dari Tailwind Typography untuk styling teks yang bagus */}
              <div className="prose max-w-none text-base-content/80">
                <p>{course.description}</p>
              </div>
              {/* Anda bisa menambahkan bagian lain di sini, misal "Apa yang akan dipelajari" */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;