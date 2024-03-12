// import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import AdminVehicleInfo from "../Components/AdminVehicleInfo.jsx";
import vehicles from "../vehiclesData";

export default function AdminVehiclesPage() {
  return (
    <div className=" container body-wrapper vehicles-table">
      <h4 className="page-title mb-4">Vehicles</h4>
      <div className="d-flex flex-row align-items-center justify-content-between mb-4">
        <div className="d-flex flex-row align-items-center">
          <div className="vehicle-status-menu">All</div>
          <div className="vehicle-status-menu">In Transit</div>
          <div className="vehicle-status-menu">Available</div>
        </div>
        <Link to="/register-vehicle">
          <button type="button" href="/" className="btn submit-btn-green">
            Add Vehicle
          </button>
        </Link>
      </div>
      <div>
        <div className="table body-wrapper">
          <div
            className="d-flex flex-row align-items-center justify-content-between"
            style={{ width: "100%" }}
          >
            <h4 style={{ width: "20%" }}>Vehicle</h4>
            <h4 style={{ width: "20%" }}>Status</h4>
            <h4 style={{ width: "20%" }}>Driver</h4>
            <h4 style={{ width: "20%" }}>Parking Lot</h4>
            <h4 style={{ width: "20%" }}>Actions</h4>
          </div>
          <hr className="w-100" style={{ color: "var(--orange)" }}></hr>
          {vehicles.map((vehicle) => (
            <AdminVehicleInfo
              key={vehicle.vehicleNumber}
              vehicleNumber={vehicle.vehicleNumber}
              status={vehicle.status}
              driverName={vehicle.driverName}
              parkingLot={vehicle.parkingLot}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
