import { io } from "socket.io-client";

const socket = io(
  "https://musical-trout-7vgp754xxpxq2x6jv-5000.app.github.dev",
  {
    transports: ["polling"],
    upgrade: false,
  }
);

socket.on("connect", () => {
  console.log("🟢 Connected:", socket.id);

  // Test event
  socket.emit("testEvent", {
    message: "Hello from React",
    time: new Date().toLocaleTimeString(),
  });
});

socket.on("disconnect", () => {
  console.log("🔴 Disconnected");
});

socket.on("connect_error", (err) => {
  console.log("❌ Socket Error:", err.message);
});

export default socket;




