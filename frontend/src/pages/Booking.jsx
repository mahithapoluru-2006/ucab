import { useState } from "react";
import API from "../services/api";

function Booking() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [booking, setBooking] = useState({
    pickup: "",
    destination: "",
    cabType: "Mini",
    fare: "",
  });

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/bookings", {
        user: user._id,
        pickup: booking.pickup,
        destination: booking.destination,
        cabType: booking.cabType,
        fare: booking.fare,
      });

      alert(res.data.message);

      setBooking({
        pickup: "",
        destination: "",
        cabType: "Mini",
        fare: "",
      });

    } catch (error) {
      alert(error.response?.data?.message || "Booking Failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>🚖 Book Your Cab</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="pickup"
          placeholder="Pickup Location"
          value={booking.pickup}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={booking.destination}
          onChange={handleChange}
        />

        <br /><br />

        <select
          name="cabType"
          value={booking.cabType}
          onChange={handleChange}
        >
          <option>Mini</option>
          <option>Sedan</option>
          <option>SUV</option>
        </select>

        <br /><br />

        <input
          type="number"
          name="fare"
          placeholder="Fare"
          value={booking.fare}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Book Cab
        </button>
      </form>
    </div>
  );
}

export default Booking;