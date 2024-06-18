// import React from "react";
import "../App.css";
import { useState } from "react";
import ManageExeat from "../Components/ManageExeat.jsx";
import { Navigate } from "react-router-dom";
import axios from "axios";

const requireAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  return true;
};

export default function ManagerDashboard() {
  const [manageExeatData, setManageExeatData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  try {
    axios.get("http://localhost:3000/vms/exeats").then((res) => {
      setManageExeatData(res.data);
    });
  } catch (error) {
    console.log(error);
  }

  try {
    axios.get("http://localhost:3000/vms/employees").then((res) => {
      setEmployeeData(res.data);
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      {requireAuth() ? (
        <>
          <div className="error-notification" id="badgeNotification"></div>
          <div className="container body-wrapper">
            <h4 className="page-title d-flex justify-content-center align-items-center mt-5">
              Manager Dashboard
            </h4>
            <h5 className="time-title mt-5">Logged Exeats</h5>
            <ul className="list-group list-unstyled" id="exeat-list">
              {manageExeatData.length === 0 && (
                <div className="text-center">No Exeats Logged!</div>
              )}
              {manageExeatData.length > 0 &&
                manageExeatData.map((exeat) => {
                  return (
                    <ManageExeat
                      id={exeat._id}
                      key={exeat._id}
                      vehicle_no={exeat.vehicle_no}
                      driver_name={exeat.driver_name}
                      // profilePic={
                      //   employeeData.find(
                      //     (employee) => employee.Id_No == exeat.driver_id
                      //   ).profilePic
                      // }
                      time_logged={exeat.time_logged}
                      destination={exeat.destination}
                      purpose={exeat.purpose}
                      accomp_staff_name={exeat.accomp_staff_name}
                    />
                  );
                })}
            </ul>
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
