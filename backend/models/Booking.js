const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    // Passenger
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Assigned Driver
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      default: null,
    },

    pickup: {
      type: String,
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    cabType: {
      type: String,
      enum: ["Mini", "Sedan", "SUV"],
      required: true,
    },

    fare: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },

    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Paid",
      ],
      default: "Pending",
    },

    paymentMethod: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);



