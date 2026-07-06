import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import socket from "../services/socket";
import LiveMap from "../components/LiveMap";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const [driverLocation, setDriverLocation] = useState({
    latitude: "",
    longitude: "",
    time: "",
  });

  useEffect(() => {
    fetchBookings();

    // Ride status updates
    socket.on("rideStatusUpdate", () => {
      fetchBookings();
    });

    // Live driver location
    socket.on("liveLocation", (data) => {
      console.log("📍 Driver Location:", data);

      setDriverLocation({
        latitude: data.latitude,
        longitude: data.longitude,
        time: data.time,
      });
    });

    return () => {
      socket.off("rideStatusUpdate");
      socket.off("liveLocation");
    };
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");
      setBookings(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch bookings");
    }
  };

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">
        🚖 My Bookings
      </h2>

      {/* Live Driver Location */}

      <div className="card shadow p-3 mb-4">

        <h4 className="text-primary">
          📍 Live Driver Location
        </h4>

        <p>
          <strong>Latitude :</strong>{" "}
          {driverLocation.latitude || "Waiting..."}
        </p>

        <p>
          <strong>Longitude :</strong>{" "}
          {driverLocation.longitude || "Waiting..."}
        </p>

        <p>
          <strong>Updated :</strong>{" "}
          {driverLocation.time || "-"}
        </p>

      </div>

      {/* Google Map */}

      <div className="card shadow p-3 mb-4">

        <h4 className="text-success">
          🗺 Driver Live Map
        </h4>

        <LiveMap
          latitude={driverLocation.latitude}
          longitude={driverLocation.longitude}
        />

      </div>

      {/* Booking Table */}

      <div className="card shadow p-4">

        <table className="table table-bordered table-hover">

          <thead className="table-dark">
            <tr>
              <th>Pickup</th>
              <th>Destination</th>
              <th>Cab</th>
              <th>Fare</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Method</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {bookings.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  No Bookings Found
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking._id}>

                  <td>{booking.pickup}</td>

                  <td>{booking.destination}</td>

                  <td>{booking.cabType}</td>

                  <td>₹{booking.fare}</td>

                  <td>

                    {booking.status === "Pending" && (
                      <span className="badge bg-warning text-dark">
                        Pending
                      </span>
                    )}

                    {booking.status === "Accepted" && (
                      <span className="badge bg-primary">
                        Accepted
                      </span>
                    )}

                    {booking.status === "Completed" && (
                      <span className="badge bg-success">
                        Completed
                      </span>
                    )}

                  </td>

                  <td>

                    {booking.paymentStatus === "Paid" ? (
                      <span className="badge bg-success">
                        Paid
                      </span>
                    ) : (
                      <span className="badge bg-danger">
                        Pending
                      </span>
                    )}

                  </td>

                  <td>
                    {booking.paymentMethod || "-"}
                  </td>

                  <td>

                    {booking.status === "Completed" &&
                    booking.paymentStatus !== "Paid" ? (

                      <Link
                        to={`/payment?id=${booking._id}`}
                        className="btn btn-success btn-sm"
                      >
                        Pay Now
                      </Link>

                    ) : booking.paymentStatus === "Paid" ? (

                      <span className="text-success fw-bold">
                        Paid ✅
                      </span>

                    ) : (
                      "-"
                    )}

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

export default MyBookings;





