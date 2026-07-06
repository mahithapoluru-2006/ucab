import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mt-5">
      <div className="text-center">

        <h1 className="display-4 fw-bold text-primary">
          🚖 Welcome to UCAB
        </h1>

        <p className="lead mt-3">
          Your trusted online cab booking platform.
        </p>

        <img
          src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=900"
          alt="Cab"
          className="img-fluid rounded shadow mt-4"
          style={{ maxHeight: "400px" }}
        />

        <div className="mt-5">
          <Link to="/register" className="btn btn-success btn-lg me-3">
            Register
          </Link>

          <Link to="/login" className="btn btn-primary btn-lg">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Home;