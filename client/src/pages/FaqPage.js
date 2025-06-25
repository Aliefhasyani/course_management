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

  if (loading) return <div className="text-center mt-20 text-gray-500 text-xl">Loading FAQs...</div>;

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">Frequently Asked Questions
        <br>
        </br>
        (FAQ)
        </h1>
      {faqs.length === 0 ? (
        <div className="text-center text-gray-500">No FAQs found.</div>
      ) : (
        <ul className="space-y-6">
          {faqs.map(faq => (
            <li key={faq.id} className="bg-white rounded-lg shadow p-6">
              <h2 className="font-semibold text-lg mb-2">{faq.question}</h2>
              <p className="text-gray-700">{faq.answer}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FaqPage;