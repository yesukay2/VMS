// import React from "react";
import "../App.css";
import UserInfo from "../Components/UserInfo";
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const badgeNotification = document.getElementById("badgeNotification");
  try {
    axios.get("http://localhost:3000/vms/employees").then((res) => {
      return setUsers(res.data);
    });
    // console.log(users);
  } catch (error) {
    console.log(error);
    if (error.response.status == 500) {
      badgeNotification.innerHTML = "Server Error";
      badgeNotification.style.display = "block";
      setTimeout(() => {
        badgeNotification.style.display = "none";
      }, 3000);
    } else if (error.response.status == 503) {
      badgeNotification.innerHTML = "Service Unavailable";
      badgeNotification.style.display = "block";
      setTimeout(() => {
        badgeNotification.style.display = "none";
      }, 3000);
    } else if (
      error.response.status == 400 ||
      error.response.status == 409 ||
      error.response.status == 408
    ) {
      badgeNotification.innerHTML = "Network Error";
      badgeNotification.style.display = "block";
      setTimeout(() => {
        badgeNotification.style.display = "none";
      }, 3000);
    } else {
      badgeNotification.innerHTML = "Something went wrong";
      badgeNotification.style.display = "block";
      setTimeout(() => {
        badgeNotification.style.display = "none";
      }, 3000);
    }
  }

  const requireAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
    return true;
  };

  return (
    <>
      {requireAuth() ? (
        <div className="container body-wrapper">
          <h3 className="page-title mb-4 d-flex justify-content-center">
            Employees
          </h3>
          <div className="users">
            <div className="error-notification" id="badgeNotification"></div>
            {users.length === 0 && (
              <h3 className="d-flex justify-content-center align-items-center flex-column text-center">
                No Employees Found!
              </h3>
            )}
            {users &&
              users.map((user, index) => {
                return (
                  <UserInfo
                    key={index}
                    fullName={user.name}
                    idNumber={user.Id_No}
                    email={user.email}
                    role={user.role}
                    profilePic={user.profilePic}
                  />
                );
              })}
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Users;
