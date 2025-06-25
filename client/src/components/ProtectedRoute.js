// client/src/components/ProtectedRoute.js

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
  const location = useLocation();

  if (!user) {
    // Jika user tidak ada (belum login), redirect ke halaman /login.
    // Kita juga menyimpan halaman asal (location) yang ingin mereka tuju.
    // Ini berguna agar setelah login, kita bisa mengarahkan mereka kembali ke halaman detail.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Jika user ada, tampilkan komponen yang seharusnya (children).
  return children;
};

export default ProtectedRoute;