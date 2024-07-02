import PropTypes from "prop-types";
import "../App.css";
import { useState } from "react";
import axios from "axios";

export default function ApprovedExeat({
  id,
  vehicle_no,
  driver_name,
  accomp_staff_name,
  time_logged,
  destination,
  profilePic,
  recordTimeIn,
  recordTimeOut,
  timeInStatus,
  timeOutStatus,
  resolve,
}) {
  try {
    axios.get();
  } catch (error) {
    console.log(error);
  }

  const recordTimeInFunction = () => {
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12;
    minute = minute < 10 ? "0" + minute : minute;
    var strTime = hour + ":" + minute + " " + ampm;
    recordTimeIn(id, strTime);
    return strTime;
  };

  const recordTimeOutFunction = () => {
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12;
    minute = minute < 10 ? "0" + minute : minute;
    var strTime = hour + ":" + minute + " " + ampm;
    recordTimeOut(id, strTime);
    return strTime;
  };

  return (
    <div
      id={id}
      className="mt-3 p-3"
      style={{
        border: "1px solid var(--orange)",
        borderRadius: "5px",
        marginBottom: "1rem",
        width: "100%",
      }}
    >
      <div className="d-flex flex-row align-items-center justify-content-between">
        <div className="d-flex flex-row align-items-center exeat">
          <div className="">
            <img
              src={profilePic}
              alt="Profile Picture"
              className=" profile-picture img-fluid rounded-circle"
            />
          </div>
          <div>
            <p className="mb-0 exeat-info">
              <span
                style={{
                  fontWeight: "lighter",
                  color: "var(--green)",
                  marginRight: "0.5rem",
                  fontSize: "0.8rem",
                }}
              >
                Driver:{" "}
              </span>
              {driver_name}
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
                Accomp. Staff:{" "}
              </span>
              {accomp_staff_name}
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
                Vehicle No:{" "}
              </span>
              {vehicle_no}
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
                Destination:{" "}
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
                Time Logged:{" "}
              </span>
              {time_logged}
            </p>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-between">
          <div className="d-flex flex-row align-items-start gap-2">
            <p className="exeat-info d-inline-block w-30 ">Time Out:</p>
            <button
              className="btn timeOut-btn mb-3 w-70"
              onClick={() => recordTimeOutFunction()}
            >
              {timeOutStatus}
            </button>
          </div>
          <div className="d-flex flex-row align-items-start gap-2">
            <p className="exeat-info w-30"> Time In:</p>
            <button
              className="btn timeIn-btn w-70"
              onClick={() => recordTimeInFunction()}
            >
              {timeInStatus}
            </button>
          </div>
        </div>
        <div className="justify-content-between">
          <button
            className="btn resolve-btn"
            onClick={() => resolve(id, "Resolved")}
            disabled={timeInStatus == "00:00" || timeOutStatus == "00:00"}
          >
            Resolve
          </button>
        </div>
      </div>
    </div>
  );
}

ApprovedExeat.propTypes = {
  id: PropTypes.string.isRequired,
  driver_name: PropTypes.string.isRequired,
  vehicle_no: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired,
  time_logged: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  accomp_staff_name: PropTypes.string.isRequired,
  recordTimeIn: PropTypes.func,
  recordTimeOut: PropTypes.func,
  timeInStatus: PropTypes.string,
  timeOutStatus: PropTypes.string,
  resolve: PropTypes.func,
};
