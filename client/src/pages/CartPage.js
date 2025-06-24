// client/src/pages/CartPage.js
import React from 'react';
import { Link } from 'react-router-dom';

function CartPage() {
  // TODO: Ambil data keranjang dari state global atau konteks
  const cartItems = []; // Ganti dengan data keranjang sebenarnya

  const handleRemoveFromCart = (courseId) => {
    // TODO: Implementasikan logika untuk menghapus item dari keranjang
    console.log(`Remove course with ID ${courseId} from cart`);
  };

  const handleAddSubscription = () => {
    // TODO: Implementasikan logika untuk pembelian/langganan kursus
    console.log('Add subscription to selected courses');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-blue-800 mb-10 text-center drop-shadow">Keranjang Belanja</h1>
          <p className="text-center text-gray-500">Keranjangmu kosong.</p>
          <div className="text-center mt-4">
            <Link to="/" className="text-blue-600 hover:underline">Kembali ke Daftar Kursus</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-10 text-center drop-shadow">Keranjang Belanja</h1>
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-white rounded-2xl shadow-xl p-5 mb-4">
            <div className="flex items-center">
              <img src={item.pic} alt={item.title} className="rounded-lg mr-4 h-20 w-32 object-cover shadow" />
              <div>
                <h2 className="text-lg font-bold text-blue-900">{item.title}</h2>
                <p className="text-gray-500">{item.category}</p>
                <p className="text-green-700 font-bold">{item.org_price}</p>
              </div>
            </div>
            <div>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 transition font-semibold"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
        <div className="text-center mt-8">
          <button
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-bold"
            onClick={handleAddSubscription}
          >
            Tambah Langganan (Beli)
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;