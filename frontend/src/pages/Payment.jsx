import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../services/api";

function Payment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const bookingId = searchParams.get("id");

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!bookingId) {
      alert("Booking ID not found");
      return;
    }

    try {
      setLoading(true);

      const res = await API.put(`/bookings/${bookingId}/pay`, {
        paymentMethod,
      });

      alert(res.data.message);

      navigate(`/payment-success?id=${bookingId}`);

    } catch (error) {
      alert(error.response?.data?.message || "Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">

      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <h2 className="text-center mb-4">
          💳 Payment
        </h2>

        <div className="mb-3">
          <label className="form-label">
            Select Payment Method
          </label>

          <select
            className="form-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="UPI">UPI</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Cash">Cash</option>
          </select>
        </div>

        <button
          className="btn btn-success w-100"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

      </div>

    </div>
  );
}

export default Payment;



