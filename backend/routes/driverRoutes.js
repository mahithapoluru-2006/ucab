const express = require("express");

const router = express.Router();

const {
  registerDriver,
  loginDriver,
  getAllDrivers,
  getDriverById,
  updateDriverStatus,
} = require("../controllers/driverController");

// ===============================
// Register Driver
// ===============================
router.post("/register", registerDriver);

// ===============================
// Driver Login
// ===============================
router.post("/login", loginDriver);

// ===============================
// Get All Drivers
// ===============================
router.get("/", getAllDrivers);

// ===============================
// Get Driver By ID
// ===============================
router.get("/:id", getDriverById);

// ===============================
// Update Driver Status
// ===============================
router.put("/:id/status", updateDriverStatus);

module.exports = router;




