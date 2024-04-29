import React from "react";
import "../App.css";

export default function ErrorPage() {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center text-center error-content">
      <h2 className="mb-4">Oooppss...an unexpected error occured!</h2>
      <button
        type="link"
        onClick={() => (window.location.href = "/")}
        className="btn submit-btn-orange"
      >
        Go back Home
      </button>
    </div>
  );
}
