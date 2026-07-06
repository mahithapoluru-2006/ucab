import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";

function PaymentSuccess() {
  const [booking, setBooking] = useState(null);

  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("id");

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      const res = await API.get(`/bookings/${bookingId}`);
      setBooking(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const printReceipt = () => {
    window.print();
  };

  if (!booking) {
    return (
      <div className="container mt-5">
        <h3 className="text-center">Loading Receipt...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2 className="text-center text-success">
          ✅ Payment Successful
        </h2>

        <hr />

        <table className="table table-bordered">

          <tbody>

            <tr>
              <th>Receipt ID</th>
              <td>{booking._id}</td>
            </tr>

            <tr>
              <th>Passenger</th>
              <td>{booking.user?.name}</td>
            </tr>

            <tr>
              <th>Pickup</th>
              <td>{booking.pickup}</td>
            </tr>

            <tr>
              <th>Destination</th>
              <td>{booking.destination}</td>
            </tr>

            <tr>
              <th>Cab Type</th>
              <td>{booking.cabType}</td>
            </tr>

            <tr>
              <th>Fare</th>
              <td>₹{booking.fare}</td>
            </tr>

            <tr>
              <th>Payment Method</th>
              <td>{booking.paymentMethod}</td>
            </tr>

            <tr>
              <th>Payment Status</th>
              <td>
                <span className="badge bg-success">
                  {booking.paymentStatus}
                </span>
              </td>
            </tr>

            <tr>
              <th>Ride Status</th>
              <td>{booking.status}</td>
            </tr>

            <tr>
              <th>Date</th>
              <td>
                {new Date(booking.updatedAt).toLocaleString()}
              </td>
            </tr>

          </tbody>

        </table>

        <button
          className="btn btn-primary mt-3"
          onClick={printReceipt}
        >
          🖨 Print Receipt
        </button>

      </div>

    </div>
  );
}

export default PaymentSuccess;

