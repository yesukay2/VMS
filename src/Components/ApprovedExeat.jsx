import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "../App.css";

export default function ApprovedExeat({ name, avatar, time, id }) {
  const [timeOut, setTimeOut] = useState("");
  const [timeIn, setTimeIn] = useState("");

  const recordTimeOut = () => {
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    minute = minute < 10 ? "0" + minute : minute;
    var strTime = hour + ":" + minute + " " + ampm;
    setTimeOut(strTime);
    document.getElementById("timeOut-btn").disabled = true;
    return timeOut;
  };

  const recordTimeIn = () => {
    if (timeOut.length > 0) {
      var date = new Date();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var ampm = hour >= 12 ? "PM" : "AM";
      hour = hour % 12;
      hour = hour ? hour : 12; // the hour '0' should be '12'
      minute = minute < 10 ? "0" + minute : minute;
      var strTime = hour + ":" + minute + " " + ampm;
      setTimeIn(strTime);
      return timeIn;
    }
    return timeIn;
  };

  const resolve = () => {
    if (timeOut.length > 0 && timeIn.length > 0) {
      const exeat = document.getElementById(id);
      exeat.style.display = "none";
    }
  };
  return (
    <div id={id}>
      <div className="d-flex flex-row align-items-center justify-content-between">
        <div className="d-flex flex-row align-items-center exeat">
          <div className="">
            <img
              src={avatar}
              alt="Profile Picture"
              className=" profile-picture img-fluid rounded-circle"
            />
          </div>
          <div>
            <h5>{name}</h5>
            <p className="mb-0">{time}</p>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-between">
          <div className="d-flex flex-row align-items-start gap-2">
            <p className="w-7">Time Out:</p>
            <button
              className="btn timeOut-btn mb-3"
              onClick={() => recordTimeOut()}
              disabled={timeOut.length > 0}
            >
              {timeOut === "" ? "Record Time Out" : timeOut}
            </button>
          </div>
          <div className="d-flex flex-row align-items-start gap-2">
            <p>Time In:</p>
            <button
              className="btn timeIn-btn"
              onClick={() => recordTimeIn()}
              disabled={timeIn.length > 0}
            >
              {timeIn === "" ? "Record Time In" : timeIn}
            </button>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-between">
          {/* TODO: Add button to resolve request and remove from list */}
          <button className="btn resolve-btn" onClick={() => resolve()}>
            Resolve
          </button>
        </div>
      </div>
      <hr className="w-100" style={{ color: "var(--orange)" }}></hr>
    </div>
  );
}

ApprovedExeat.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};
