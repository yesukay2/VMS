// import React from "react";
// import "../App.css";
// import { useState, useEffect } from "react";
// import ManageExeat from "../Components/ManageExeat.jsx";
// import { Navigate } from "react-router-dom";
// import axios from "axios";

// const requireAuth = () => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     return false;
//   }
//   return true;
// };

// export default function ManagerDashboard() {
//   const [manageExeatData, setManageExeatData] = useState([]);
//   const [employeeData, setEmployeeData] = useState([]);

//   useEffect(() => {
//     const getData = () => {
//       try {
//         axios
//           .get("http://localhost:3000/vms/manager/manage-requests")
//           .then((res) => {
//             setManageExeatData(res.data);
//           });
//         axios.get("http://localhost:3000/vms/employees").then((res) => {
//           setEmployeeData(res.data);
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getData();
//   }, [manageExeatData, employeeData]);

//   // useEffect(() => {
//   //   const showBrowserNotification = () => {

//   //   }
//   // }, [manageExeatData]);
//   const updateStatus = async (id, status) => {
//     try {
//       await axios.put(`http://localhost:3000/vms/manager/update-status/${id}`, {
//         status,
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const findDriverPic = (id) => {
//     const picUrl = employeeData.find(
//       (employee) => employee.Id_No == id
//     ).profilePic;
//     return picUrl;
//   };

//   return (
//     <>
//       {requireAuth() ? (
//         <>
//           <div className="error-notification" id="badgeNotification"></div>
//           <div className="container body-wrapper">
//             <h4 className="page-title d-flex justify-content-center align-items-center mt-5">
//               Manager Dashboard
//             </h4>
//             <h5 className="time-title mt-5">Logged Exeats</h5>
//             <ul className="list-group list-unstyled" id="exeat-list">
//               {manageExeatData.length === 0 && (
//                 <div className="text-center">No Exeats Logged!</div>
//               )}
//               {manageExeatData.length > 0 &&
//                 manageExeatData.map((exeat) => {
//                   return (
//                     <ManageExeat
//                       id={exeat._id}
//                       key={exeat._id}
//                       vehicle_no={exeat.vehicle_no}
//                       driver_name={exeat.driver_name}
//                       profilePic={`${findDriverPic(exeat.driver_id)}`}
//                       time_logged={exeat.time_logged}
//                       destination={exeat.destination}
//                       purpose={exeat.purpose}
//                       accomp_staff_name={exeat.accomp_staff_name}
//                       updateStatus={updateStatus}
//                     />
//                   );
//                 })}
//             </ul>
//           </div>
//         </>
//       ) : (
//         <Navigate to="/" />
//       )}
//     </>
//   );
// }

import "../App.css";
import { useState, useEffect } from "react";
import ManageExeat from "../Components/ManageExeat.jsx";
import { Navigate } from "react-router-dom";
import axios from "axios";

const requireAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  return true;
};

export default function ManagerDashboard() {
  const [manageExeatData, setManageExeatData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [prevDataLength, setPrevDataLength] = useState(0); // To keep track of previous data length

  // Function to request notification permission
  const requestNotificationPermission = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          ("Notification permission granted.");
        } else {
          ("Notification permission denied.");
        }
      });
    } else {
      // console.log("Notification permission already granted.");
    }
  };

  useEffect(() => {
    requestNotificationPermission();

    const getData = async () => {
      try {
        const exeatRes = await axios.get(
          "http://localhost:3000/vms/manager/manage-requests"
        );
        setManageExeatData(exeatRes.data);
        const employeeRes = await axios.get(
          "http://localhost:3000/vms/employees"
        );
        setEmployeeData(employeeRes.data);
      } catch (error) {
        error;
      }
    };

    getData();
  }, [manageExeatData, employeeData]);

  useEffect(() => {
    // Show a notification if new data is added
    if (manageExeatData.length > prevDataLength) {
      if (Notification.permission === "granted") {
        new Notification("New request added", {
          body: "A new request has been added to the system.",
          icon: "path/to/your/icon.png", // Provide the path to your icon
        });
      }
      setPrevDataLength(manageExeatData.length);
    }
  }, [manageExeatData, prevDataLength]);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:3000/vms/manager/update-status/${id}`, {
        status,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const findDriverPic = (id) => {
    const employee = employeeData.find((employee) => employee.Id_No == id);
    const picUrl = employee ? employee.profilePic : "public/avatar4.jpg";
    return `http://localhost:3000/${picUrl}`;
  };

  return (
    <>
      {requireAuth() ? (
        <>
          <div className="error-notification" id="badgeNotification"></div>
          <div className="container body-wrapper">
            <h4 className="page-title d-flex justify-content-center align-items-center mt-5">
              Manager Dashboard
            </h4>
            <h5 className="time-title mt-5">Logged Exeats</h5>
            <ul className="list-group list-unstyled" id="exeat-list">
              {manageExeatData.length === 0 && (
                <div className="text-center">No Exeats Logged!</div>
              )}
              {manageExeatData.length > 0 &&
                manageExeatData.map((exeat) => {
                  return (
                    <ManageExeat
                      id={exeat._id}
                      key={exeat._id}
                      vehicle_no={exeat.vehicle_no}
                      driver_name={exeat.driver_name}
                      profilePic={findDriverPic(exeat.driver_id)}
                      time_logged={exeat.time_logged}
                      destination={exeat.destination}
                      purpose={exeat.purpose}
                      accomp_staff_name={exeat.accomp_staff_name}
                      updateStatus={updateStatus}
                    />
                  );
                })}
            </ul>
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
