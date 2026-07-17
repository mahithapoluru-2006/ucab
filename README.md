# ucabcd frontend

# 🚖 UCAB – Online Cab Booking System

> **🎥 Demo Video:**  
> **▶ Watch Here:** https://1drv.ms/v/c/ecbafdaaba94ab0b/IQAOfDFh_pqmT422vJ2jwGkhAWpasJoIl0hRuS3Frj1eFr4?e=gBI6nH

> **💻 GitHub Repository:**  
> **🔗 Repository:** https://github.com/mahithapoluru-2006/ucab


## 📖 Overview

UCAB is a full-stack MERN-based Online Cab Booking System that enables users to book cabs, drivers to manage ride requests, and administrators to monitor the complete platform. The application provides secure authentication, cab booking, driver management, online payment, booking history, and real-time ride updates through an interactive web interface.



## ✨ Features

### 👤 User Module

- User Registration
- User Login (JWT Authentication)
- Book a Cab
- View Booking History
- Online Payment
- Track Ride Status

### 🚖 Driver Module

- Driver Registration
- Driver Login
- Accept Ride Requests
- Complete Rides
- Driver Dashboard
- Share Live Location

### 👨‍💼 Admin Module

- Admin Login
- Manage Users
- Manage Drivers
- Manage Bookings
- Dashboard Overview

### 🌍 Additional Features

- Google Maps Integration
- Live Driver Location Tracking
- Real-Time Ride Updates using Socket.IO
- JWT Authentication
- MongoDB Atlas Database
- Responsive Bootstrap User Interface



## 🛠 Tech Stack

### Frontend

- React.js
- HTML5
- CSS3
- JavaScript
- Bootstrap
- Axios

### Backend

- Node.js
- Express.js
- Socket.IO
- JWT Authentication
- bcryptjs

### Database

- MongoDB Atlas

### APIs & Libraries

- Google Maps API
- Razorpay Payment Gateway
- Mongoose

### Development Tools

- Git
- GitHub
- GitHub Codespaces
- Visual Studio Code
- Postman



## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/mahithapoluru-2006/ucab.git
```

### Navigate to Project

```bash
cd ucab
```

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

Create a `.env` file inside the **backend** folder.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```



## 📂 Folder Structure

```text
UCAB
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   ├── package.json
│   └── .env
│
├── README.md
└── .gitignore




## 🔒 Authentication

- JSON Web Token (JWT)
- bcryptjs Password Hashing
- Protected Routes
- Role-Based Access (User, Driver, Admin)



## 🧪 Testing

The following modules have been tested successfully:

- ✅ User Registration
- ✅ User Login
- ✅ Driver Registration
- ✅ Driver Login
- ✅ Cab Booking
- ✅ Booking History
- ✅ Ride Acceptance
- ✅ Ride Completion
- ✅ Online Payment
- ✅ Admin Dashboard
- ✅ CRUD Operations

### Testing Tools

- Postman
- MongoDB Compass
- Browser Developer Tools



## 🚀 Future Enhancements

- Ride Cancellation
- Ratings & Reviews
- Email Notifications
- OTP Verification
- Push Notifications
- Driver Assignment Optimization
- Admin Analytics Dashboard
- Mobile Application
- Live Payment Gateway Integration



## 📸 Screenshots

- Home Page
- User Registration
- User Login
- Driver Registration
- Driver Login
- Book Cab
- Booking History
- Driver Dashboard
- Payment Page
- Google Maps
- Admin Dashboard


## 👩‍💻 Author

**POLURU MAHITHA CHOUDARY**

**Bachelor of Technology (B.Tech)**

**3rd Year**

**Computer Science and Engineering (CSE)**

**Project:** UCAB – Online Cab Booking System

**Project Duration**: 25 June 2026 – 11 July 2026

## 📄 License

This project was developed for academic and internship purposes.
