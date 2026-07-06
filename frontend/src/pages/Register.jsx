import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", formData);

      alert(res.data.message);

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow">

            <div className="card-header bg-success text-white text-center">
              <h3>Create Account</h3>
            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label>Full Name</label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Phone Number</label>

                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Enter Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Register
                </button>

              </form>

              <div className="text-center mt-3">

                Already have an account?

                <Link to="/login">
                  {" "}Login
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Register;