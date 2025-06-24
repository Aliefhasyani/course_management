// client/src/api/index.js

const API_BASE_URL = 'http://127.0.0.1:5000'; // Pastikan ini menggunakan localhost

// Helper untuk membuat header dengan otentikasi role
const authHeader = (role) => {
  return {
    'Content-Type': 'application/json',
    'Role': role // Mengirim role di header untuk middleware admin_required
  };
};

// --- API Course (sudah ada) ---

export const getCoursesApi = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const getCourseByIdApi = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching course with ID ${id}:`, error);
    throw error;
  }
};

export const createCourseApi = async (courseData, userRole) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses`, {
      method: 'POST',
      headers: authHeader(userRole),
      body: JSON.stringify(courseData)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create course');
    }
    return data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

export const updateCourseApi = async (courseId, courseData, userRole) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/${courseId}`, {
      method: 'PUT',
      headers: authHeader(userRole),
      body: JSON.stringify(courseData)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update course');
    }
    return data;
  } catch (error) {
    console.error(`Error updating course ${courseId}:`, error);
    throw error;
  }
};

export const deleteCourseApi = async (courseId, userRole) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/${courseId}`, {
      method: 'DELETE',
      headers: authHeader(userRole)
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to delete course');
    }
    return { message: 'Course deleted successfully!' };
  } catch (error) {
    console.error(`Error deleting course ${courseId}:`, error);
    throw error;
  }
};

// --- API Autentikasi (sudah ada) ---

export const loginUserApi = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const registerUserApi = async (form) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    return data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const getAdminPanelDataApi = async (userRole) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin-panel`, {
      headers: authHeader(userRole) 
    });
    if (!response.ok) {
      throw new Error('Forbidden');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching admin panel data:", error);
    throw error;
  }
};

// --- FUNGSI CRUD USER BARU ---

export const getAllUsersApi = async (userRole) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/users`, {
      headers: authHeader(userRole)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch users');
    }
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};


export const createUserApi = async (userData, userRole) => {
  const response = await fetch(`${API_BASE_URL}/auth/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(userRole ? { 'Authorization': `Bearer ${userRole}` } : {})
    },
    body: JSON.stringify(userData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to create user');
  return data;
};

export const updateUserApi = async (userId, userData, userRole) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/users/${userId}`, {
      method: 'PUT',
      headers: authHeader(userRole),
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update user');
    }
    return data;
  } catch (error) {
    console.error(`Error updating user ${userId}:`, error);
    throw error;
  }
};

export const deleteUserApi = async (userId, userRole) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/users/${userId}`, {
      method: 'DELETE',
      headers: authHeader(userRole)
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to delete user');
    }
    return { message: 'User deleted successfully!' };
  } catch (error) {
    console.error(`Error deleting user ${userId}:`, error);
    throw error;
  }
};