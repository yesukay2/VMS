// import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import VehicleInfo from "../Components/VehicleInfo";
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
  const [inTransitVehicles, setInTransitVehicles] = useState(false);
  const [availableVehicles, setAvailableVehicles] = useState(false);
  const [allVehicles, setAllVehicles] = useState(true);

  const getVehicles = async () => {
    await axios
      .get("http://localhost:3000/vms/vehicle/get-vehicles")
      .then((res) => setVehicles(res.data))
      .catch((err) => {
        document.getElementById("badgeNotification").innerHTML = err.message;
      });
  };

  const getExeats = async () => {
    await axios
      .get("http://localhost:3000/vms/checkpoint/security-dashboard")
      .then((exeats) => setExeats(exeats.data))
      .catch((err) => {
        document.getElementById("badgeNotification").innerHTML = err.message;
      });
  };

  useEffect(() => {
    getVehicles();
    getExeats();
  }, [vehicles, exeats]);

  const displayInTransitVehicles = () => {
    setInTransitVehicles(true);
    setAllVehicles(false);
    setAvailableVehicles(false);
  };

  const displayAvailableVehicles = () => {
    setAvailableVehicles(true);
    setAllVehicles(false);
    setInTransitVehicles(false);
  };

  return (
    <>
      {requireAuth() ? (
        <div className=" container body-wrapper vehicles-table">
          <h4 className="page-title text-center  mb-4">Vehicles</h4>
          <div className="error-notification" id="badgeNotification"></div>
          <div className="d-flex flex-row align-items-center justify-content-between mb-4">
            <div className="d-flex flex-row align-items-center">
              <div
                className="vehicle-status-menu vehicle-filter"
                onClick={() => getVehicles() && setAllVehicles(true)}
              >
                All
              </div>
              <div
                className="vehicle-status-menu vehicle-filter"
                onClick={() => displayInTransitVehicles()}
              >
                In Transit
              </div>
              <div
                className="vehicle-status-menu vehicle-filter"
                onClick={() => displayAvailableVehicles()}
              >
                Available
              </div>
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
              {allVehicles
                ? vehicles &&
                  vehicles.map((vehicle) => (
                    <VehicleInfo
                      key={vehicle.reg_no}
                      vehicleNumber={vehicle.reg_no}
                      status={
                        exeats.find(
                          (exeat) => exeat.vehicle_no == vehicle.reg_no
                        )
                          ? "In Transit"
                          : "Available"
                      }
                      vehicle_type={vehicle.vehicle_type}
                      parking_lot={vehicle.parking_lot}
                    />
                  ))
                : null}

              {inTransitVehicles
                ? vehicles &&
                  vehicles
                    .filter((vehicle) =>
                      exeats.find((exeat) => exeat.vehicle_no == vehicle.reg_no)
                    )
                    .map((vehicle) => (
                      <VehicleInfo
                        key={vehicle.reg_no}
                        vehicleNumber={vehicle.reg_no}
                        status="In Transit"
                        vehicle_type={vehicle.vehicle_type}
                        parking_lot={vehicle.parking_lot}
                      />
                    ))
                : null}

              {availableVehicles
                ? vehicles &&
                  vehicles
                    .filter(
                      (vehicle) =>
                        !exeats.find(
                          (exeat) => exeat.vehicle_no == vehicle.reg_no
                        )
                    )
                    .map((vehicle) => (
                      <VehicleInfo
                        key={vehicle.reg_no}
                        vehicleNumber={vehicle.reg_no}
                        status="Available"
                        vehicle_type={vehicle.vehicle_type}
                        parking_lot={vehicle.parking_lot}
                      />
                    ))
                : null}
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
