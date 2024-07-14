// import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const getData = () => {
      try {
        axios
          .get("http://localhost:3000/vms/manager/manage-requests")
          .then((res) => {
            setManageExeatData(res.data);
          });
        axios.get("http://localhost:3000/vms/employees").then((res) => {
          setEmployeeData(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [manageExeatData]);

  // useEffect(() => {
  //   const showBrowserNotification = () => {

  //   }
  // }, [manageExeatData]);
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:3000/vms/manager/update-status/${id}`, {
        status,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const findDriverPic = (id) => {
    const picUrl = employeeData.find(
      (employee) => employee.Id_No == id
    ).profilePic;
    return picUrl;
  };

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
                      profilePic={`${findDriverPic(exeat.driver_id)}`}
                      time_logged={exeat.time_logged}
                      destination={exeat.destination}
                      purpose={exeat.purpose}
                      accomp_staff_name={exeat.accomp_staff_name}
                      updateStatus={updateStatus}
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
