import React from "react";
import "../App.css";
import Proptypes from "prop-types";

const UserInfo = ({ fullName, idNumber, email, role }) => {
  return (
    <div className="card p-3 text-center user-info">
      <h1>{fullName}</h1>
      <hr className="mt-0" />
      <div>
        <strong>ID Number:</strong> {idNumber}
      </div>
      <div>
        <strong>Email:</strong> {email}
      </div>
      <div>
        <strong>Role:</strong> {role}
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
};
