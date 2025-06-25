import React, { useEffect, useState } from 'react';

function FaqPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/faqs')
      .then(res => res.json())
      .then(data => setFaqs(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

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
        <h1 className="text-4xl font-extrabold mb-8 text-center text-primary drop-shadow font-futuristic">
          Frequently Asked Questions <span className="block text-lg font-normal text-base-content/70">(FAQ)</span>
        </h1>
        {faqs.length === 0 ? (
          <div className="text-center text-base-content/60">Tidak ada FAQ ditemukan.</div>
        ) : (
          <ul className="space-y-6">
            {faqs.map(faq => (
              <li key={faq.id} className="bg-gradient-to-br from-blue-900/70 to-fuchsia-900/70 rounded-xl shadow p-6 border border-fuchsia-700/20">
                <h2 className="font-semibold text-lg mb-2 text-primary font-futuristic">{faq.question}</h2>
                <p className="text-base-content/80 text-blue-100">{faq.answer}</p>
              </li>
            ))}
          </ul>
        )}
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

export default FaqPage;