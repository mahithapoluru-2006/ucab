const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

dotenv.config();

// ===============================
// Connect MongoDB
// ===============================
connectDB();

const app = express();

// ===============================
// Create HTTP Server
// ===============================
const server = http.createServer(app);

// ===============================
// Socket.IO Configuration
// ===============================
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// ===============================
// Socket Events
// ===============================
io.on("connection", (socket) => {
  console.log("=================================");
  console.log("🟢 User Connected:", socket.id);
  console.log("=================================");

  // ===============================
  // TEST EVENT
  // ===============================
  socket.on("testEvent", (data) => {
    console.log("=================================");
    console.log("🧪 TEST EVENT RECEIVED");
    console.log(data);
    console.log("=================================");
  });

  // ===============================
  // DRIVER LOCATION
  // ===============================
  socket.on("driverLocation", (data) => {
    console.log("=================================");
    console.log("📍 DRIVER LOCATION RECEIVED");
    console.log(data);
    console.log("=================================");

    io.emit("liveLocation", data);
  });

  // ===============================
  // RIDE STATUS
  // ===============================
  socket.on("rideStatus", (data) => {
    console.log("=================================");
    console.log("🚖 RIDE STATUS RECEIVED");
    console.log(data);
    console.log("=================================");

    io.emit("rideStatusUpdate", data);
  });

  // ===============================
  // Disconnect
  // ===============================
  socket.on("disconnect", () => {
    console.log("=================================");
    console.log("🔴 User Disconnected:", socket.id);
    console.log("=================================");
  });
});

// ===============================
// Middleware
// ===============================
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ===============================
// Routes
// ===============================
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const driverRoutes = require("./routes/driverRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/admin", adminRoutes);

// ===============================
// Default Route
// ===============================
app.get("/", (req, res) => {
  res.send("🚖 UCAB Backend with Socket.IO Running...");
});

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("=================================");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("=================================");
});







