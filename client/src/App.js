import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css'; // Pastikan Tailwind CSS diimpor di index.css atau App.css utama

// Import komponen-komponen yang sudah dipisahkan
import Navbar from './components/Navbar';
import CourseList from './pages/CourseList'; // Import CourseList dari pages
import CourseDetail from './pages/CourseDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import CartPage from './pages/CartPage'; 
import Home from './pages/Home'; // Impor komponen Home yang baru

function App() {
  const [user, setUser] = useState(null); 
  const [cart, setCart] = useState([]);

  // Fungsi untuk menambah kursus ke keranjang
  const addToCart = (courseToAdd) => {
    setCart((prevCart) => {
      const isAlreadyInCart = prevCart.some(item => item.id === courseToAdd.id);
      if (isAlreadyInCart) {
        alert('Kursus ini sudah ada di keranjang!');
        return prevCart;
      }
      alert(`${courseToAdd.title} ditambahkan ke keranjang!`);
      return [...prevCart, courseToAdd];
    });
  };

  // Fungsi untuk menghapus kursus dari keranjang
  const removeFromCart = (courseIdToRemove) => {
    setCart((prevCart) => {
      alert('Kursus dihapus dari keranjang.');
      return prevCart.filter(item => item.id !== courseIdToRemove);
    });
  };

  // Fungsi untuk mengosongkan keranjang (setelah 'add subscription')
  const clearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <div className="App">
        {/* Navbar akan selalu tampil, passing user, setUser, cart untuk tampilan jumlah item */}
        <Navbar user={user} setUser={setUser} cart={cart} />
        
        {/* Konten halaman akan di-render di sini sesuai rute */}
        <Routes>
          {/* Rute default sekarang mengarah ke halaman Home */}
          <Route path="/" element={<Home />} /> 
          
          {/* Rute untuk daftar semua kursus (pindah dari '/') */}
          <Route path="/courses" element={<CourseList addToCart={addToCart} />} />

          {/* Rute detail kursus, passing addToCart */}
          <Route path="/course/:id" element={<CourseDetail addToCart={addToCart} />} />
          
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminPanel user={user} />} />
          
          {/* Halaman keranjang, passing cart, removeFromCart, dan clearCart */}
          <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;