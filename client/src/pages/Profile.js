import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Profile = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] flex items-center justify-center relative overflow-hidden font-futuristic">
      {/* Futuristic glowing lines */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-blue-500/10 blur-2xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-1 h-full bg-fuchsia-500/10 blur-2xl animate-pulse" />
        <div className="absolute top-1/2 left-0 w-full h-1 bg-cyan-400/10 blur-2xl animate-pulse" style={{ transform: 'translateY(-50%)' }} />
        <div className="absolute top-1/3 left-0 w-full h-1 bg-purple-400/10 blur-2xl animate-pulse" />
      </div>
      <div className="relative z-10 w-full max-w-md mx-auto bg-base-100/90 backdrop-blur-md rounded-2xl shadow-2xl border border-fuchsia-700/40 p-8">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              className="w-32 h-32 rounded-full border-4 border-fuchsia-500 shadow-lg object-cover"
              src={user.profile_picture || `https://ui-avatars.com/api/?name=${user.username}&background=random&color=fff&size=128`}
              alt={user.username}
            />
            <span className="absolute bottom-2 right-2 w-5 h-5 bg-gradient-to-br from-fuchsia-500 to-blue-500 rounded-full border-2 border-base-100 animate-pulse"></span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-fuchsia-300 drop-shadow font-futuristic">{user.username}</h2>
          <div className="mt-1 text-blue-200 text-sm">{user.email}</div>
          <div className="mt-2 flex gap-2">
            <span className="badge badge-accent font-futuristic">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
            {user.is_admin && (
              <span className="badge badge-secondary font-futuristic">Admin</span>
            )}
          </div>
          <div className="mt-4 w-full">
            <div className="bg-gradient-to-r from-blue-900/70 to-fuchsia-900/70 rounded-lg p-4 shadow border border-fuchsia-700/20">
              <div className="flex justify-between mb-2">
                <span className="text-blue-200">User ID</span>
                <span className="font-bold text-fuchsia-300">{user.id}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-blue-200">Role</span>
                <span className="font-bold text-fuchsia-300">{user.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Admin</span>
                <span className="font-bold text-fuchsia-300">{user.is_admin ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>
        </div>
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
};

export default Profile;