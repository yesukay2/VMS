import React from "react";
import "../App.css";
import Proptypes from "prop-types";

const UserInfo = ({ fullName, idNumber, email, role, profilePic }) => {
  return (
    <div className="card p-2 text-center user-info">
      <img src={profilePic} alt="profilePic" className="profilePic" />
      <h5>{fullName}</h5>
      <hr className="mt-0" style={{ color: "var(--orange)" }} />
      <div style={{ textAlign: "left", fontSize: "0.8rem", marginTop: "0%" }}>
        <strong style={{ color: "var(--orange)", fontSize: "0.8rem" }}>
          ID Number:
        </strong>{" "}
        {idNumber}
      </div>
      <div style={{ textAlign: "left", fontSize: "0.8rem" }}>
        <strong style={{ color: "var(--green)" }}>Email:</strong> {email}
      </div>
      <div style={{ textAlign: "left", fontSize: "0.8rem" }}>
        <strong style={{ color: "var(--orange)" }}>Role:</strong> {role}
      </div>
    </div>
  );
};

export default UserInfo;

UserInfo.propTypes = {
  fullName: Proptypes.string.isRequired,
  idNumber: Proptypes.string.isRequired,
  email: Proptypes.string.isRequired,
  role: Proptypes.string.isRequired,
  profilePic: Proptypes.string.isRequired,
};
