const User = require("../models/User");
const Driver = require("../models/Driver");
const Booking = require("../models/Booking");

// ===============================
// Admin Dashboard Statistics
// ===============================
exports.getDashboardStats = async (req, res) => {
  try {
    // Total Users
    const totalUsers = await User.countDocuments();

    // Total Drivers
    const totalDrivers = await Driver.countDocuments();

    // Total Bookings
    const totalBookings = await Booking.countDocuments();

    // Pending Bookings
    const pendingBookings = await Booking.countDocuments({
      status: "Pending",
    });

    // Accepted Bookings
    const acceptedBookings = await Booking.countDocuments({
      status: "Accepted",
    });

    // Completed Bookings
    const completedBookings = await Booking.countDocuments({
      status: "Completed",
    });

    // Total Revenue
    const revenue = await Booking.aggregate([
      {
        $match: {
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$fare",
          },
        },
      },
    ]);

    res.json({
      totalUsers,
      totalDrivers,
      totalBookings,
      pendingBookings,
      acceptedBookings,
      completedBookings,
      totalRevenue:
        revenue.length > 0 ? revenue[0].totalRevenue : 0,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

