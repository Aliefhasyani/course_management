import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-center py-8 min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100">
      <h1 className="text-5xl font-extrabold text-blue-800 mb-6 drop-shadow-lg">Selamat Datang di Course Manager!</h1>
      <p className="text-xl text-gray-700 mb-8 max-w-2xl">
        Jelajahi berbagai kursus menarik dari Udemy. Tingkatkan skill-mu dan raih impianmu.
      </p>
      <div className="space-x-4">
        <Link 
          to="/courses" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition transform hover:scale-105"
        >
          Lihat Semua Kursus
        </Link>
        <Link 
          to="/register" 
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition transform hover:scale-105"
        >
          Daftar Sekarang
        </Link>
      </div>
    </div>
  );
}

export default Home;