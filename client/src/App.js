// client/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';

// Import komponen-komponen yang sudah dipisahkan
import Navbar from './components/Navbar';
import CourseList from './pages/CourseList';
import CourseDetail from './pages/CourseDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import CartPage from './pages/CartPage'; // Impor CartPage
// import Home from './pages/Home'; // Impor jika kamu ingin halaman Home yang terpisah

function App() {
  const [user, setUser] = useState(null); // State untuk user global

  // TODO: Tambahkan state atau konteks untuk mengelola data keranjang

  return (
    <Router>
      <div className="App">
        {/* Navbar akan selalu tampil */}
        <Navbar user={user} setUser={setUser} />

        {/* Konten halaman akan di-render di sini sesuai rute */}
        <Routes>
          {/*
            Jika kamu ingin halaman selamat datang terpisah dari daftar kursus:
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<CourseList />} />
          */}

          {/* Jika kamu ingin daftar kursus langsung tampil di halaman utama (seperti App.js lama): */}
          <Route path="/" element={<CourseList />} />

          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminPanel user={user} />} />
          <Route path="/cart" element={<CartPage />} /> {/* Tambahkan rute untuk CartPage */}
          {/* Tambahkan rute lain jika ada */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;