import { useState } from "react";
import API from "../services/api";

function DriverRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    vehicleNumber: "",
    cabType: "Mini",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("========== DRIVER REGISTER ==========");
    console.log("Sending Data:", formData);

    try {
      const res = await API.post("/drivers/register", formData);

      console.log("SUCCESS");
      console.log(res.data);

      alert(res.data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        vehicleNumber: "",
        cabType: "Mini",
      });

      window.location.href = "/driver-login";
    } catch (error) {
      console.log("========== DRIVER REGISTER ERROR ==========");

      if (error.response) {
        console.log("Status Code:", error.response.status);
        console.log("Response Data:", error.response.data);

        alert(error.response.data.message);
      } else if (error.request) {
        console.log("No Response From Server");
        alert("Cannot connect to backend server.");
      } else {
        console.log("Unexpected Error:", error.message);
        alert(error.message);
      }

      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <h2 className="text-center mb-4">
          🚖 Driver Registration
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Vehicle Number</label>
            <input
              type="text"
              className="form-control"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              placeholder="Enter Vehicle Number"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Cab Type</label>

            <select
              className="form-select"
              name="cabType"
              value={formData.cabType}
              onChange={handleChange}
            >
              <option value="Mini">Mini</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
          >
            Register Driver
          </button>

        </form>
      </div>
    </div>
  );
}

export default DriverRegister;
