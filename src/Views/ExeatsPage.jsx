// // import React from "react";
// import "../App.css";
// import { useState, useEffect } from "react";
// import Exeat from "../Components/Exeat";
// import { Navigate } from "react-router-dom";
// import axios from "axios";

// const requireAuth = () => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     return false;
//   }
//   return true;
// };

// export default function ExeatsPage() {
//   const [requestData, setRequestData] = useState([]);
//   const [employeeData, setEmployeeData] = useState([]);

//   try {
//     useEffect(() => {
//       const getExeats = async () =>
//         await axios.get("http://localhost:3000/vms/exeats").then((res) => {
//           return setRequestData(res.data);
//         });

//       axios.get("http://localhost:3000/vms/employees").then((res) => {
//         setEmployeeData(res.data);
//       });
//       getExeats();
//     }, [requestData, employeeData]);
//   } catch (error) {
//     console.log(error);
//   }

//   const sortByDate = (a, b) => {
//     if (a.timeLogged < b.timeLogged) {
//       return 1;
//     }
//     if (a.timeLogged > b.timeLogged) {
//       return -1;
//     }
//     return 0;
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
//         <div className="container body-wrapper">
//           <h4 className="page-title justify-content-center align-items-center text-center mb-4">
//             Exeats Log
//           </h4>
//           <div className="users">
//             <div className="error-notification" id="badgeNotification"></div>

//             {requestData.length === 0 && (
//               <div className="d-flex w-100 h-100 justify-content-center align-items-center text-center  mt-5">
//                 No Exeats Logged!
//               </div>
//             )}
//             {requestData.map((exeat, index) => {
//               return (
//                 <Exeat
//                   key={index}
//                   vehicleNo={exeat.vehicle_no}
//                   driverId={exeat.driver_id}
//                   driverName={exeat.driver_name}
//                   profilePic={`${findDriverPic(exeat.driver_id)}`}
//                   accompStaffId={exeat.accomp_staff_id}
//                   accompStaffName={exeat.accomp_staff_name}
//                   destination={exeat.destination}
//                   purpose={exeat.purpose}
//                   timeLogged={exeat.time_logged}
//                   status={exeat.status}
//                 />
//               );
//             })}
//           </div>
//         </div>
//       ) : (
//         <Navigate to={"/"} />
//       )}
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import "../App.css";
import Exeat from "../Components/Exeat";
import { Navigate } from "react-router-dom";
import axios from "axios";

const requireAuth = () => {
  const token = localStorage.getItem("token");
  return token !== null;
};

const parseDate = (dateString) => {
  const [datePart, timePart] = dateString.split(" - ");
  const [day, month, year] = datePart.split("-");
  const [time, period] = timePart.split(" ");
  const [hours, minutes, seconds] = time.split(":").map(Number);

  let hours24 = hours;
  if (period === "PM" && hours !== 12) {
    hours24 = hours + 12;
  } else if (period === "AM" && hours === 12) {
    hours24 = 0;
  }

  return new Date(year, month - 1, day, hours24, minutes, seconds);
};

export default function ExeatsPage() {
  const [requestData, setRequestData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const fetchExeats = async () => {
      try {
        const exeatsResponse = await axios.get(
          "http://localhost:3000/vms/exeats"
        );
        const sortedExeats = exeatsResponse.data.sort(
          (a, b) => parseDate(b.time_logged) - parseDate(a.time_logged)
        );
        setRequestData(sortedExeats);
      } catch (error) {
        console.log("Error fetching exeats:", error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const employeesResponse = await axios.get(
          "http://localhost:3000/vms/employees"
        );
        setEmployeeData(employeesResponse.data);
      } catch (error) {
        console.log("Error fetching employees:", error);
      }
    };

    fetchExeats();
    fetchEmployees();
  }, []);

  const findDriverPic = (id) => {
    const employee = employeeData.find((employee) => employee.Id_No == id);
    return employee ? employee.profilePic : "";
  };

  return (
    <>
      {requireAuth() ? (
        <div className="container body-wrapper">
          <h4 className="page-title justify-content-center align-items-center text-center mb-4">
            Exeats Log
          </h4>
          <div className="users">
            <div className="error-notification" id="badgeNotification"></div>

            {requestData.length === 0 && (
              <div className="d-flex w-100 h-100 justify-content-center align-items-center text-center mt-5">
                No Exeats Logged!
              </div>
            )}
            {requestData.map((exeat, index) => (
              <Exeat
                key={index}
                vehicleNo={exeat.vehicle_no}
                driverId={exeat.driver_id}
                driverName={exeat.driver_name}
                profilePic={`${findDriverPic(exeat.driver_id)}`}
                accompStaffId={exeat.accomp_staff_id}
                accompStaffName={exeat.accomp_staff_name}
                destination={exeat.destination}
                purpose={exeat.purpose}
                timeLogged={exeat.time_logged}
                status={exeat.status}
              />
            ))}
          </div>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
}
