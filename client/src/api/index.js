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

// --- PERBAIKAN DI SINI ---
export const loginUserApi = async (username, password) => {
  try {
    // Ubah /api/login menjadi /auth/login
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
    // Ubah /api/register menjadi /auth/register
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
    // Ini sudah benar karena rute admin panel ada di bawah /api/
    const response = await fetch(`${API_BASE_URL}/api/admin-panel`, {
      headers: { Role: userRole }
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