import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container">

        <Link className="navbar-brand" to="/">
          🚖 UCAB
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/booking">Book Cab</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/my-bookings">My Bookings</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/driver-register">
                Driver Register
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/driver-login">
                Driver Login
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/driver-dashboard">
                Driver Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/accepted-rides">
                Accepted Rides
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                Admin Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/users">
                Manage Users
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/drivers">
                Manage Drivers
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/manage-bookings">
                Manage Bookings
              </Link>
            </li>

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;








