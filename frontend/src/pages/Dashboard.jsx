import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully!");

    navigate("/login");
  };

  return (
    <div className="container mt-5">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h2>User Dashboard</h2>
        </div>

        <div className="card-body">

          <h3>Welcome, {user?.name} 👋</h3>

          <p className="mt-3">
            You have successfully logged into the UCAB Online Cab Booking System.
          </p>

          <div className="row mt-4">

            <div className="col-md-4 mb-3">
              <div className="card border-primary h-100">
                <div className="card-body text-center">
                  <h4>🚖</h4>
                  <h5>Book a Cab</h5>
                  <p>Create a new cab booking.</p>

                  <Link to="/booking" className="btn btn-primary">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card border-success h-100">
                <div className="card-body text-center">
                  <h4>📋</h4>
                  <h5>My Bookings</h5>
                  <p>View your previous bookings.</p>

                  <Link to="/my-bookings" className="btn btn-success">
                    View Bookings
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card border-danger h-100">
                <div className="card-body text-center">
                  <h4>🚪</h4>
                  <h5>Logout</h5>
                  <p>Sign out from your account.</p>

                  <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;