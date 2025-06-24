const API_BASE_URL = 'http://127.0.0.1:5000';

// Helper to get JWT token from localStorage
const getToken = () => localStorage.getItem('access_token');

const authHeader = (isJson = true) => {
  const token = getToken();
  let headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (isJson) headers['Content-Type'] = 'application/json';
  return headers;
};

// For GET requests:
export const getCoursesApi = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses`, {
      headers: authHeader(false) // Don't send Content-Type for GET
    });
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
    const response = await fetch(`${API_BASE_URL}/api/courses/${id}`, {
      headers: authHeader(false)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching course with ID ${id}:`, error);
    throw error;
  }
};

export const createCourseApi = async (courseData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses`, {
      method: 'POST',
      headers: authHeader(),
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

export const updateCourseApi = async (courseId, courseData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/${courseId}`, {
      method: 'PUT',
      headers: authHeader(),
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

export const deleteCourseApi = async (courseId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/${courseId}`, {
      method: 'DELETE',
      headers: authHeader()
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

// --- API Auth ---

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

export const getAdminPanelDataApi = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin-panel`, {
      headers: authHeader(false)
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

// --- USER CRUD ---

export const getAllUsersApi = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/users`, {
      headers: authHeader(false)
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

export const createUserApi = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/users`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(userData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to create user');
  return data;
};

export const updateUserApi = async (userId, userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/users/${userId}`, {
      method: 'PUT',
      headers: authHeader(),
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

export const deleteUserApi = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/users/${userId}`, {
      method: 'DELETE',
      headers: authHeader()
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
