import { useEffect, useState } from "react";
import API from "../services/api";
import socket from "../services/socket";

function DriverDashboard() {
  const [bookings, setBookings] = useState([]);

  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    fetchPendingBookings();
    startLocationTracking();
  }, []);

  // ===============================
  // Fetch Pending Bookings
  // ===============================
  const fetchPendingBookings = async () => {
    try {
      const res = await API.get("/bookings/pending");
      setBookings(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load bookings");
    }
  };

  // ===============================
  // Accept Ride
  // ===============================
  const acceptRide = async (bookingId) => {
    try {
      // Update booking status
      await API.put(`/bookings/${bookingId}`, {
        status: "Accepted",
      });

      // Get logged-in driver
      const driver = JSON.parse(localStorage.getItem("driver"));

      // Update driver status
      await API.put(`/drivers/${driver._id}/status`, {
        status: "Busy",
      });

      // Notify all users
      socket.emit("rideStatus", {
        bookingId,
        status: "Accepted",
      });

      alert("Ride Accepted Successfully");

      fetchPendingBookings();
    } catch (error) {
      console.error(error);
      alert("Failed to accept ride");
    }
  };

  // ===============================
  // Live Location
  // ===============================
  const startLocationTracking = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.watchPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation({
          latitude,
          longitude,
        });

        socket.emit("driverLocation", {
          latitude,
          longitude,
          time: new Date().toLocaleTimeString(),
        });
      },
      (err) => console.log(err),
      {
        enableHighAccuracy: true,
      }
    );
  };

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">
        🚖 Driver Dashboard
      </h2>

      <div className="alert alert-success">

        <h5>📍 Live Driver Location</h5>

        <p>
          Latitude : {location.latitude}
        </p>

        <p>
          Longitude : {location.longitude}
        </p>

      </div>

      <div className="card shadow p-4">

        <h4 className="mb-3">
          Pending Ride Requests
        </h4>

        <table className="table table-bordered">

          <thead className="table-dark">
            <tr>
              <th>Passenger</th>
              <th>Pickup</th>
              <th>Destination</th>
              <th>Cab</th>
              <th>Fare</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {bookings.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No Pending Bookings
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking._id}>

                  <td>{booking.user?.name}</td>

                  <td>{booking.pickup}</td>

                  <td>{booking.destination}</td>

                  <td>{booking.cabType}</td>

                  <td>₹{booking.fare}</td>

                  <td>
                    <span className="badge bg-warning text-dark">
                      {booking.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => acceptRide(booking._id)}
                    >
                      Accept Ride
                    </button>
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DriverDashboard;








