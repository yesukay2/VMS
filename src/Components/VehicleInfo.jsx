import React from "react";
import "../App.css";
import PropTypes from "prop-types";

export default function VehicleInfo({
  vehicleNumber,
  status,
  vehicle_type,
  parking_lot,
}) {
  return (
    <div>
      <div
        className="d-flex flex-row align-items-center justify-content-between"
        style={{ width: "100%" }}
      >
        <p style={{ width: "25%" }} className="vehicle-info">
          {vehicleNumber}
        </p>
        {status == "Available" ? (
          <div style={{ width: "25%" }}>
            <div
              style={{ width: "fit-content" }}
              className="vehicle-status-available"
            >
              {status}
            </div>
          </div>
        ) : (
          <div style={{ width: "25%" }}>
            <div
              style={{ width: "fit-content" }}
              className="vehicle-status-unavailable"
            >
              {status}
            </div>
          </div>
        )}
        <p style={{ width: "25%" }} className="vehicle-info">
          {vehicle_type}
        </p>
        <p style={{ width: "25%" }} className="vehicle-info">
          {parking_lot}
        </p>
      </div>
      <hr
        className="w-100"
        style={{ color: "var(--orange)", marginTop: "0.5rem" }}
      ></hr>
    </div>
  );
}

VehicleInfo.propTypes = {
  vehicleNumber: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  vehicle_type: PropTypes.string.isRequired,
  parking_lot: PropTypes.string.isRequired,
};
