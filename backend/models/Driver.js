const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    vehicleNumber: {
      type: String,
      required: true,
    },

    cabType: {
      type: String,
      enum: ["Mini", "Sedan", "SUV"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Available", "Busy"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Driver", driverSchema);

