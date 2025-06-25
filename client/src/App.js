import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css'; 
import Post from './pages/Post';// Pastikan Tailwind CSS diimpor di sini

// Import SEMUA komponen halaman yang sudah dipisah
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CourseList from './pages/CourseList';
import CourseDetail from './pages/CourseDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import CartPage from './pages/CartPage'; // Komponen halaman keranjang
import FaqPage from './pages/FaqPage';
import PostPage from './pages/Post';
import Profile from './pages/Profile'; // Tambahkan import ini di bagian atas
import { AuthProvider } from './context/AuthContext';

function App() {
  const [user, setUser] = useState(null); 
  const [cart, setCart] = useState([]); // State untuk data keranjang

  // Fungsi untuk menambah kursus ke keranjang
  const addToCart = (courseToAdd) => {
    setCart((prevCart) => {
      // Cek apakah kursus sudah ada di keranjang untuk menghindari duplikasi
      const isAlreadyInCart = prevCart.some(item => item.id === courseToAdd.id);
      if (isAlreadyInCart) {
        alert('Kursus ini sudah ada di keranjang!');
        return prevCart; 
      }
      alert(`${courseToAdd.title} berhasil ditambahkan ke keranjang!`);
      return [...prevCart, courseToAdd]; // Tambahkan item baru ke array
    });
  };

  // Fungsi untuk menghapus kursus dari keranjang
  const removeFromCart = (courseIdToRemove) => {
    setCart((prevCart) => {
      alert('Kursus dihapus dari keranjang.');
      return prevCart.filter(item => item.id !== courseIdToRemove);
    });
  };

  // Fungsi untuk mengosongkan keranjang (misalnya setelah pembayaran)
  const clearCart = () => {
    setCart([]);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {/* Navbar menerima state user dan cart untuk menampilkan info login dan jumlah item keranjang */}
          <Navbar user={user} setUser={setUser} cart={cart} />
          
          <Routes>
            {/* Rute untuk halaman Home */}
            <Route path="/" element={<Home />} /> 
            
            {/* Rute untuk daftar semua kursus. Mempassing fungsi addToCart */}
            <Route path="/courses" element={<CourseList addToCart={addToCart} />} />

            {/* Rute untuk detail kursus tertentu. Mempassing fungsi addToCart */}
            <Route path="/course/:id" element={<CourseDetail addToCart={addToCart} user={user} />} />
            
            {/* Rute untuk Login. Mempassing setUser agar bisa update state user setelah login */}
            <Route path="/login" element={<Login setUser={setUser} />} />
            
            {/* Rute untuk Register */}
            <Route path="/register" element={<Register />} />
            
            {/* Rute untuk Admin Panel. Mempassing user untuk otorisasi */}
            <Route path="/admin" element={<AdminPanel user={user} />} />
            <Route path="/faqs" element={<FaqPage />} />
            <Route path="/posts" element={<PostPage user={user} />} />
            <Route path="/profile" element={<Profile />} /> {/* Tambahkan baris ini */}

            {/* Rute untuk halaman Keranjang. Mempassing state cart dan fungsi modifikasinya */}
            <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;