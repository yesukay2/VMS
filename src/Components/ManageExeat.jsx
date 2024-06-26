import PropTypes from "prop-types";
import { useState } from "react";
import "../App.css";

export default function ManageExeat({
  id,
  vehicle_no,
  driver_name,
  accomp_staff_name,
  time_logged,
  destination,
  purpose,
  profilePic,
  updateStatus,
}) {
  const [approvedTime, setApprovedTime] = useState("");
  const [rejectedTime, setRejectedTime] = useState("");

  const approvalTime = () => {
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    minute = minute < 10 ? "0" + minute : minute;
    var strTime = hour + ":" + minute + " " + ampm;
    setApprovedTime(strTime);
    updateStatus(id, "Approved");
    return approvedTime;
  };

  const rejectTime = () => {
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    minute = minute < 10 ? "0" + minute : minute;
    var strTime = hour + ":" + minute + " " + ampm;
    setRejectedTime(strTime);
    updateStatus(id, "Declined");
    return rejectedTime;
  };
  const resolve = () => {
    if (approvedTime.length > 0 || rejectedTime.length > 0) {
      const exeat = document.getElementById(id);
      exeat.style.display = "none";
    }
  };

  return (
    <li
      id={id}
      className="p-3"
      style={{
        border: "1px solid var(--orange)",
        borderRadius: "5px",
        marginBottom: "1rem",
        width: "100%",
      }}
    >
      <div className="d-flex flex-row align-items-center justify-content-between manager-dash">
        <div className="d-flex flex-row align-items-center exeat">
          <div className="">
            <img
              src={profilePic}
              alt="Profile Picture"
              className=" profile-picture img-fluid rounded-circle"
            />
          </div>
          <div>
            <h5 className="mb-0 exeat-info">
              <span
                style={{
                  fontWeight: "lighter",
                  color: "var(--orange)",
                  marginRight: "0.5rem",
                  fontSize: "0.8rem",
                }}
              >
                Driver:
              </span>
              <span style={{ fontWeight: "bold" }}>{driver_name}</span>
            </h5>
            <p className="mb-0 exeat-info">
              <span
                style={{
                  fontWeight: "lighter",
                  color: "var(--green)",
                  marginRight: "0.5rem",
                  fontSize: "0.8rem",
                }}
              >
                Accomp. Staff:
              </span>
              {accomp_staff_name}
            </p>
            <p className="mb-0 exeat-info">
              <span
                style={{
                  fontWeight: "lighter",
                  color: "var(--orange)",
                  marginRight: "0.5rem",
                  fontSize: "0.8rem",
                }}
              >
                Vehicle No:
              </span>
              {vehicle_no}
            </p>
            <p className="mb-0 exeat-info">
              <span
                style={{
                  fontWeight: "lighter",
                  color: "var(--green)",
                  marginRight: "0.5rem",
                  fontSize: "0.8rem",
                }}
              >
                Time Logged:
              </span>
              {time_logged.substring(0, 3) +
                ", " +
                time_logged.substring(4, 10) +
                " " +
                time_logged.substring(11, 25)}
            </p>
            <p className="mb-0 exeat-info">
              <span
                style={{
                  fontWeight: "lighter",
                  color: "var(--orange)",
                  marginRight: "0.5rem",
                  fontSize: "0.8rem",
                }}
              >
                Destination:
              </span>
              {destination}
            </p>
            <p className="mb-0 exeat-info">
              <span
                style={{
                  fontWeight: "lighter",
                  color: "var(--green)",
                  marginRight: "0.5rem",
                  fontSize: "0.8rem",
                }}
              >
                Purpose:
              </span>
              {purpose}
            </p>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-between">
          <button
            className="btn timeIn-btn mb-3"
            onClick={() => approvalTime()}
            disabled={approvedTime.length > 0 || rejectedTime.length > 0}
            value={approvedTime}
          >
            {approvedTime === "" ? "Approve" : approvedTime}
          </button>

          <button
            className="btn timeOut-btn"
            onClick={() => rejectTime()}
            disabled={rejectedTime.length > 0}
            value={rejectedTime}
          >
            {rejectedTime === "" ? "Reject" : rejectedTime}
          </button>
          <button
            className="btn mt-5 resolve-btn resolve-btn-2"
            onClick={() => resolve()}
          >
            Resolve
          </button>
        </div>
        <div className="d-flex flex-column justify-content-between">
          <button
            className="btn resolve-btn resolve-btn-1"
            onClick={() => resolve()}
          >
            Resolve
          </button>
        </div>
      </div>
    </li>
    // <hr className="w-100" style={{ color: "black" }}></hr>
  );
}

ManageExeat.propTypes = {
  id: PropTypes.string.isRequired,
  driver_name: PropTypes.string.isRequired,
  profilePic: PropTypes.string,
  time_logged: PropTypes.string.isRequired,
  accomp_staff_name: PropTypes.string.isRequired,
  vehicle_no: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  purpose: PropTypes.string.isRequired,
  updateStatus: PropTypes.func.isRequired,
};
