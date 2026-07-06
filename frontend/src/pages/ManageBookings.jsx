import { useEffect, useState } from "react";
import API from "../services/api";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");
      setBookings(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch bookings");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await API.put(`/bookings/${id}`, {
        status,
      });

      alert(res.data.message);

      fetchBookings();
    } catch (error) {
      console.log(error);
      alert("Failed to update booking");
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) return;

    try {
      const res = await API.delete(`/bookings/${id}`);

      alert(res.data.message);

      fetchBookings();
    } catch (error) {
      console.log(error);
      alert("Failed to delete booking");
    }
  };

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">
        📖 Booking Management
      </h2>

      <div className="card shadow p-4">

        <table className="table table-bordered table-hover">

          <thead className="table-dark">

            <tr>
              <th>User</th>
              <th>Pickup</th>
              <th>Destination</th>
              <th>Cab</th>
              <th>Fare</th>
              <th>Status</th>
              <th>Payment</th>
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

                  <td>{booking.user?.name}</td>

                  <td>{booking.pickup}</td>

                  <td>{booking.destination}</td>

                  <td>{booking.cabType}</td>

                  <td>₹{booking.fare}</td>

                  <td>

                    <select
                      className="form-select"
                      value={booking.status}
                      onChange={(e) =>
                        updateStatus(
                          booking._id,
                          e.target.value
                        )
                      }
                    >
                      <option>Pending</option>
                      <option>Accepted</option>
                      <option>Completed</option>
                    </select>

                  </td>

                  <td>

                    <span
                      className={
                        booking.paymentStatus === "Paid"
                          ? "badge bg-success"
                          : "badge bg-danger"
                      }
                    >
                      {booking.paymentStatus || "Pending"}
                    </span>

                  </td>

                  <td>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        deleteBooking(booking._id)
                      }
                    >
                      Delete
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

export default ManageBookings;

