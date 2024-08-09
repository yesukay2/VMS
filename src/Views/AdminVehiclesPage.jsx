// import React from "react";
import "../App.css";
// import { Link } from "react-router-dom";
import AdminVehicleInfo from "../Components/AdminVehicleInfo.jsx";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Atom } from "react-loading-indicators";

const requireAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  return true;
};

export default function AdminVehiclesPage() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [exeats, setExeats] = useState([]);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [filter, setFilter] = useState("all"); // Single state for filter
  const [loading, setLoading] = useState(true);

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

  const editVehicle = async (vehicleNumber) => {
    setEditingVehicle(vehicleNumber);
    navigate(`/edit-vehicle/${vehicleNumber}`);
  };

  const cancelEdit = () => {
    setEditingVehicle(null);
  };

  const saveVehicleChanges = async (updatedVehicleData) => {
    try {
      await axios.put(
        "http://localhost:3000/vms/vehicle/update-vehicle",
        updatedVehicleData
      );
      // Update the local state with the updated vehicle data
      const updatedVehicles = vehicles.map((vehicle) =>
        vehicle.Vehicle_Number === updatedVehicleData.Vehicle_Number
          ? updatedVehicleData
          : vehicle
      );
      setVehicles(updatedVehicles);
      setEditingVehicle(null);
    } catch (error) {
      console.log(error);
      handleApiError(error);
    }
  };
  const deleteVehicle = async (vehicleNumber) => {
    try {
      await axios.delete(
        `http://localhost:3000/vms/vehicle/delete-vehicle/${vehicleNumber}`
      );
    } catch (error) {
      console.error(error);
      handleApiError(error);
    }
  };
  useEffect(() => {
    getVehicles();
    getExeats();
    setLoading(false);
  }, [vehicles, exeats]);

  const filterVehicles = () => {
    switch (filter) {
      case "inTransit":
        return vehicles.filter((vehicle) =>
          exeats.some((exeat) => exeat.vehicle_no === vehicle.reg_no)
        );
      case "available":
        return vehicles.filter(
          (vehicle) =>
            !exeats.some((exeat) => exeat.vehicle_no === vehicle.reg_no)
        );
      case "all":
      default:
        return vehicles;
    }
  };
  const handleApiError = (error) => {
    // Handle error notifications based on different error statuses
    let errorMessage = "Something went wrong";
    if (error.response) {
      const status = error.response.status;
      if (status === 500) errorMessage = "Server Error";
      else if (status === 503) errorMessage = "Service Unavailable";
      else if (status === 400 || status === 409 || status === 408)
        errorMessage = "Network Error";
    }
    showNotification(errorMessage);
  };
  const showNotification = (message) => {
    const badgeNotification = document.getElementById("badgeNotification");
    badgeNotification.innerHTML = message;
    badgeNotification.style.display = "block";
    setTimeout(() => {
      badgeNotification.style.display = "none";
    }, 3000);
  };
  return (
    <>
      {requireAuth() ? (
        <div className=" container body-wrapper vehicles-table">
          <h4 className="page-title mb-4">Vehicles</h4>
          <div className="error-notification" id="badgeNotification"></div>
          <div className="d-flex flex-row align-items-center justify-content-between mb-4">
            <div className="d-flex flex-row align-items-center">
              <div
                className="vehicle-status-menu vehicle-filter"
                onClick={() => setFilter("all")}
                style={{
                  background: `${
                    filter === "all"
                      ? `linear-gradient(180deg, #49E23E 50%, #E2DC3E 50%)`
                      : ""
                  }`,
                  color: `${filter === "all" ? "var(--gray)" : ""}`,
                }}
              >
                All
              </div>
              <div
                className="vehicle-status-menu vehicle-filter"
                onClick={() => setFilter("inTransit")}
                style={{
                  background: `${
                    filter === "inTransit" ? "var(--orange)" : ""
                  }`,
                  color: `${filter === "inTransit" ? "var(--white)" : ""}`,
                }}
              >
                In Transit
              </div>
              <div
                className="vehicle-status-menu vehicle-filter"
                onClick={() => setFilter("available")}
                style={{
                  background: `${filter === "available" ? "var(--green)" : ""}`,
                  color: `${filter === "available" ? "var(--white)" : ""}`,
                }}
              >
                Available
              </div>
            </div>
          </div>
          <div>
            <div className="table body-wrapper">
              <div
                className="d-flex flex-row align-items-center justify-content-between"
                style={{ width: "100%" }}
              >
                <h4 style={{ width: "20%" }}>Vehicle</h4>
                <h4 style={{ width: "20%" }}>Status</h4>
                <h4 style={{ width: "20%" }}>Type</h4>
                <h4 style={{ width: "20%" }}>Parking Lot</h4>
                <h4 style={{ width: "20%" }}>Actions</h4>
              </div>
              <hr className="w-100" style={{ color: "var(--orange)" }}></hr>

              {loading ? (
                <div
                  className="d-flex flex-row align-items-center justify-content-center"
                  style={{
                    width: "100%",
                    height: "100%",
                    padding: "2rem",
                  }}
                >
                  <Atom
                    color="#32cd32"
                    size="medium"
                    text="Loading Data..."
                    textColor="red"
                  />
                </div>
              ) : filterVehicles().length > 0 ? (
                filterVehicles().map((vehicle) => (
                  <AdminVehicleInfo
                    key={vehicle.reg_no}
                    vehicleNumber={vehicle.reg_no}
                    status={
                      exeats.find((exeat) => exeat.vehicle_no == vehicle.reg_no)
                        ? "In Transit"
                        : "Available"
                    }
                    vehicle_type={vehicle.vehicle_type}
                    parking_lot={vehicle.parking_lot}
                    editVehicle={editVehicle}
                    cancelEdit={cancelEdit}
                    onSave={saveVehicleChanges}
                    deleteVehicle={deleteVehicle}
                  />
                ))
              ) : (
                <div
                  className="d-flex flex-row align-items-center justify-content-center"
                  style={{ width: "100%" }}
                >
                  <h4>No Vehicles Available</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
