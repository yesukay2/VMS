import "../App.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { BsPersonLock } from "react-icons/bs";
import { useEffect } from "react";

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbarCollapse = document.getElementById("navbarCollapse");
      const navbarToggler = document.querySelector(".navbar-toggler");
      if (
        navbarCollapse.classList.contains("show") &&
        !navbarCollapse.contains(event.target) &&
        !navbarToggler.contains(event.target)
      ) {
        navbarToggler.click();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light mt-0 fixed-top"
      style={{
        backgroundColor: "#f8f9fa",
        marginTop: 0,
        position: "fixed",
        top: 0,
        width: "100%",
      }}
    >
      <div className="container-fluid">
        <a href="#" className="navbar-brand">
          <img src={logo} height="100" alt="CoolBrand" />
        </a>

        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          style={{ marginLeft: "auto" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div
            className="navbar-nav d-flex justify-content-between w-100"
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div className="navbar-nav" style={{ display: "flex" }}>
              <a
                href="/vehicles"
                className={`nav-item nav-link vehiclesTab ${
                  window.location.pathname === "/vehicles" ? "active" : ""
                }`}
                style={{ cursor: "pointer" }}
              >
                Vehicles
              </a>

              <a
                href="/exeat-log"
                className={`nav-item nav-link exeatsTab ${
                  window.location.pathname === "/exeat-log" ? "active" : ""
                }`}
                style={{ cursor: "pointer" }}
              >
                Exeats
              </a>
            </div>

            <div className="navbar-nav" style={{ display: "flex" }}>
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
      </div>
    </nav>
  );
}
