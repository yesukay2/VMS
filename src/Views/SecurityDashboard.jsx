// import "../App.css";
// // import approvedExeat from "../approvedReqData";
// import ApprovedExeat from "../Components/ApprovedExeat.jsx";
// import { Navigate } from "react-router-dom";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import protectedRoute from "../Utility/ProtectedRoute.js";
// import { Atom } from "react-loading-indicators";

// export default function ExeatsPage() {
//   const [approvedExeat, setApprovedExeat] = useState([]);
//   const [employeeData, setEmployeeData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const getApprovedExeats = async () => {
//     try {
//       await axios
//         .get("http://localhost:3000/vms/checkpoint/security-dashboard")
//         .then((res) => {
//           return setApprovedExeat(res.data);
//         });

//       await axios.get("http://localhost:3000/vms/employees").then((res) => {
//         setEmployeeData(res.data);
//       });
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     getApprovedExeats();
//   }, [approvedExeat, employeeData]);

//   const recordTimeOut = async (id, timeOut) => {
//     try {
//       await axios.put(
//         `http://localhost:3000/vms/checkpoint/record-timeOut/${id}`,
//         {
//           timeOut,
//         }
//       );
//     } catch (error) {
//       console.log(error);
//     } finally {
//       getApprovedExeats();
//     }
//     return timeOut;
//   };
//   const recordTimeIn = async (id, timeIn) => {
//     try {
//       await axios.put(
//         `http://localhost:3000/vms/checkpoint/record-timeIn/${id}`,
//         {
//           timeIn: timeIn,
//           status: "Resolved",
//         }
//       );
//     } catch (error) {
//       console.log(error);
//     }

//     return timeIn;
//   };

//   return (
//     <>
//       {protectedRoute("Security") || protectedRoute("Admin") ? (
//         <div className="container body-wrapper">
//           <h4 className="page-title d-flex justify-content-center align-items-center mt-5">
//             Approved Exeats Log
//           </h4>
//           {loading && (
//             <div className="d-flex m-5 justify-content-around align-items-center text-center">
//               <Atom
//                 size={50}
//                 color="var(--orange)"
//                 text="Loading Exeats..."
//                 textColor="var(--red)"
//               />
//             </div>
//           )}
//           <ul className="list-group list-unstyled" id="exeat-list">
//             {approvedExeat.length > 0
//               ? approvedExeat.map((exeat) => {
//                   const findPic = employeeData.find(
//                     (employee) => employee.Id_No == exeat.driver_id
//                   );

//                   const driverPic = findPic
//                     ? findPic.profilePic
//                     : "public/avatar4.jpg";

//                   return (
//                     <ApprovedExeat
//                       key={exeat._id}
//                       driver_name={exeat.driver_name}
//                       vehicle_no={exeat.vehicle_no}
//                       accomp_staff_name={exeat.accomp_staff_name}
//                       profilePic={`http://localhost:3000/${driverPic}`}
//                       time_logged={exeat.time_logged}
//                       destination={exeat.destination}
//                       purpose={exeat.purpose}
//                       id={exeat._id}
//                       recordTimeIn={
//                         exeat.time_out != "00:00" &&
//                         exeat.time_in == "00:00" &&
//                         recordTimeIn
//                       }
//                       recordTimeOut={
//                         exeat.time_in == "00:00" &&
//                         exeat.time_out == "00:00" &&
//                         recordTimeOut
//                       }
//                       timeInStatus={
//                         exeat.time_in != "00:00"
//                           ? exeat.time_in
//                           : "Record Time In"
//                       }
//                       timeOutStatus={
//                         exeat.time_out != "00:00"
//                           ? exeat.time_out
//                           : "Record Time Out"
//                       }
//                     />
//                   );
//                 })
//               : !loading &&
//                 approvedExeat.length === 0 && (
//                   <div className="text-center">No Exeats Logged!</div>
//                 )}
//           </ul>
//         </div>
//       ) : (
//         <Navigate to={"/"} />
//       )}
//     </>
//   );
// }

import "../App.css";
import ApprovedExeat from "../Components/ApprovedExeat.jsx";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import protectedRoute from "../Utility/ProtectedRoute.js";
import { Atom } from "react-loading-indicators";

export default function ExeatsPage() {
  const [approvedExeat, setApprovedExeat] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getApprovedExeats = useCallback(async () => {
    try {
      const exeatsRes = await axios.get(
        "http://localhost:3000/vms/checkpoint/security-dashboard"
      );
      const employeesRes = await axios.get(
        "http://localhost:3000/vms/employees"
      );
      setApprovedExeat(exeatsRes.data);
      setEmployeeData(employeesRes.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [setApprovedExeat, setEmployeeData, setLoading]);

  useEffect(() => {
    getApprovedExeats();
  }, [approvedExeat]);

  const recordTimeOut = async (id, timeOut) => {
    try {
      await axios.put(
        `http://localhost:3000/vms/checkpoint/record-timeOut/${id}`,
        { timeOut }
      );
      getApprovedExeats();
    } catch (error) {
      console.log(error);
    }
    return timeOut;
  };

  const recordTimeIn = async (id, timeIn) => {
    try {
      await axios.put(
        `http://localhost:3000/vms/checkpoint/record-timeIn/${id}`,
        { timeIn, status: "Resolved" }
      );
      getApprovedExeats();
    } catch (error) {
      console.log(error);
    }
    return timeIn;
  };

  return (
    <>
      {protectedRoute("Security") || protectedRoute("Admin") ? (
        <div className="container body-wrapper">
          <h4 className="page-title d-flex justify-content-center align-items-center mt-5">
            Approved Exeats Log
          </h4>
          {loading && (
            <div className="d-flex m-5 justify-content-around align-items-center text-center">
              <Atom
                size={50}
                color="var(--orange)"
                text="Loading Exeats..."
                textColor="var(--red)"
              />
            </div>
          )}
          <ul className="list-group list-unstyled" id="exeat-list">
            {approvedExeat.length > 0
              ? approvedExeat.map((exeat) => {
                  const findPic = employeeData.find(
                    (employee) => employee.Id_No === exeat.driver_id
                  );

                  const driverPic = findPic
                    ? findPic.profilePic
                    : "public/avatar4.jpg";

                  return (
                    <ApprovedExeat
                      key={exeat._id}
                      driver_name={exeat.driver_name}
                      vehicle_no={exeat.vehicle_no}
                      accomp_staff_name={exeat.accomp_staff_name}
                      profilePic={`http://localhost:3000/${driverPic}`}
                      time_logged={exeat.time_logged}
                      destination={exeat.destination}
                      purpose={exeat.purpose}
                      id={exeat._id}
                      recordTimeIn={
                        exeat.time_out !== "00:00" && exeat.time_in === "00:00"
                          ? recordTimeIn
                          : null
                      }
                      recordTimeOut={
                        exeat.time_in === "00:00" && exeat.time_out === "00:00"
                          ? recordTimeOut
                          : null
                      }
                      timeInStatus={
                        exeat.time_in !== "00:00"
                          ? exeat.time_in
                          : "Record Time In"
                      }
                      timeOutStatus={
                        exeat.time_out !== "00:00"
                          ? exeat.time_out
                          : "Record Time Out"
                      }
                    />
                  );
                })
              : !loading && (
                  <div className="text-center">No Exeats Logged!</div>
                )}
          </ul>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
}
