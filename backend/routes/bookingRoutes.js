const express = require("express");

const router = express.Router();

const {
  createBooking,
  getBookings,
  getPendingBookings,
  getAcceptedBookings,
  getCompletedBookings,
  getBookingById,
  updateBooking,
  payForBooking,
  deleteBooking,
} = require("../controllers/bookingController");

// ===================================
// Create Booking
// ===================================
router.post("/", createBooking);

// ===================================
// Get All Bookings
// ===================================
router.get("/", getBookings);

// ===================================
// Get Pending Bookings
// ===================================
router.get("/pending", getPendingBookings);

// ===================================
// Get Accepted Bookings
// ===================================
router.get("/accepted", getAcceptedBookings);

// ===================================
// Get Completed Bookings
// ===================================
router.get("/completed", getCompletedBookings);

// ===================================
// Get Booking By ID
// ===================================
router.get("/:id", getBookingById);

// ===================================
// Update Booking Status
// ===================================
router.put("/:id", updateBooking);

// ===================================
// Payment API
// ===================================
router.put("/:id/pay", payForBooking);

// ===================================
// Delete Booking
// ===================================
router.delete("/:id", deleteBooking);

module.exports = router;






