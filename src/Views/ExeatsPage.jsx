// import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import Exeat from "../Components/Exeat";
import { Navigate } from "react-router-dom";
import axios from "axios";

const requireAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  return true;
};

export default function ExeatsPage() {
  const [requestData, setRequestData] = useState([]);
  try {
    useEffect(() => {
      const getExeats = async () =>
        await axios.get("http://localhost:3000/vms/exeats").then((res) => {
          return setRequestData(res.data);
        });

      getExeats();
    }, []);
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      {requireAuth() ? (
        <div className="container body-wrapper">
          <h4 className="page-title justify-content-center align-items-center text-center mb-4">
            Exeats Log
          </h4>
          <div className="users">
            <div className="error-notification" id="badgeNotification"></div>

            {requestData.length === 0 && (
              <div className="d-flex w-100 h-100 justify-content-center align-items-center text-center  mt-5">
                No Exeats Logged!
              </div>
            )}
            {requestData.map((exeat, index) => {
              return (
                <Exeat
                  key={index}
                  vehicleNo={exeat.vehicle_no}
                  driverId={exeat.driver_id}
                  driverName={exeat.driver_name}
                  accompStaffId={exeat.accomp_staff_id}
                  accompStaffName={exeat.accomp_staff_name}
                  destination={exeat.destination}
                  purpose={exeat.purpose}
                  timeLogged={exeat.time_logged}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
}
