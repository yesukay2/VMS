import React from "react";

export default function ErrorPage() {
  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <h2 className="mb-3">Sorry....an error occured!</h2>
      <button className="btn btn-primary">Go back Home</button>
    </div>
  );
}
