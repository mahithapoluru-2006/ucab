const Driver = require("../models/Driver");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ===============================
// Register Driver
// ===============================
exports.registerDriver = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      vehicleNumber,
      cabType,
    } = req.body;

    const existingDriver = await Driver.findOne({ email });

    if (existingDriver) {
      return res.status(400).json({
        message: "Driver already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const driver = await Driver.create({
      name,
      email,
      password: hashedPassword,
      phone,
      vehicleNumber,
      cabType,
      status: "Available",
    });

    res.status(201).json({
      message: "Driver Registered Successfully",
      driver,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Driver Login
// ===============================
exports.loginDriver = async (req, res) => {
  try {
    const { email, password } = req.body;

    const driver = await Driver.findOne({ email });

    if (!driver) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    const isMatch = await bcrypt.compare(password, driver.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: driver._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Driver Login Successful",
      token,
      driver: {
        _id: driver._id,
        name: driver.name,
        email: driver.email,
        phone: driver.phone,
        vehicleNumber: driver.vehicleNumber,
        cabType: driver.cabType,
        status: driver.status,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Get All Drivers
// ===============================
exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().select("-password");

    res.json(drivers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Get Driver By ID
// ===============================
exports.getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id).select("-password");

    if (!driver) {
      return res.status(404).json({
        message: "Driver Not Found",
      });
    }

    res.json(driver);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Update Driver Status
// ===============================
exports.updateDriverStatus = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);

    if (!driver) {
      return res.status(404).json({
        message: "Driver Not Found",
      });
    }

    driver.status = req.body.status;

    await driver.save();

    res.json({
      message: "Driver Status Updated Successfully",
      driver,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};







