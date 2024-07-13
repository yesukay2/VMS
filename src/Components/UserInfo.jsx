import React from "react";
import "../App.css";
import Proptypes from "prop-types";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const UserInfo = ({
  fullName,
  Id_No,
  email,
  role,
  profilePic,
  deleteUser,
  editUser,
}) => {
  const confirmDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${fullName}?`
    );

    if (confirmed) {
      deleteUserHandler();
    }
  };
  const deleteUserHandler = () => {
    deleteUser(Id_No);
  };
  return (
    <div className="card p-2 text-center user-info">
      <img
        src={profilePic}
        alt="profilePic"
        className="profilePic mb-3 img-fluid rounded-circle align-self-center"
        style={{
          borderRadius: "5%",
          width: "11.5rem",
          height: "11.5rem",
          objectFit: "cover",
        }}
      />
      <h5>{fullName}</h5>
      <hr className="mt-0" style={{ color: "var(--orange)" }} />
      <div style={{ textAlign: "left", fontSize: "0.8rem", marginTop: "0%" }}>
        <span style={{ color: "var(--orange)", fontSize: "0.8rem" }}>
          ID Number:
        </span>{" "}
        {Id_No}
      </div>
      <div style={{ textAlign: "left", fontSize: "0.8rem" }}>
        <span style={{ color: "var(--green)" }}>Email:</span> {email}
      </div>
      <div style={{ textAlign: "left", fontSize: "0.8rem" }}>
        <span style={{ color: "var(--orange)" }}>Role:</span> {role}
      </div>

      <div className="d-flex justify-content-end gap-2">
        <FiEdit
          style={{
            color: "var(--yellow)",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
          onClick={() => editUser(Id_No)}
        />
        <MdOutlineDeleteOutline
          style={{
            color: "var(--red)",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
          onClick={confirmDelete}
        />
      </div>
    </div>
  );
};

export default UserInfo;

UserInfo.propTypes = {
  fullName: Proptypes.string.isRequired,
  Id_No: Proptypes.string.isRequired,
  email: Proptypes.string.isRequired,
  role: Proptypes.string.isRequired,
  profilePic: Proptypes.string.isRequired,
  deleteUser: Proptypes.func,
  editUser: Proptypes.func,
};
