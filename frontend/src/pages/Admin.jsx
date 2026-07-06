import { useEffect, useState } from "react";
import API from "../services/api";

function Admin() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDrivers: 0,
    totalBookings: 0,
    pendingBookings: 0,
    acceptedBookings: 0,
    completedBookings: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await API.get("/admin/dashboard");
      setStats(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard");
    }
  };

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-5">
        🚖 UCAB Admin Dashboard
      </h2>

      <div className="row">

        <div className="col-md-4 mb-4">
          <div className="card text-center shadow border-primary">
            <div className="card-body">
              <h5>Total Users</h5>
              <h2>{stats.totalUsers}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card text-center shadow border-success">
            <div className="card-body">
              <h5>Total Drivers</h5>
              <h2>{stats.totalDrivers}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card text-center shadow border-warning">
            <div className="card-body">
              <h5>Total Bookings</h5>
              <h2>{stats.totalBookings}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card text-center shadow border-danger">
            <div className="card-body">
              <h5>Pending Rides</h5>
              <h2>{stats.pendingBookings}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card text-center shadow border-info">
            <div className="card-body">
              <h5>Accepted Rides</h5>
              <h2>{stats.acceptedBookings}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card text-center shadow border-success">
            <div className="card-body">
              <h5>Completed Rides</h5>
              <h2>{stats.completedBookings}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="card text-center shadow bg-dark text-white">
            <div className="card-body">
              <h4>Total Revenue</h4>
              <h1>₹{stats.totalRevenue}</h1>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Admin;

