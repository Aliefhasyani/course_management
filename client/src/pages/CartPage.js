import React from 'react';
import { Link } from 'react-router-dom';

// Menerima props 'cart', 'removeFromCart', dan 'clearCart'
function CartPage({ cart, removeFromCart, clearCart }) { 
  
  const handleRemoveFromCart = (courseId) => {
    removeFromCart(courseId); // Memanggil fungsi removeFromCart dari App.js
  };

  const handleAddSubscription = () => {
    if (cart.length === 0) {
      alert('Keranjangmu kosong. Tambahkan kursus terlebih dahulu!');
      return;
    }
    const totalItems = cart.length;
    // Menghitung total harga
    const totalPrice = cart.reduce((sum, item) => {
        const priceString = item.org_price;
        let priceValue = 0;
        if (priceString && priceString.includes('$')) {
            priceValue = parseFloat(priceString.replace('$', ''));
        }
        return sum + (isNaN(priceValue) ? 0 : priceValue);
    }, 0);

    alert(`Berhasil berlangganan ${totalItems} kursus dengan total harga $${totalPrice.toFixed(2)}!`);
    // Di aplikasi nyata, di sini kamu akan mengirim data ke backend untuk proses pembayaran
    clearCart(); // Kosongkan keranjang setelah "pembelian"
  };

  // Kondisi untuk menampilkan pesan keranjang kosong
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-blue-800 mb-10 text-center drop-shadow">Keranjang Belanja</h1>
          <p className="text-center text-gray-600 text-xl">Keranjangmu kosong.</p>
          <div className="text-center mt-4">
            <Link to="/" className="text-blue-600 hover:underline text-lg font-semibold">Kembali ke Home</Link>
          </div>
        </div>
      </div>
    );
  }

  // Tampilan keranjang jika ada item
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-10 text-center drop-shadow">Keranjang Belanja Kamu</h1>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {cart.map((item) => ( // Melakukan iterasi pada prop 'cart'
            <div key={item.id} className="flex items-center justify-between border-b border-gray-200 py-4 last:border-b-0">
              <div className="flex items-center">
                <img src={item.pic} alt={item.title} className="w-20 h-20 object-cover rounded-md mr-4 shadow-sm" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.category}</p>
                  <p className="text-green-700 font-bold">{item.org_price}</p>
                </div>
              </div>
              <div>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
          
          <div className="flex justify-end mt-8">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition transform hover:scale-105"
              onClick={handleAddSubscription}
            >
          Bayar Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;