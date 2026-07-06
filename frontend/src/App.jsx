import "./services/socket";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// User Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import BookingHistory from "./pages/BookingHistory";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";

// Admin Pages
import Admin from "./pages/Admin";
import Users from "./pages/Users";
import Drivers from "./pages/Drivers";
import ManageBookings from "./pages/ManageBookings";

// Driver Pages
import DriverRegister from "./pages/DriverRegister";
import DriverLogin from "./pages/DriverLogin";
import DriverDashboard from "./pages/DriverDashboard";
import AcceptedRides from "./pages/AcceptedRides";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/booking-history" element={<BookingHistory />} />

        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />

        <Route path="/driver-register" element={<DriverRegister />} />
        <Route path="/driver-login" element={<DriverLogin />} />
        <Route path="/driver-dashboard" element={<DriverDashboard />} />
        <Route path="/accepted-rides" element={<AcceptedRides />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/users" element={<Users />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/manage-bookings" element={<ManageBookings />} />

      </Routes>

      <Footer />
    </>
  );
}

export default App;















