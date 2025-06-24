import React, { useState, useEffect } from 'react';

function QuoteCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); 
      return () => clearInterval(interval); 
    }
  }, [images.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (!images || images.length === 0) {
    return <div className="text-center text-gray-500">Tidak ada gambar untuk ditampilkan di karosel.</div>;
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-lg shadow-xl" style={{ height: '300px' }}>
      <img
        src={images[currentIndex]}
        alt={`Quote ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-opacity duration-500"
        style={{ opacity: 1 }}
      />

      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-r-lg focus:outline-none hover:bg-opacity-75 transition"
      >
        &#10094; 
      </button>

      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-l-lg focus:outline-none hover:bg-opacity-75 transition"
      >
        &#10095;
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            } transition`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default QuoteCarousel;