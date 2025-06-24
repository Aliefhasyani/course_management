// client/src/api/index.js

const API_BASE_URL = 'http://127.0.0.1:5000'; // IP address yang diinginkan

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

export const loginUserApi = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
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
    const response = await fetch(`${API_BASE_URL}/api/register`, {
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
      headers: { Role: userRole } // Perhatikan: role dikirim via header
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