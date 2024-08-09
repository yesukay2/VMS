import "../App.css";
import VehicleInfo from "../Components/VehicleInfo";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import protectedRoute from "../Utility/ProtectedRoute";
import { Atom } from "react-loading-indicators";

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [exeats, setExeats] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const vehicleResponse = await axios.get(
        "http://localhost:3000/vms/vehicle/get-vehicles"
      );
      setVehicles(vehicleResponse.data);

      const exeatResponse = await axios.get(
        "http://localhost:3000/vms/checkpoint/security-dashboard"
      );
      setExeats(exeatResponse.data);
    } catch (error) {
      console.log(error);
      document.getElementById("badgeNotification").innerHTML = error.message;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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

  return (
    <>
      {protectedRoute("Admin") ||
      protectedRoute("Security") ||
      protectedRoute("Manager") ||
      protectedRoute("Receptionist") ? (
        <div className="container body-wrapper vehicles-table">
          <h4 className="page-title text-center mb-4">Vehicles</h4>
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
            {/* <Link to="/register-vehicle">
              <CarPlusIcon />
            </Link> */}
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
                  <VehicleInfo
                    key={vehicle.reg_no}
                    vehicleNumber={vehicle.reg_no}
                    status={
                      exeats.some(
                        (exeat) => exeat.vehicle_no === vehicle.reg_no
                      )
                        ? "In Transit"
                        : "Available"
                    }
                    vehicle_type={vehicle.vehicle_type}
                    parking_lot={vehicle.parking_lot}
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
