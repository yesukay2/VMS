import "../App.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { BsPersonLock } from "react-icons/bs";
// import jwt_decode from "jwt-decode";

// var role = "";
// const token = localStorage.getItem("token");
// try {
//   const decoded = jwt_decode(token);
//   role = decoded.role;
// } catch (error) {
//   console.log(error);
// }
export default function Header() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mt-0  fixed-top">
      <div className="container-fluid">
        <a href="#" className="navbar-brand">
          <img src={logo} height="100" alt="CoolBrand" />
        </a>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav d-flex justify-content-between w-100">
            <div className="navbar-nav">
              <a
                href="/vehicles"
                className={`nav-item nav-link vehiclesTab ${
                  window.location.pathname == "/vehicles" ? "active" : ""
                }`}
                style={{ cursor: "pointer" }}
              >
                Vehicles
              </a>
              <a
                href="/exeat-log"
                className={`nav-item nav-link exeatsTab ${
                  window.location.pathname == "/exeat-log" ? "active" : ""
                }`}
                style={{ cursor: "pointer" }}
              >
                Exeats
              </a>
            </div>
            <div className="navbar-nav">
              <a
                onClick={logout}
                className="nav-item nav-link"
                style={{ cursor: "pointer" }}
              >
                <BsPersonLock size={30} className="card p-1" />
              </a>
            </div>
          </div>
        </div>
        {/* <div className="navbar-nav ms-auto department-badge"> */}
        {/* <p className="nav-item text-dark">{role}</p> */}
        {/* <p className="nav-item text-dark">Badge</p> */}
        {/* </div> */}
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
}

// export default Header;
