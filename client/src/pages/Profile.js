import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Profile = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="text-center p-10">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="bg-gray-100 font-sans h-screen w-full flex flex-row justify-center items-center">
            <div className="card w-96 mx-auto bg-white shadow-xl hover:shadow">
                <img className="w-32 h-32 mx-auto rounded-full border-8 border-white -mt-16 shadow-lg object-cover" src={user.profile_picture || `https://ui-avatars.com/api/?name=${user.username}&background=random&color=fff&size=128`} alt={user.username} />
                <div className="text-center mt-2 text-3xl font-medium">{user.username}</div>
                <div className="text-center mt-2 font-light text-sm text-gray-500">{user.email}</div>
                <div className="text-center font-normal text-lg mt-2">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</div>
                <div className="px-6 text-center mt-2 font-light text-sm">
                    <p>
                        User ID: {user.id}
                    </p>
                </div>
                <hr className="mt-8" />
                <div className="flex p-4">
                    <div className="w-1/2 text-center">
                        <span className="font-bold">{user.is_admin ? "Yes" : "No"}</span>
                        <span className="text-gray-600"> Admin</span>
                    </div>
                    <div className="w-0 border border-gray-300"></div>
                    <div className="w-1/2 text-center">
                        <span className="font-bold">{user.role === 'seller' ? 'Seller' : 'Buyer'}</span>
                        <span className="text-gray-600"> Role</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;