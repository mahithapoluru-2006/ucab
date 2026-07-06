import { useEffect, useState } from "react";
import API from "../services/api";

function Drivers() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const res = await API.get("/drivers");
      setDrivers(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch drivers");
    }
  };

  const deleteDriver = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this driver?"
    );

    if (!confirmDelete) return;

    try {
      const res = await API.delete(`/drivers/${id}`);

      alert(res.data.message);

      fetchDrivers();
    } catch (error) {
      console.log(error);
      alert("Failed to delete driver");
    }
  };

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">
        🚖 Driver Management
      </h2>

      <div className="card shadow p-4">

        <table className="table table-bordered table-hover">

          <thead className="table-dark">

            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Vehicle No.</th>
              <th>Cab Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {drivers.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No Drivers Found
                </td>
              </tr>
            ) : (
              drivers.map((driver) => (
                <tr key={driver._id}>

                  <td>{driver.name}</td>

                  <td>{driver.email}</td>

                  <td>{driver.phone}</td>

                  <td>{driver.vehicleNumber}</td>

                  <td>{driver.cabType}</td>

                  <td>
                    <span
                      className={
                        driver.status === "Available"
                          ? "badge bg-success"
                          : "badge bg-warning text-dark"
                      }
                    >
                      {driver.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteDriver(driver._id)}
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

export default Drivers;

