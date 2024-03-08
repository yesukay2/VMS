import React from "react";
import PropTypes from "prop-types";
import "../App.css";

export default function Exeat({ name, avatar, time }) {
  return (
    <div>
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
      <hr className="w-100" style={{ color: "var(--orange)" }}></hr>
    </div>
  );
}

Exeat.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};
