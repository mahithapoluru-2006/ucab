import { useEffect, useState } from "react";
import API from "../services/api";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchCompletedBookings();
  }, []);

  const fetchCompletedBookings = async () => {
    try {
      const res = await API.get("/bookings/completed");
      setBookings(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch booking history");
    }
  };

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">
        📜 Booking History
      </h2>

      <div className="card shadow p-4">

        <table className="table table-bordered table-hover">

          <thead className="table-dark">
            <tr>
              <th>Passenger</th>
              <th>Pickup</th>
              <th>Destination</th>
              <th>Cab Type</th>
              <th>Fare</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {bookings.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No Completed Bookings Found
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
                    <span className="badge bg-success">
                      {booking.status}
                    </span>
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

export default BookingHistory;

