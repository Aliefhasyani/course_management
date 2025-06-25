import React, { useState, useEffect } from 'react';
import { 
  getAdminPanelDataApi, getCoursesApi, createCourseApi, updateCourseApi, deleteCourseApi,
  getAllUsersApi, updateUserApi, deleteUserApi, createUserApi
} from '../api';

function AdminPanel({ user }) {
  const [adminData, setAdminData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState('courses');

  // State untuk Course Modal (Tambah/Edit Kursus)
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({
    title: '', description: '', org_price: '', category: '', language: '',
    platform: '', pic: '', sku: '', coupon: '', rating: 0.0, duration: 0.0, expiry: ''
  });
  const [courseFormErrors, setCourseFormErrors] = useState({});

  // State untuk User Modal (Edit User)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userForm, setUserForm] = useState({
    username: '', email: '', role: 'buyer', password: ''
  });
  const [userFormErrors, setUserFormErrors] = useState({});

  // --- FUNGSI UTAMA UNTUK MEMUAT DATA ---
  const fetchData = async () => {
    if (!user || user.role !== 'admin') {
      setLoading(false);
      setError('Access denied. Admins only.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const adminResponse = await getAdminPanelDataApi();
      setAdminData(adminResponse);

      const coursesResponse = await getCoursesApi();
      setCourses(coursesResponse);

      const usersResponse = await getAllUsersApi();
      setUsers(usersResponse);
      
    } catch (err) {
      setError(err.message || 'Gagal memuat data admin, kursus, atau pengguna.');
      console.error("Fetch error in AdminPanel:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  // --- LOGIKA UNTUK PENGELOLAAN KURSUS ---
  const handleCourseFormChange = (e) => {
    let value = e.target.value;
    if (e.target.name === 'rating' || e.target.name === 'duration') {
      value = parseFloat(value) || 0.0;
    }
    setCourseForm({ ...courseForm, [e.target.name]: value });
  };

  const openCreateCourseModal = () => {
    setCurrentCourse(null); 
    setCourseForm({ 
      title: '', description: '', org_price: '', category: '', language: '',
      platform: '', pic: '', sku: '', coupon: '', rating: 0.0, duration: 0.0, expiry: ''
    });
    setCourseFormErrors({});
    setIsCourseModalOpen(true);
  };

  const openEditCourseModal = (course) => {
    setCurrentCourse(course); 
    setCourseForm({ 
      title: course.title || '', description: course.description || '', org_price: course.org_price || '', 
      category: course.category || '', language: course.language || '', platform: course.platform || '', 
      pic: course.pic || '', sku: course.sku || '', coupon: course.coupon || '', 
      rating: course.rating || 0.0, duration: course.duration || 0.0, expiry: course.expiry || ''
    });
    setCourseFormErrors({});
    setIsCourseModalOpen(true);
  };

  const validateCourseForm = () => {
    const errors = {};
    if (!courseForm.title) errors.title = 'Title is required.';
    if (!courseForm.org_price) errors.org_price = 'Original price is required.';
    if (!courseForm.description) errors.description = 'Description is required.';
    setCourseFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCourseFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateCourseForm()) {
      alert('Terdapat kesalahan pada input form kursus. Mohon periksa kembali.');
      return;
    }
    setError('');
    try {
      if (currentCourse) {
        await updateCourseApi(currentCourse.id, courseForm);
        alert('Kursus berhasil diupdate!');
      } else {
        await createCourseApi(courseForm);
        alert('Kursus berhasil ditambahkan!');
      }
      setIsCourseModalOpen(false); 
      setCurrentCourse(null); 
      setCourseForm({ 
        title: '', description: '', org_price: '', category: '', language: '',
        platform: '', pic: '', sku: '', coupon: '', rating: 0.0, duration: 0.0, expiry: ''
      });
      fetchData(); 
    } catch (err) {
      setError(err.message || 'Gagal menyimpan kursus.');
      console.error("Submit course form error:", err);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus kursus ini?')) {
      return;
    }
    setError('');
    try {
      await deleteCourseApi(courseId);
      alert('Kursus berhasil dihapus!');
      fetchData(); 
    } catch (err) {
      setError(err.message || 'Gagal menghapus kursus.');
      console.error("Delete course error:", err);
    }
  };

  // --- LOGIKA UNTUK PENGELOLAAN USER ---
  const handleUserFormChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const openCreateUserModal = () => {
    setCurrentUser(null);
    setUserForm({ username: '', email: '', role: 'buyer', password: '' }); // role: 'buyer' as default
    setUserFormErrors({});
    setIsCreateUserModalOpen(true);
  };

  const validateUserForm = () => {
    const errors = {};
    if (!userForm.username) errors.username = 'Username is required.';
    if (!userForm.email) errors.email = 'Email is required.';
    if (!userForm.role) errors.role = 'Role is required.';
    if (!currentUser && !userForm.password) errors.password = 'Password is required for new users.';
    if (userForm.password && userForm.password.length < 6) errors.password = 'Password must be at least 6 characters.';
    setUserFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateUserSubmit = async (e) => {
    e.preventDefault();
    if (!validateUserForm()) {
      alert('Terdapat kesalahan pada input form pengguna. Mohon periksa kembali.');
      return;
    }
    setError('');
    try {
      await createUserApi(userForm);
      alert('Pengguna berhasil dibuat!');
      setIsCreateUserModalOpen(false);
      setUserForm({ username: '', email: '', role: 'buyer', password: '' });
      fetchData();
    } catch (err) {
      setError(err.message || 'Gagal membuat pengguna.');
    } 
  };

  const handleUserFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateUserForm()) {
      alert('Terdapat kesalahan pada input form pengguna. Mohon periksa kembali.');
      return;
    }
    setError('');
    try {
      await updateUserApi(currentUser.id, userForm);
      alert('Pengguna berhasil diupdate!');
      setIsUserModalOpen(false);
      setCurrentUser(null);
      setUserForm({ username: '', email: '', role: '', password: '' });
      fetchData();
    } catch (err) {
      setError(err.message || 'Gagal menyimpan perubahan pengguna.');
      console.error("Submit user form error:", err);
    }
  };

  const openEditUserModal = (userToEdit) => {
    setCurrentUser(userToEdit);
    setUserForm({
      username: userToEdit.username || '',
      email: userToEdit.email || '',
      role: userToEdit.role || 'buyer',
      password: ''
    });
    setUserFormErrors({});
    setIsUserModalOpen(true);
  };

  const handleDeleteUser = async (userId, usernameToDelete) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus pengguna '${usernameToDelete}'?`)) {
      return;
    }
    setError('');
    try {
      await deleteUserApi(userId);
      alert('Pengguna berhasil dihapus!');
      fetchData();
    } catch (err) {
      setError(err.message || 'Gagal menghapus pengguna.');
      console.error("Delete user error:", err);
    }
  };

  // --- RENDER UTAMA ---
  if (!user || (user.role !== 'admin' && user.role !== 'seller')) {
    return <div className="text-center text-red-600 mt-10 text-xl">Access denied.</div>;
  }

  if (loading) {
    return <div className="text-center text-gray-500 mt-10 text-xl">Memuat Admin Panel...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] py-10 relative overflow-hidden">
      {/* Futuristic glowing lines */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-blue-500/10 blur-2xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-1 h-full bg-fuchsia-500/10 blur-2xl animate-pulse" />
        <div className="absolute top-1/2 left-0 w-full h-1 bg-cyan-400/10 blur-2xl animate-pulse" style={{ transform: 'translateY(-50%)' }} />
        <div className="absolute top-1/3 left-0 w-full h-1 bg-purple-400/10 blur-2xl animate-pulse" />
      </div>
      <div className="max-w-7xl mx-auto px-4 z-10 relative">
        <h1 className="text-4xl font-extrabold text-blue-300 mb-6 text-center drop-shadow font-futuristic tracking-widest">
          {user.role === 'admin' ? 'Admin Panel' : 'Seller Panel'}
        </h1>
        {error && <div className="text-red-400 text-center mb-4">{error}</div>}

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <button
            className={`py-2 px-6 rounded-t-lg font-semibold transition-all duration-200 border-b-4 ${activeTab === 'courses' ? 'bg-gradient-to-r from-blue-700 to-fuchsia-700 text-white border-fuchsia-400 shadow-lg' : 'bg-slate-800 text-blue-200 border-transparent hover:bg-slate-700'}`}
            onClick={() => setActiveTab('courses')}
          >
            Kelola Kursus
          </button>
          {user.role === 'admin' && (
            <button
              className={`py-2 px-6 rounded-t-lg font-semibold transition-all duration-200 border-b-4 ${activeTab === 'users' ? 'bg-gradient-to-r from-blue-700 to-fuchsia-700 text-white border-fuchsia-400 shadow-lg' : 'bg-slate-800 text-blue-200 border-transparent hover:bg-slate-700'}`}
              onClick={() => setActiveTab('users')}
            >
              Kelola Pengguna
            </button>
          )}
        </div>

        {/* Hanya admin yang bisa akses tab users */}
        {activeTab === 'courses' && (
          <>
            <div className="bg-gradient-to-r from-blue-900/80 to-fuchsia-900/80 rounded-xl shadow-2xl p-6 mb-8 border border-blue-800/30">
              <p className="mb-4 text-lg text-blue-100">Total Kursus di Database: <span className="font-semibold text-fuchsia-300">{adminData?.courses_count || '...'}</span></p>
              <button
                className="bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg transition shadow-lg"
                onClick={openCreateCourseModal}
              >
                + Tambah Kursus Baru
              </button>
            </div>

            {/* Daftar Kursus */}
            <div className="bg-gradient-to-r from-blue-900/80 to-fuchsia-900/80 rounded-xl shadow-2xl p-6 border border-blue-800/30">
              <h2 className="text-2xl font-bold text-blue-200 mb-6">Daftar Kursus</h2>
              {courses.length === 0 ? (
                <p className="text-blue-200 text-center">Tidak ada kursus yang ditemukan. Anda bisa menambahkannya atau mengimpor dari Udemy.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-transparent">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-800 to-fuchsia-800 text-fuchsia-200 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">ID</th>
                        <th className="py-3 px-6 text-left">Title</th>
                        <th className="py-3 px-6 text-left">Price</th>
                        <th className="py-3 px-6 text-left">Category</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-blue-100 text-sm font-light">
                      {courses.map(course => (
                        <tr key={course.id} className="border-b border-blue-900/40 hover:bg-fuchsia-900/30 transition">
                          <td className="py-3 px-6 text-left whitespace-nowrap">{course.id}</td>
                          <td className="py-3 px-6 text-left">{course.title}</td>
                          <td className="py-3 px-6 text-left">{course.org_price}</td>
                          <td className="py-3 px-6 text-left">{course.category}</td>
                          <td className="py-3 px-6 text-center">
                            <div className="flex item-center justify-center space-x-2">
                              <button
                                className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded transition shadow"
                                onClick={() => openEditCourseModal(course)}
                              >
                                Edit
                              </button>
                              <button
                                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition shadow"
                                onClick={() => handleDeleteCourse(course.id)}
                              >
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'users' && user.role === 'admin' && (
          <>
            <div className="bg-gradient-to-r from-blue-900/80 to-fuchsia-900/80 rounded-xl shadow-2xl p-6 mb-8 border border-blue-800/30">
              <button
                className="bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg transition shadow-lg"
                onClick={openCreateUserModal}
              >
                + Tambah Pengguna Baru
              </button>
            </div>
            <div className="bg-gradient-to-r from-blue-900/80 to-fuchsia-900/80 rounded-xl shadow-2xl p-6 border border-blue-800/30">
              <h2 className="text-2xl font-bold text-blue-200 mb-6">Daftar Pengguna</h2>
              {users.length === 0 ? (
                <p className="text-blue-200 text-center">Tidak ada pengguna yang ditemukan.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-transparent">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-800 to-fuchsia-800 text-fuchsia-200 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">ID</th>
                        <th className="py-3 px-6 text-left">Username</th>
                        <th className="py-3 px-6 text-left">Email</th>
                        <th className="py-3 px-6 text-left">Role</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-blue-100 text-sm font-light">
                      {users.map(userItem => (
                        <tr key={userItem.id} className="border-b border-blue-900/40 hover:bg-fuchsia-900/30 transition">
                          <td className="py-3 px-6 text-left whitespace-nowrap">{userItem.id}</td>
                          <td className="py-3 px-6 text-left">{userItem.username}</td>
                          <td className="py-3 px-6 text-left">{userItem.email}</td>
                          <td className="py-3 px-6 text-left">{userItem.role}</td>
                          <td className="py-3 px-6 text-center">
                            <div className="flex item-center justify-center space-x-2">
                              <button
                                className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded transition shadow"
                                onClick={() => openEditUserModal(userItem)}
                              >
                                Edit
                              </button>
                              <button
                                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition shadow"
                                onClick={() => handleDeleteUser(userItem.id, userItem.username)}
                              >
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* Modal Tambah/Edit Kursus */}
        {isCourseModalOpen && (
          <div className="fixed inset-0 bg-slate-900/80 flex justify-center items-center z-50">
            <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-fuchsia-900 rounded-lg shadow-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto border border-fuchsia-700/30">
              <h2 className="text-2xl font-bold text-fuchsia-200 mb-6 text-center">
                {currentCourse ? 'Edit Kursus' : 'Tambah Kursus Baru'}
              </h2>
              <form onSubmit={handleCourseFormSubmit} className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-blue-200 text-sm font-bold mb-1">Title:</label>
                  <input type="text" name="title" value={courseForm.title} onChange={handleCourseFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-900 text-fuchsia-100 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                  {courseFormErrors.title && <p className="text-red-400 text-xs italic">{courseFormErrors.title}</p>}
                </div>
                <div>
                  <label className="block text-blue-200 text-sm font-bold mb-1">Original Price:</label>
                  <input type="text" name="org_price" value={courseForm.org_price} onChange={handleCourseFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-900 text-fuchsia-100 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                  {courseFormErrors.org_price && <p className="text-red-400 text-xs italic">{courseFormErrors.org_price}</p>}
                </div>
                <div>
                  <label className="block text-blue-200 text-sm font-bold mb-1">Description:</label>
                  <textarea name="description" value={courseForm.description} onChange={handleCourseFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-900 text-fuchsia-100 leading-tight focus:outline-none focus:shadow-outline h-24"
                    required
                  ></textarea>
                  {courseFormErrors.description && <p className="text-red-400 text-xs italic">{courseFormErrors.description}</p>}
                </div>
                <div>
                  <label className="block text-blue-200 text-sm font-bold mb-1">Category:</label>
                  <input type="text" name="category" value={courseForm.category} onChange={handleCourseFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-900 text-fuchsia-100 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-blue-200 text-sm font-bold mb-1">Language:</label>
                  <input type="text" name="language" value={courseForm.language} onChange={handleCourseFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-900 text-fuchsia-100 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-blue-200 text-sm font-bold mb-1">Platform:</label>
                  <input type="text" name="platform" value={courseForm.platform} onChange={handleCourseFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-900 text-fuchsia-100 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-blue-200 text-sm font-bold mb-1">Picture URL (pic):</label>
                  <input type="url" name="pic" value={courseForm.pic} onChange={handleCourseFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-900 text-fuchsia-100 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-blue-200 text-sm font-bold mb-1">SKU:</label>
                  <input type="text" name="sku" value={courseForm.sku} onChange={handleCourseFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-900 text-fuchsia-100 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-blue-200 text-sm font-bold mb-1">Coupon:</label>
                  <input type="text" name="coupon" value={courseForm.coupon} onChange={handleCourseFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-900 text-fuchsia-100 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-blue-200 text-sm font-bold mb-1">Rating (0.0 - 5.0):</label>
                  <input type="number" step="0.1" min="0" max="5" name="rating" value={courseForm.rating} onChange={handleCourseFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-900 text-fuchsia-100 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-blue-200 text-sm font-bold mb-1">Duration (hours):</label>
                  <input type="number" step="0.1" name="duration" value={courseForm.duration} onChange={handleCourseFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-900 text-fuchsia-100 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-blue-200 text-sm font-bold mb-1">Expiry Date (YYYY-MM-DD):</label>
                  <input type="text" name="expiry" value={courseForm.expiry} onChange={handleCourseFormChange}
                    placeholder="YYYY-MM-DD"
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-900 text-fuchsia-100 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition"
                    onClick={() => setIsCourseModalOpen(false)}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded transition shadow"
                  >
                    {currentCourse ? 'Update' : 'Tambah'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Edit User */}
        {isUserModalOpen && user.role === 'admin' && (
          <div className="fixed inset-0 bg-slate-900/80 flex justify-center items-center z-50">
            <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-fuchsia-900 rounded-lg shadow-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto border border-fuchsia-700/30">
              <h2 className="text-2xl font-bold text-fuchsia-200 mb-6 text-center">Edit Pengguna</h2>
              <form onSubmit={handleUserFormSubmit} className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-blue-200 text-sm font-bold mb-1">Username:</label>
                  <input type="text" name="username" value={userForm.username} onChange={handleUserFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-900 text-fuchsia-100 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                  {userFormErrors.username && <p className="text-red-400 text-xs italic">{userFormErrors.username}</p>}
                </div>
                <div>
                  <label className="block text-blue-200 text-sm font-bold mb-1">Email:</label>
                  <input type="email" name="email" value={userForm.email} onChange={handleUserFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-900 text-fuchsia-100 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                  {userFormErrors.email && <p className="text-red-400 text-xs italic">{userFormErrors.email}</p>}
                </div>
                <div>
                  <label className="block text-blue-200 text-sm font-bold mb-1">Role:</label>
                  <select name="role" value={userForm.role} onChange={handleUserFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-900 text-fuchsia-100 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                  </select>
                  {userFormErrors.role && <p className="text-red-400 text-xs italic">{userFormErrors.role}</p>}
                </div>
                <div>
                  <label className="block text-blue-200 text-sm font-bold mb-1">Password (biarkan kosong jika tidak ingin mengubah):</label>
                  <input type="password" name="password" value={userForm.password} onChange={handleUserFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-900 text-fuchsia-100 leading-tight focus:outline-none focus:shadow-outline"
                  />
                   {userFormErrors.password && <p className="text-red-400 text-xs italic">{userFormErrors.password}</p>}
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition"
                    onClick={() => setIsUserModalOpen(false)}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded transition shadow"
                  >
                    Update User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Tambah User */}
        {isCreateUserModalOpen && user.role === 'admin' && (
          <div className="fixed inset-0 bg-slate-900/80 flex justify-center items-center z-50">
            <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-fuchsia-900 rounded-lg shadow-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto border border-fuchsia-700/30">
              <h2 className="text-2xl font-bold text-fuchsia-200 mb-6 text-center">Tambah Pengguna Baru</h2>
              <form onSubmit={handleCreateUserSubmit} className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-blue-200 text-sm font-bold mb-1">Username:</label>
                  <input type="text" name="username" value={userForm.username} onChange={handleUserFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-900 text-fuchsia-100 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                  {userFormErrors.username && <p className="text-red-400 text-xs italic">{userFormErrors.username}</p>}
                </div>
                <div>
                  <label className="block text-blue-200 text-sm font-bold mb-1">Email:</label>
                  <input type="email" name="email" value={userForm.email} onChange={handleUserFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-900 text-fuchsia-100 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                  {userFormErrors.email && <p className="text-red-400 text-xs italic">{userFormErrors.email}</p>}
                </div>
                <div>
                  <label className="block text-blue-200 text-sm font-bold mb-1">Role:</label>
                  <select name="role" value={userForm.role} onChange={handleUserFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-900 text-fuchsia-100 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                  </select>
                  {userFormErrors.role && <p className="text-red-400 text-xs italic">{userFormErrors.role}</p>}
                </div>
                <div>
                  <label className="block text-blue-200 text-sm font-bold mb-1">Password:</label>
                  <input type="password" name="password" value={userForm.password} onChange={handleUserFormChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-900 text-fuchsia-100 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                  {userFormErrors.password && <p className="text-red-400 text-xs italic">{userFormErrors.password}</p>}
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition"
                    onClick={() => setIsCreateUserModalOpen(false)}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded transition shadow"
                  >
                    Tambah
                  </button>
                </div>
              </form>
            </div>
          </div>
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

export default AdminPanel;