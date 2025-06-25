import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCourseByIdApi } from '../api';

function formatPrice(price) {
  if (price === null || price === undefined) return 'N/A';
  const priceString = String(price).toLowerCase().trim();
  if (priceString.includes('free') || priceString.includes('gratis')) return 'Gratis';
  if (priceString.startsWith('$') || priceString.startsWith('rp')) return price;
  if (!isNaN(priceString)) return `$${priceString}`;
  return price;
}

function CourseDetail({ addToCart, user }) {
  const { id } = useParams();
  const navigate = useNavigate();
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
        setError("Gagal mengambil detail kursus.");
        console.error("Error fetching course detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div role="alert" className="alert alert-error max-w-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center text-gray-500 text-xl">Kursus tidak ditemukan.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] py-12 px-4 relative overflow-hidden">
      {/* Futuristic glowing lines */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-blue-500/10 blur-2xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-1 h-full bg-fuchsia-500/10 blur-2xl animate-pulse" />
        <div className="absolute top-1/2 left-0 w-full h-1 bg-cyan-400/10 blur-2xl animate-pulse" style={{ transform: 'translateY(-50%)' }} />
        <div className="absolute top-1/3 left-0 w-full h-1 bg-purple-400/10 blur-2xl animate-pulse" />
      </div>
      <div className="max-w-3xl mx-auto bg-base-100/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 z-10 border border-fuchsia-700/40 relative">
        <div className="mb-8 flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-blue-100 font-futuristic">{course.title}</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="badge badge-accent font-semibold">{course.category}</span>
              {course.org_price?.toLowerCase().includes('free') && (
                <span className="badge badge-success font-bold">GRATIS</span>
              )}
              {course.discount_price && (
                <span className="badge badge-secondary font-bold">DISKON</span>
              )}
              <span className="badge badge-outline">{course.language}</span>
              <span className="badge badge-outline">{course.platform}</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              {course.discount_price ? (
                <>
                  <span className="text-2xl font-bold text-fuchsia-400">{formatPrice(course.discount_price)}</span>
                  <span className="text-lg line-through text-blue-200">{formatPrice(course.org_price)}</span>
                </>
              ) : (
                <span className="text-2xl font-bold text-blue-200">{formatPrice(course.org_price)}</span>
              )}
            </div>
            {/* Tombol Keranjang/Login */}
            {!user ? (
              <button
                className="btn btn-outline btn-primary btn-block md:w-fit mt-2 font-futuristic"
                onClick={() => navigate('/login')}
              >
                Login untuk Daftar Kelas
              </button>
            ) : user.role === 'buyer' ? (
              <button
                className="btn btn-primary btn-block md:w-fit mt-2 font-futuristic"
                onClick={() => addToCart(course)}
              >
                + Keranjang
              </button>
            ) : null}
          </div>
          <div className="flex-1">
            <img
              src={course.pic}
              alt={course.title}
              className="rounded-xl w-full max-h-72 object-cover shadow"
            />
          </div>
        </div>
        <div className="divider" />
        <div className="prose max-w-none text-blue-100">
          <h3 className="text-xl font-bold mb-2 font-futuristic">Deskripsi Kursus</h3>
          <p>{course.description}</p>
        </div>
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <Link
            to="/courses"
            className="btn btn-outline btn-primary flex-1 font-futuristic"
          >
            ← Kembali ke Daftar Kursus
          </Link>
          {course.url && (
            <a
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary flex-1 font-futuristic"
            >
              Kunjungi Halaman Kursus
            </a>
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

export default CourseDetail;