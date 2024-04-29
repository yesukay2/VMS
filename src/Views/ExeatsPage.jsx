// import React from "react";
import "../App.css";
import requestData from "../requestData.js";
import Exeat from "../Components/Exeat";
import { Navigate } from "react-router-dom";

const requireAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  return true;
};

export default function ExeatsPage() {
  return (
    <>
      {requireAuth() ? (
        <div className="container body-wrapper">
          <h4 className="page-title d-flex justify-content-center align-items-center mt-2">
            Exeat Logs
          </h4>
          <h5 className="time-title">Today</h5>
          <ul className="list-group list-unstyled" id="exeat-list">
            {requestData.length === 0 && "No Exeats Logged!"}
            {requestData.map((exeat) => {
              return (
                <Exeat
                  key={exeat.id}
                  name={exeat.name}
                  avatar={exeat.avatar}
                  time={exeat.time}
                />
              );
            })}
          </ul>
          <h5 className="time-title">Yesterday</h5>
          <ul className="list-group list-unstyled" id="exeat-list">
            {requestData.length === 0 && "No Exeats Logged!"}
            {requestData.map((exeat) => {
              return (
                <Exeat
                  key={exeat.id}
                  name={exeat.name}
                  avatar={exeat.avatar}
                  time={exeat.time}
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
