const Booking = require("../models/Booking");

// ===============================
// Create Booking
// ===============================
exports.createBooking = async (req, res) => {
  try {
    const { user, pickup, destination, cabType, fare } = req.body;

    const booking = await Booking.create({
      user,
      pickup,
      destination,
      cabType,
      fare,
    });

    res.status(201).json({
      message: "Booking Created Successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Get All Bookings
// ===============================
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Get Pending Bookings
// ===============================
exports.getPendingBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      status: "Pending",
    }).populate("user");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Get Accepted Bookings
// ===============================
exports.getAcceptedBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      status: "Accepted",
    }).populate("user");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Get Completed Bookings
// ===============================
exports.getCompletedBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      status: "Completed",
    }).populate("user");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Get Booking By ID
// ===============================
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("user");

    if (!booking) {
      return res.status(404).json({
        message: "Booking Not Found",
      });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Update Booking Status
// ===============================
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking Not Found",
      });
    }

    booking.status = req.body.status || booking.status;

    await booking.save();

    res.json({
      message: "Booking Updated Successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Pay For Booking
// ===============================
exports.payForBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking Not Found",
      });
    }

    booking.paymentStatus = "Paid";
    booking.paymentMethod = req.body.paymentMethod || "Cash";

    await booking.save();

    res.json({
      message: "Payment Successful",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Delete Booking
// ===============================
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking Not Found",
      });
    }

    await booking.deleteOne();

    res.json({
      message: "Booking Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};





