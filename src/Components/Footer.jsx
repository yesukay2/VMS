import React from "react";
import "../App.css";

export default function Footer() {
  return (
    <nav className="navbar fixed-bottom footer" id="footer">
      <div className="container-fluid">
        <div className="footer-text d-flex align-items-center justify-content-center flex-column">
          <p className="mb-0">© 2024 Samara Company Ltd</p>
          <p
            className="mb-0 mt-0"
            style={{ fontStyle: "italic", fontSize: "0.8rem" }}
          >
            All rights reserved
          </p>
        </div>
        <a className="navbar-brand" href="#">
          <img
            src="/src/assets/logo.png"
            alt="Logo"
            width="60"
            height="60"
            className="d-inline-block align-text-center"
          />
        </a>
      </div>
    </nav>
  );
}
