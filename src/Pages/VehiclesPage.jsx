import React from "react";
import "../App.css";

export default function VehiclesPage() {
  return (
    <div className=" container body-wrapper vehicles-table">
      <h4 className="page-title mb-4">Vehicles</h4>
      <div className="d-flex flex-row align-items-center mb-4">
        <div className="vehicle-status-menu">All</div>
        <div className="vehicle-status-menu">In Transit</div>
        <div className="vehicle-status-menu">Available</div>
      </div>
      <div>
        <table className="table body-wrapper">
          <div className="table-header">
            <tc>Vehicle</tc>
            <tc>Status</tc>
            <tc>Driver</tc>
            <tc>Parking Premise</tc>
          </div>
          <hr className="w-100" style={{ color: "var(--orange)" }}></hr>
          <div className="table-content">
            <tc>Truck 1</tc>
            <tc>Truck 2</tc>
            <tc>Truck 3</tc>
            <tc>Truck 4</tc>
          </div>
        </table>
      </div>
    </div>
  );
}
