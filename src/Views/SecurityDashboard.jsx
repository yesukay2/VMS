import "../App.css";
// import approvedExeat from "../approvedReqData";
import ApprovedExeat from "../Components/ApprovedExeat.jsx";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const requireAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  return true;
};

export default function ExeatsPage() {
  const [approvedExeat, setApprovedExeat] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const getApprovedExeats = async () =>
      await axios
        .get("http://localhost:3000/vms/checkpoint/security-dashboard")
        .then((res) => {
          return setApprovedExeat(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    axios
      .get("http://localhost:3000/vms/employees")
      .then((res) => {
        setEmployeeData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    getApprovedExeats();
  }, [approvedExeat]);

  const recordTimeOut = async (id, timeOut) => {
    try {
      await axios
        .put(`http://localhost:3000/vms/checkpoint/record-timeOut/${id}`, {
          timeOut,
        })
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const recordTimeIn = async (id, timeIn) => {
    try {
      await axios
        .put(`http://localhost:3000/vms/checkpoint/record-timeIn/${id}`, {
          timeIn,
        })
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const resolveExeat = async (id, status) => {
    try {
      await axios
        .put(`http://localhost:3000/vms/checkpoint/resolve-exeat/${id}`, {
          status,
        })
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {requireAuth() ? (
        <div className="container body-wrapper">
          <h4 className="page-title d-flex justify-content-center align-items-center mt-5">
            Approved Exeats Log
          </h4>

          <ul className="list-group list-unstyled" id="exeat-list">
            {approvedExeat.length === 0 && "No Exeats Logged!"}
            {approvedExeat.map((exeat) => {
              const driverPic = employeeData.find(
                (employee) => employee.Id_No == exeat.driver_id
              ).profilePic;
              return (
                <ApprovedExeat
                  key={exeat._id}
                  driver_name={exeat.driver_name}
                  vehicle_no={exeat.vehicle_no}
                  accomp_staff_name={exeat.accomp_staff_name}
                  profilePic={`http://localhost:3000/${driverPic}`}
                  time_logged={exeat.time_logged}
                  destination={exeat.destination}
                  purpose={exeat.purpose}
                  id={exeat._id}
                  recordTimeIn={
                    exeat.time_out != "00:00" &&
                    exeat.time_in == "00:00" &&
                    recordTimeIn
                  }
                  recordTimeOut={
                    exeat.time_in == "00:00" &&
                    exeat.time_out == "00:00" &&
                    recordTimeOut
                  }
                  timeInStatus={
                    exeat.time_in != "00:00" ? exeat.time_in : "Record Time In"
                  }
                  timeOutStatus={
                    exeat.time_out != "00:00"
                      ? exeat.time_out
                      : "Record Time Out"
                  }
                  resolve={
                    exeat.time_out != "00:00" &&
                    exeat.time_in != "00:00" &&
                    resolveExeat
                  }
                />
              );
            })}
          </ul>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
}
