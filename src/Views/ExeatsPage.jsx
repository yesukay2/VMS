import React, { useState, useEffect } from "react";
import "../App.css";
import Exeat from "../Components/Exeat";
import { Navigate } from "react-router-dom";
import axios from "axios";
import protectedRoute from "../Utility/ProtectedRoute";
import { Atom } from "react-loading-indicators";

const parseDate = (dateString) => {
  const [datePart, timePart] = dateString.split(" - ");
  const [day, month, year] = datePart.split("-");
  const [time, period] = timePart.split(" ");
  const [hours, minutes, seconds] = time.split(":").map(Number);

  let hours24 = hours;
  if (period === "PM" && hours !== 12) {
    hours24 = hours + 12;
  } else if (period === "AM" && hours === 12) {
    hours24 = 0;
  }

  return new Date(year, month - 1, day, hours24, minutes, seconds);
};

export default function ExeatsPage() {
  const [requestData, setRequestData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exeatsResponse = await axios.get(
          "http://localhost:3000/vms/exeats"
        );
        const sortedExeats = exeatsResponse.data.sort(
          (a, b) => parseDate(b.time_logged) - parseDate(a.time_logged)
        );
        setRequestData(sortedExeats);
        const employeesResponse = await axios.get(
          "http://localhost:3000/vms/employees"
        );
        setEmployeeData(employeesResponse.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [requestData]);

  const findDriverPic = (id) => {
    const employee = employeeData.find((employee) => employee.Id_No == id);
    return employee ? employee.profilePic : "";
  };

  return (
    <>
      {protectedRoute("Admin") ||
      protectedRoute("Security") ||
      protectedRoute("Manager") ||
      protectedRoute("Receptionist") ? (
        <div className="container body-wrapper">
          <h4 className="page-title justify-content-center align-items-center text-center mb-4">
            Exeats Log
          </h4>
          <div className="users">
            <div className="error-notification" id="badgeNotification"></div>

            {loading && (
              <Atom
                size={50}
                color="var(--orange)"
                text="Loading Exeats..."
                textColor="var(--red)"
              />
            )}
            {requestData.length > 0
              ? requestData.map((exeat, index) => (
                  <Exeat
                    key={index}
                    vehicleNo={exeat.vehicle_no}
                    driverId={exeat.driver_id}
                    driverName={exeat.driver_name}
                    profilePic={`${findDriverPic(exeat.driver_id)}`}
                    accompStaffId={exeat.accomp_staff_id}
                    accompStaffName={exeat.accomp_staff_name}
                    destination={exeat.destination}
                    purpose={exeat.purpose}
                    timeLogged={exeat.time_logged}
                    status={exeat.status}
                  />
                ))
              : !loading &&
                requestData.length === 0 && (
                  <div className="d-flex w-100 h-100 justify-content-center align-items-center text-center mt-5">
                    No Exeats Logged!
                  </div>
                )}
          </div>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
}
