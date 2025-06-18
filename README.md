# **Tugas Project MK Web Lanjutan**  
**Sistem Manajemen Kursus (Course Management System)**  


---

## **📝 Deskripsi Proyek**  
Aplikasi **Sistem Manajemen Kursus** dirancang untuk memudahkan pengelolaan materi pembelajaran, pendaftaran kursus, dan manajemen pengguna dengan dua role (**Admin** dan **Student**). Aplikasi ini dibangun menggunakan:  
- **Frontend:** React + Tailwind CSS (+ DaisyUI)  
- **Backend:** Flask (Python) + JWT Authentication  
- **Database:** PostgreSQL / SQLite  

---

## **🎯 Fitur Utama**  
### **Role: Admin**  
- ✅ Manajemen Kursus (CRUD)  
- ✅ Manajemen Pengguna (Student)  
- ✅ Melihat laporan pendaftaran kursus  

### **Role: Student**  
- ✅ Mendaftar & login  
- ✅ Melihat daftar kursus  
- ✅ Mendaftar ke kursus  
- ✅ Melihat progress pembelajaran  

---


## **🔐 Autentikasi & Role Management**  
- Menggunakan **JWT (JSON Web Token)** untuk login & role-based access.  
- **Protected Routes** di frontend menggunakan `react-router-dom`.  
- **Contoh endpoint auth:**  
  - `POST /api/auth/login` (Email & Password)  
  - `GET /api/auth/me` (Get user data from JWT)  

---



## **⚡ Fitur Teknis (Backend)**  
✅ **Modular Flask** (Blueprint untuk routes)  
✅ **CRUD API** (GET, POST, PUT, DELETE)  
✅ **JWT Authentication** (Role-based access)  
✅ **Error Handling** (404, 500, validasi input)  

---

## **🎨 Fitur Teknis (Frontend)**  
✅ **Tailwind CSS + DaisyUI** (Responsive UI)  
✅ **Protected Routes** (Berdasarkan role)  
✅ **Loading & Error Handling** (UX lebih baik)  
✅ **Mobile-Friendly Design**  

---



---

## **🚀 Deployment**  
### **1. Backend (Flask)**  
- **Render / Railway / Heroku**  
- Pastikan set environment variables (`JWT_SECRET`, `DATABASE_URL`).  

### **2. Frontend (React)**  
- **Vercel / Netlify**  
- Atur `API_BASE_URL` ke backend yang sudah di-deploy.  

---

## **📌 Referensi**  
- [React Router](https://reactrouter.com)  
- [Flask JWT Extended](https://flask-jwt-extended.readthedocs.io/)  
- [DaisyUI Docs](https://daisyui.com/)  



 

---
project-root/
├── backend/               # Flask API
│   ├── app/               # Modular structure
│   │   ├── __init__.py
│   │   ├── routes/
│   │   │   ├── auth.py    # JWT endpoints
│   │   │   ├── courses.py # CRUD endpoints
│   │   │   └── users.py   # User management
│   │   ├── models/        # DB models
│   │   ├── utils/         # JWT, error handlers
│   │   └── config.py      # DB config
│   ├── requirements.txt
│   └── run.py             # Entry point
│
├── frontend/              # React App
│   ├── src/
│   │   ├── api/           # Axios API calls
│   │   ├── components/    # Reusable UI
│   │   ├── pages/         # Role-based pages
│   │   ├── contexts/      # Auth context
│   │   ├── hooks/         # Custom hooks
│   │   ├── App.js         # Main router
│   │   └── index.js
│   ├── tailwind.config.js
│   └── package.json
│
└── docs/                  # UML, use case diagrams
