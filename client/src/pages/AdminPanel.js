import React, { useEffect, useState } from 'react';
import { getAdminPanelDataApi } from '../api'; // Import fungsi API

function AdminPanel({ user }) {
  const [adminData, setAdminData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.role === 'admin') {
        try {
          setLoading(true);
          const data = await getAdminPanelDataApi(user.role); // Panggil fungsi API
          setAdminData(data);
        } catch (err) {
          setError(err.message || 'You are not authorized to view this page.');
          console.error("Error fetching admin panel data:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError('Access denied. Admins only.');
      }
    };
    fetchData();
  }, [user]);

  if (loading) {
    return <div className="text-center text-gray-500 mt-10 text-xl">Loading Admin Panel...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 mt-10 text-xl">{error}</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-16 bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Admin Panel</h2>
      {adminData ? (
        <div>
          <p className="mb-2">{adminData.message}</p>
          <p className="font-semibold">Total Courses: {adminData.courses_count}</p>
        </div>
      ) : (
        <div>Data tidak tersedia.</div>
      )}
    </div>
  );
}

export default AdminPanel;