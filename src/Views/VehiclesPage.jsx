// import "../App.css";
// import VehicleInfo from "../Components/VehicleInfo";
// import { Navigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import protectedRoute from "../Utility/ProtectedRoute";
// import { Atom } from "react-loading-indicators";

// export default function VehiclesPage() {
//   const [vehicles, setVehicles] = useState([]);
//   const [exeats, setExeats] = useState([]);
//   const [inTransitVehicles, setInTransitVehicles] = useState(false);
//   const [availableVehicles, setAvailableVehicles] = useState(false);
//   const [allVehicles, setAllVehicles] = useState(true);
//   const [loading, setLoading] = useState(true);

//   const getData = async () => {
//     try {
//       const vehicleResponse = await axios.get("http://localhost:3000/vms/vehicle/get-vehicles");
//       setVehicles(vehicleResponse.data);

//       const exeatResponse = await axios.get("http://localhost:3000/vms/checkpoint/security-dashboard");
//       setExeats(exeatResponse.data);
//     } catch (error) {
//       console.log(error);
//       document.getElementById("badgeNotification").innerHTML = error.message;
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const displayInTransitVehicles = () => {
//     setInTransitVehicles(true);
//     setAllVehicles(false);
//     setAvailableVehicles(false);
//   };

//   const displayAvailableVehicles = () => {
//     setAvailableVehicles(true);
//     setAllVehicles(false);
//     setInTransitVehicles(false);
//   };

//   const displayAllVehicles = () => {
//     setAllVehicles(true);
//     setAvailableVehicles(false);
//     setInTransitVehicles(false);
//   };

//   const filterVehicles = () => {
//     if (allVehicles) {
//       return vehicles;
//     } else if (inTransitVehicles) {
//       return vehicles.filter(vehicle => exeats.some(exeat => exeat.vehicle_no === vehicle.reg_no));
//     } else if (availableVehicles) {
//       return vehicles.filter(vehicle => !exeats.some(exeat => exeat.vehicle_no === vehicle.reg_no));
//     }
//     return [];
//   };

//   return (
//     <>
//       {protectedRoute("Admin") ||
//       protectedRoute("Security") ||
//       protectedRoute("Manager") ||
//       protectedRoute("Receptionist") ? (
//         <div className="container body-wrapper vehicles-table">
//           <h4 className="page-title text-center mb-4">Vehicles</h4>
//           <div className="error-notification" id="badgeNotification"></div>
//           <div className="d-flex flex-row align-items-center justify-content-between mb-4">
//             <div className="d-flex flex-row align-items-center">
//               <div
//                 className="vehicle-status-menu vehicle-filter"
//                 onClick={displayAllVehicles}
//                 style={{
//                   background: `${allVehicles ? `linear-gradient(to left, #49E23E 70%, #E2DC3E 10%)` : ""}`,
//                   color: `${allVehicles ? "var(--black)" : ""}`,
//                 }}
//               >
//                 All
//               </div>
//               <div
//                 className="vehicle-status-menu vehicle-filter"
//                 onClick={displayInTransitVehicles}
//                 style={{
//                   background: `${inTransitVehicles ? "var(--orange)" : ""}`,
//                   color: `${inTransitVehicles ? "var(--white)" : ""}`,
//                 }}
//               >
//                 In Transit
//               </div>
//               <div
//                 className="vehicle-status-menu vehicle-filter"
//                 onClick={displayAvailableVehicles}
//                 style={{
//                   background: `${availableVehicles ? "var(--green)" : ""}`,
//                   color: `${availableVehicles ? "var(--white)" : ""}`,
//                 }}
//               >
//                 Available
//               </div>
//             </div>
//             {/* <Link to="/register-vehicle">
//               <CarPlusIcon />
//             </Link> */}
//           </div>
//           <div>
//             <div className="table body-wrapper">
//               <div
//                 className="d-flex flex-row align-items-center justify-content-between"
//                 style={{ width: "100%" }}
//               >
//                 <h4 style={{ width: "25%" }}>Vehicle</h4>
//                 <h4 style={{ width: "25%" }}>Status</h4>
//                 <h4 style={{ width: "25%" }}>Type</h4>
//                 <h4 style={{ width: "25%" }}>Parking Lot</h4>
//               </div>
//               <hr className="w-100" style={{ color: "var(--orange)" }}></hr>
//               {loading ? (
//                 <div
//                   className="d-flex flex-row align-items-center justify-content-center"
//                   style={{ width: "100%" }}
//                 >
//                   <Atom color="#32cd32" size="medium" text="" textColor="" />
//                 </div>
//               ) : filterVehicles().length > 0 ? (
//                 filterVehicles().map((vehicle) => (
//                   <VehicleInfo
//                     key={vehicle.reg_no}
//                     vehicleNumber={vehicle.reg_no}
//                     status={exeats.some(exeat => exeat.vehicle_no === vehicle.reg_no) ? "In Transit" : "Available"}
//                     vehicle_type={vehicle.vehicle_type}
//                     parking_lot={vehicle.parking_lot}
//                   />
//                 ))
//               ) : (
//                 <div
//                   className="d-flex flex-row align-items-center justify-content-center"
//                   style={{ width: "100%" }}
//                 >
//                   <h4>No Vehicles Available</h4>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <Navigate to="/" />
//       )}
//     </>
//   );
// }

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
  const [inTransitVehicles, setInTransitVehicles] = useState(false);
  const [availableVehicles, setAvailableVehicles] = useState(false);
  const [allVehicles, setAllVehicles] = useState(true);
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

  const displayAllVehicles = () => {
    setAllVehicles(true);
    setAvailableVehicles(false);
    setInTransitVehicles(false);
  };

  const filterVehicles = () => {
    if (allVehicles) {
      return vehicles;
    } else if (inTransitVehicles) {
      return vehicles.filter((vehicle) =>
        exeats.some((exeat) => exeat.vehicle_no === vehicle.reg_no)
      );
    } else if (availableVehicles) {
      return vehicles.filter(
        (vehicle) =>
          !exeats.some((exeat) => exeat.vehicle_no === vehicle.reg_no)
      );
    }
    return [exeats, vehicles];
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
                onClick={displayAllVehicles}
                style={{
                  background: `${
                    allVehicles
                      ? `linear-gradient(180deg, #49E23E 50%, #E2DC3E 50%)`
                      : ""
                  }`,
                  color: `${allVehicles ? "var(--gray)" : ""}`,
                }}
              >
                All
              </div>
              <div
                className="vehicle-status-menu vehicle-filter"
                onClick={displayInTransitVehicles}
                style={{
                  background: `${inTransitVehicles ? "var(--orange)" : ""}`,
                  color: `${inTransitVehicles ? "var(--white)" : ""}`,
                }}
              >
                In Transit
              </div>
              <div
                className="vehicle-status-menu vehicle-filter"
                onClick={displayAvailableVehicles}
                style={{
                  background: `${availableVehicles ? "var(--green)" : ""}`,
                  color: `${availableVehicles ? "var(--white)" : ""}`,
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
