import "../App.css";
import PropTypes from "prop-types";

export default function AdminVehicleInfo({
  vehicleNumber,
  status,
  driverName,
  parkingLot,
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
          {driverName}
        </p>
        <p style={{ width: "25%" }} className="vehicle-info">
          {parkingLot}
        </p>
        <div style={{ width: "25%" }}>
          <div className="d-flex flex-row gap-2">
            <div style={{ width: "fit-content" }} className="edit-btn ">
              Edit
            </div>
            <div style={{ width: "fit-content" }} className="delete-btn">
              Delete
            </div>
          </div>
        </div>
      </div>
      <hr
        className="w-100"
        style={{ color: "var(--orange)", marginTop: "0.5rem" }}
      ></hr>
    </div>
  );
}

AdminVehicleInfo.propTypes = {
  vehicleNumber: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  driverName: PropTypes.string.isRequired,
  parkingLot: PropTypes.string.isRequired,
};
