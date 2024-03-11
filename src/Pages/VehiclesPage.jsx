import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import VehicleInfo from "../Components/VehicleInfo";
import vehicles from "../vehiclesData";

export default function VehiclesPage() {
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
          <button type="button" href="/" className="btn submit-btn-orange">
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
            <h4 style={{ width: "25%" }}>Vehicle</h4>
            <h4 style={{ width: "25%" }}>Status</h4>
            <h4 style={{ width: "25%" }}>Driver</h4>
            <h4 style={{ width: "25%" }}>Parking Lot</h4>
          </div>
          <hr className="w-100" style={{ color: "var(--orange)" }}></hr>
          {vehicles.map((vehicle) => (
            <VehicleInfo
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
