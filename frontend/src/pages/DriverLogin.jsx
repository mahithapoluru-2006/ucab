import { useState } from "react";
import API from "../services/api";

function DriverLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting Login:", formData);

    try {
      const res = await API.post("/drivers/login", formData);

      console.log("Response:", res.data);

      localStorage.setItem("driverToken", res.data.token);
      localStorage.setItem("driver", JSON.stringify(res.data.driver));

      alert("Driver Login Successful");

      window.location.href = "/driver-dashboard";
    } catch (error) {
      console.log("========== LOGIN ERROR ==========");
      console.log(error);

      if (error.response) {
        console.log("Status Code:", error.response.status);
        console.log("Response Data:", error.response.data);

        alert(error.response.data.message);
      } else if (error.request) {
        console.log("No response received from server");
        alert("Cannot connect to backend server.");
      } else {
        console.log("Unexpected Error:", error.message);
        alert(error.message);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <h2 className="text-center mb-4">🚖 Driver Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>

            <input
              type="email"
              name="email"
              className="form-control"
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
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default DriverLogin;



