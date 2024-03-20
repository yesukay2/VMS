// import React from "react";
import "../App.css";
import manageExeatData from "../ManageExeatData";
import ManageExeat from "../Components/ManageExeat.jsx";

export default function ManagerDashboard() {
  return (
    <div className="container body-wrapper">
      <h4 className="page-title d-flex justify-content-center align-items-center mt-5">
        Manager Dashboard
      </h4>
      <h5 className="time-title mt-5">Today</h5>
      <ul className="list-group list-unstyled" id="exeat-list">
        {manageExeatData.length === 0 && "No Exeats Logged!"}
        {manageExeatData.map((exeat) => {
          return (
            <ManageExeat
              id={exeat.id}
              key={exeat.id}
              name={exeat.name}
              avatar={exeat.avatar}
              time={exeat.time}
              destination={exeat.destination}
              purpose={exeat.purpose}
              accomp_staff={exeat.accomp_staff}
            />
          );
        })}
      </ul>
      <h5 className="time-title">Yesterday</h5>
      <ul className="list-group list-unstyled" id="exeat-list">
        {manageExeatData.length === 0 && "No Exeats Logged!"}
        {manageExeatData.map((exeat) => {
          return (
            <ManageExeat
              id={exeat.id}
              key={exeat.id}
              name={exeat.name}
              avatar={exeat.avatar}
              time={exeat.time}
              destination={exeat.destination}
              purpose={exeat.purpose}
              accomp_staff={exeat.accomp_staff}
            />
          );
        })}
      </ul>
    </div>
  );
}
