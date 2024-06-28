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

  useEffect(() => {
    const getApprovedExeats = async () =>
      await axios
        .get("http://localhost:3000/vms/security-dashboard")
        .then((res) => {
          // console.log(approvedExeat);
          return setApprovedExeat(res.data);
        });
    getApprovedExeats();
  }, [approvedExeat]);

  return (
    <>
      {requireAuth() ? (
        <div className="container body-wrapper">
          <h4 className="page-title d-flex justify-content-center align-items-center mt-5">
            Approved Exeats Log
          </h4>
          <h5 className="time-title">Today</h5>
          <ul className="list-group list-unstyled" id="exeat-list">
            {approvedExeat.length === 0 && "No Exeats Logged!"}
            {approvedExeat.map((exeat) => {
              return (
                <ApprovedExeat
                  key={exeat._id}
                  driver_name={exeat.driver_name}
                  vehicle_no={exeat.vehicle_no}
                  accomp_staff_name={exeat.accomp_staff_name}
                  profilePic={exeat.profilePic}
                  time_logged={exeat.time_logged}
                  destination={exeat.destination}
                  purpose={exeat.purpose}
                  id={exeat._id}
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
