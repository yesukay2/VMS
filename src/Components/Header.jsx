import "../App.css";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mt-0  fixed-top">
      <div className="container-fluid">
        <a href="#" className="navbar-brand">
          <img src={logo} height="100" alt="CoolBrand" />
        </a>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav">
            <a
              href="/vehicles"
              className={`nav-item nav-link vehiclesTab ${
                window.location.pathname == "/vehicles" ? "active" : ""
              }`}
            >
              Vehicles
            </a>
            <a
              href="/exeat-log"
              className={`nav-item nav-link exeatsTab ${
                window.location.pathname == "/exeat-log" ? "active" : ""
              }`}
            >
              Exeats
            </a>
            <a href="/" className="nav-item nav-link">
              Logout
            </a>
          </div>
        </div>
        <div className="navbar-nav ms-auto department-badge">
          <p className="nav-item text-dark">Reception</p>
        </div>
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
