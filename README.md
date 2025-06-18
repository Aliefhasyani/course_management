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
 

---


