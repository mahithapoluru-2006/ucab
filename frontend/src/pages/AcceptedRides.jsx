import { useEffect, useState } from "react";
import API from "../services/api";
import socket from "../services/socket";

function AcceptedRides() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetchAcceptedRides();
  }, []);

  // ===============================
  // Fetch Accepted Rides
  // ===============================
  const fetchAcceptedRides = async () => {
    try {
      const res = await API.get("/bookings/accepted");
      setRides(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch accepted rides");
    }
  };

  // ===============================
  // Complete Ride
  // ===============================
  const completeRide = async (bookingId) => {
    try {
      // Update booking status
      await API.put(`/bookings/${bookingId}`, {
        status: "Completed",
      });

      // Get logged-in driver
      const driver = JSON.parse(localStorage.getItem("driver"));

      // Change driver status to Available
      await API.put(`/drivers/${driver._id}/status`, {
        status: "Available",
      });

      // Notify all connected users
      socket.emit("rideStatus", {
        bookingId,
        status: "Completed",
      });

      alert("Ride Completed Successfully");

      fetchAcceptedRides();
    } catch (error) {
      console.error(error);
      alert("Failed to complete ride");
    }
  };

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">
        🚖 Accepted Rides
      </h2>

      <div className="card shadow p-4">

        <table className="table table-bordered table-hover">

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

            {rides.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No Accepted Rides
                </td>
              </tr>
            ) : (
              rides.map((ride) => (
                <tr key={ride._id}>

                  <td>{ride.user?.name}</td>

                  <td>{ride.pickup}</td>

                  <td>{ride.destination}</td>

                  <td>{ride.cabType}</td>

                  <td>₹{ride.fare}</td>

                  <td>
                    <span className="badge bg-primary">
                      {ride.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => completeRide(ride._id)}
                    >
                      Complete Ride
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

export default AcceptedRides;





