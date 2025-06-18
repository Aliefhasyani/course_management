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

## **📂 Struktur Proyek**  
```bash
course-management/
├── backend/             # Flask API
│   ├── app.py           # Main Flask app
│   ├── routes/          # API routes (auth, courses, users)
│   ├── models/          # Database models
│   ├── utils/           # JWT, error handlers
│   └── requirements.txt # Dependencies
├── frontend/            # React App
│   ├── src/
│   │   ├── components/  # UI Components
│   │   ├── pages/       # Role-based pages
│   │   ├── hooks/       # Custom hooks (API calls)
│   │   ├── context/     # Auth context
│   │   └── App.js       # Routing & protected routes
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```
 

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


