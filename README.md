# Swasthya Sahayak

Swasthya Sahayak is a healthcare platform for booking and scheduling doctor appointments. It includes an **Admin Frontend (React)** and a **Backend (Node.js, Express, MongoDB)**.

## Features
- **Admin Panel** for managing doctors and appointments
- **User Dashboard** for booking appointments
- **Admin DashBoard** for managing Appointments, patients
- **Machine Learning** for disease prediction
- **Prescription Upload & Analysis** (OCR + Gemini API)
- **Blockchain-Based Health Insurance** (Ethereum)

---
## 🏗 Tech Stack

### **Frontend (Admin Panel - React)**
- React.js
- Tailwind CSS
- Axios
- React Router

### **Backend**
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer (for file uploads)
- Cloudinary

---
## 🚀 Installation & Setup

### **Backend Setup**
```bash
# Clone the repository
git clone <your-repo-url>
cd backend

# Install dependencies
npm install

# Start the server
npm start
```

### **Frontend (Admin Panel) Setup**
```bash
cd admin-frontend

# Install dependencies
npm i

# Start the React app
npm run dev
```

---
## 📌 API Routes
### **User Routes**
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (Auth Required)

### **Doctor Routes**
- `POST /api/doctors/add` - Add a new doctor (Admin Only)
- `GET /api/doctors` - Get all doctors

### **Appointments**
- `POST /api/appointments/book` - Book an appointment
- `GET /api/appointments/user` - Get user’s appointments


---
## 🤝 Contributing
Feel free to fork the repo and submit PRs! 🚀

---
## 📜 License
MIT License
