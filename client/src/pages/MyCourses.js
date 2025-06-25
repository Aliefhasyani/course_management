import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import * as api from '../api';

const SellerCourseManager = () => {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.getMyCourses()
            .then(res => setCourses(res.data))
            .catch(err => console.error("Failed to fetch seller courses:", err))
            .finally(() => setIsLoading(false));
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await api.deleteCourse(id);
                setCourses(courses.filter(course => course.id !== id));
            } catch (error) {
                console.error("Failed to delete course", error);
                alert('Error deleting course');
            }
        }
    };

    if (isLoading) return <div className="text-center p-10">Loading your courses...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">My Uploaded Courses</h2>
                <Link to="/create-course" className="bg-green-500 text-white font-bold px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
                    + Create Course
                </Link>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full leading-normal">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Course</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.length > 0 ? courses.map(course => (
                            <tr key={course.id} className="hover:bg-gray-50">
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 w-16 h-10">
                                            <img className="w-full h-full rounded-md object-cover" src={course.pic || 'https://via.placeholder.com/150'} alt={course.title} />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap font-semibold">{course.title}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">${course.org_price || '0.00'}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <Link to={`/edit-course/${course.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4 font-medium">Edit</Link>
                                    <button onClick={() => handleDelete(course.id)} className="text-red-600 hover:text-red-900 font-medium">Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="3" className="text-center py-10">You have not uploaded any courses yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const BuyerCourseList = () => {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.getEnrolledCourses()
            .then(res => setCourses(res.data))
            .catch(err => console.error("Failed to fetch enrolled courses:", err))
            .finally(() => setIsLoading(false));
    }, []);
    
    if (isLoading) return <div className="text-center p-10">Loading your enrolled courses...</div>;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">My Enrolled Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.length > 0 ? courses.map(course => (
                    <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                        <img src={course.pic || 'https://via.placeholder.com/400x225'} alt={course.title} className="w-full h-48 object-cover"/>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-gray-800">{course.title}</h3>
                            <p className="text-gray-600 mb-4">by {course.seller_name}</p>
                            <Link to={`/courses/${course.id}`} className="font-semibold text-indigo-600 hover:underline">
                                Go to Course &rarr;
                            </Link>
                        </div>
                    </div>
                )) : (
                    <p className="col-span-full text-center">You haven't enrolled in any courses yet.</p>
                )}
            </div>
        </div>
    );
};

const MyCourses = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="text-center p-10">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="container mx-auto p-8">
            {user.role === 'seller' || user.is_admin ? <SellerCourseManager /> : <BuyerCourseList />}
        </div>
    );
};

export default MyCourses;