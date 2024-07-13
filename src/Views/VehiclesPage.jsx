// import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import VehicleInfo from "../Components/VehicleInfo";
// import vehicles from "../vehiclesData";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const requireAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  return true;
};

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [exeats, setExeats] = useState([]);
  const getVehicles = async () => {
    const vehicles = await axios.get(
      "http://localhost:3000/vms/vehicle/get-vehicles"
    );
    setVehicles(vehicles.data);
  };
  // console.log(vehicles);

  const getExeats = async () => {
    const exeats = await axios.get(
      "http://localhost:3000/vms/vehicle/get-vehicles"
    );
    setExeats(exeats.data);
  };
  useEffect(() => {
    getVehicles();
    getExeats();
  }, [vehicles, exeats]);
  return (
    <>
      {requireAuth() ? (
        <div className=" container body-wrapper vehicles-table">
          <h4 className="page-title mb-4">Vehicles</h4>
          <div className="d-flex flex-row align-items-center justify-content-between mb-4">
            <div className="d-flex flex-row align-items-center">
              <div className="vehicle-status-menu">All</div>
              <div className="vehicle-status-menu">In Transit</div>
              <div className="vehicle-status-menu">Available</div>
            </div>
            <Link to="/register-vehicle">
              <button type="button" href="/" className="btn submit-btn-orange">
                Add Vehicle
              </button>
            </Link>
          </div>
          <div>
            <div className="table body-wrapper">
              <div
                className="d-flex flex-row align-items-center justify-content-between"
                style={{ width: "100%" }}
              >
                <h4 style={{ width: "25%" }}>Vehicle</h4>
                <h4 style={{ width: "25%" }}>Status</h4>
                <h4 style={{ width: "25%" }}>Type</h4>
                <h4 style={{ width: "25%" }}>Parking Lot</h4>
              </div>
              <hr className="w-100" style={{ color: "var(--orange)" }}></hr>
              {vehicles.map((vehicle) => (
                <VehicleInfo
                  key={vehicle.reg_no}
                  vehicleNumber={vehicle.reg_no}
                  status={vehicle.status}
                  vehicle_type={vehicle.vehicle_type}
                  parking_lot={vehicle.parking_lot}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
