import logo from "/src/assets/logo.png";
import "../App.css";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src={logo}
            alt="Logo"
            width="60"
            height="60"
            className="d-inline-block align-text-center"
          />
          <h5 className="d-inline-block align-text-center">Samara Comp. Ltd</h5>
        </a>
      </div>
      <div>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav nav-tabs">
            <li className="nav-item">
              <a
                className={`nav-link vehiclesTab ${
                  window.location.pathname == "/vehicles" ? "active" : ""
                }`}
                aria-current="page"
                href="/vehicles"
              >
                Vehicles
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link exeatsTab ${
                  window.location.pathname == "/exeat-log" ? "active" : ""
                }`}
                href="/exeat-log"
              >
                Exeats
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* TODO: Display department based on user role */}
      <div className="department-badge">Reception</div>
    </nav>
  );
}
