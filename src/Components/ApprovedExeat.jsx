// import PropTypes from "prop-types";
// import "../App.css";
// import { useState, useEffect } from "react";

// export default function ApprovedExeat({
//   id,
//   vehicle_no,
//   driver_name,
//   accomp_staff_name,
//   time_logged,
//   destination,
//   profilePic,
//   recordTimeIn,
//   recordTimeOut,
//   timeInStatus,
//   timeOutStatus,
// }) {
//   const [timeInProcessing, setTimeInProcessing] = useState(false);
//   const [timeOutProcessing, setTimeOutProcessing] = useState(false);

//   const recordTimeInFunction = async () => {
//     try {
//       setTimeInProcessing(true);
//       console.log("TimeIn processing started", timeInProcessing);
//       const date = new Date();
//       const strTime = formatTime(date);
//       await recordTimeIn(id, strTime);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setTimeInProcessing(false);
//       console.log("TimeIn processing ended", timeInProcessing);
//     }
//   };

//   const recordTimeOutFunction = async () => {
//     try {
//       setTimeOutProcessing(true);
//       console.log("TimeOut processing started", timeOutProcessing);
//       const date = new Date();
//       const strTime = formatTime(date);
//       await recordTimeOut(id, strTime);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setTimeOutProcessing(false);
//       console.log("TimeOut processing ended", timeOutProcessing);
//     }
//   };

//   const formatTime = (date) => {
//     let hour = date.getHours();
//     let minute = date.getMinutes();
//     const ampm = hour >= 12 ? "PM" : "AM";
//     hour = hour % 12;
//     hour = hour ? hour : 12;
//     minute = minute < 10 ? "0" + minute : minute;
//     return hour + ":" + minute + " " + ampm;
//   };

//   useEffect(() => {
//     console.log("TimeIn processing state changed:", timeInProcessing);
//   }, [timeInProcessing]);

//   useEffect(() => {
//     console.log("TimeOut processing state changed:", timeOutProcessing);
//   }, [timeOutProcessing]);

//   return (
//     <div
//       id={id}
//       className="mt-3 p-3"
//       style={{
//         border: "1px solid var(--orange)",
//         borderRadius: "5px",
//         marginBottom: "1rem",
//         width: "100%",
//       }}
//     >
//       <div className="d-flex flex-row align-items-center justify-content-between">
//         <div className="d-flex flex-row align-items-center exeat">
//           <div className="">
//             <img
//               src={profilePic}
//               alt="Profile Picture"
//               className=" profile-picture img-fluid rounded-circle"
//             />
//           </div>
//           <div>
//             <p className="mb-0 exeat-info">
//               <span
//                 style={{
//                   fontWeight: "lighter",
//                   color: "var(--green)",
//                   marginRight: "0.5rem",
//                   fontSize: "0.8rem",
//                 }}
//               >
//                 Driver:{" "}
//               </span>
//               {driver_name}
//             </p>
//             <p className="mb-0 exeat-info">
//               <span
//                 style={{
//                   fontWeight: "lighter",
//                   color: "var(--orange)",
//                   marginRight: "0.5rem",
//                   fontSize: "0.8rem",
//                 }}
//               >
//                 Accomp. Staff:{" "}
//               </span>
//               {accomp_staff_name}
//             </p>
//             <p className="mb-0 exeat-info">
//               <span
//                 style={{
//                   fontWeight: "lighter",
//                   color: "var(--green)",
//                   marginRight: "0.5rem",
//                   fontSize: "0.8rem",
//                 }}
//               >
//                 Vehicle No:{" "}
//               </span>
//               {vehicle_no}
//             </p>
//             <p className="mb-0 exeat-info">
//               <span
//                 style={{
//                   fontWeight: "lighter",
//                   color: "var(--orange)",
//                   marginRight: "0.5rem",
//                   fontSize: "0.8rem",
//                 }}
//               >
//                 Destination:{" "}
//               </span>
//               {destination}
//             </p>
//             <p className="mb-0 exeat-info">
//               <span
//                 style={{
//                   fontWeight: "lighter",
//                   color: "var(--green)",
//                   marginRight: "0.5rem",
//                   fontSize: "0.8rem",
//                 }}
//               >
//                 Time Logged:{" "}
//               </span>
//               {time_logged}
//             </p>
//           </div>
//         </div>
//         <div className="d-flex flex-column justify-content-between">
//           <div className="d-flex flex-row align-items-start">
//             <p
//               className="exeat-info d-inline-block w-30"
//               style={{ marginRight: "0.5rem" }}
//             >
//               Time Out:
//             </p>
//             <button
//               className="btn timeOut-btn mb-3 w-70"
//               onClick={recordTimeOutFunction}
//               disabled={timeOutProcessing}
//             >
//               {timeOutProcessing ? "Processing..." : timeOutStatus}
//             </button>
//           </div>
//           <div className="d-flex flex-row align-items-start gap-2">
//             <p className="exeat-info w-30"> Time In:</p>
//             <button
//               className="btn timeIn-btn w-70"
//               onClick={recordTimeInFunction}
//               disabled={timeInProcessing}
//             >
//               {timeInProcessing ? "Processing..." : timeInStatus}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// ApprovedExeat.propTypes = {
//   id: PropTypes.string.isRequired,
//   driver_name: PropTypes.string.isRequired,
//   vehicle_no: PropTypes.string.isRequired,
//   profilePic: PropTypes.string.isRequired,
//   time_logged: PropTypes.string.isRequired,
//   destination: PropTypes.string.isRequired,
//   accomp_staff_name: PropTypes.string.isRequired,
//   recordTimeIn: PropTypes.func.isRequired,
//   recordTimeOut: PropTypes.func.isRequired,
//   timeInStatus: PropTypes.string,
//   timeOutStatus: PropTypes.string,
// };

import PropTypes from "prop-types";
import "../App.css";
import { useState, useEffect } from "react";

export default function ApprovedExeat({
  id,
  vehicle_no,
  driver_name,
  accomp_staff_name,
  time_logged,
  destination,
  profilePic,
  recordTimeIn,
  recordTimeOut,
  timeInStatus,
  timeOutStatus,
}) {
  const [timeInProcessing, setTimeInProcessing] = useState(false);
  const [timeOutProcessing, setTimeOutProcessing] = useState(false);

  const recordTimeInFunction = async () => {
    try {
      setTimeInProcessing(true);
      const date = new Date();
      const strTime = formatTime(date);
      await recordTimeIn(id, strTime);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeInProcessing(false);
    }
  };

  const recordTimeOutFunction = () => {
    try {
      setTimeOutProcessing(true);
      const date = new Date();
      const strTime = formatTime(date);
      recordTimeOut(id, strTime);
      setInterval(() => {
        setTimeOutProcessing(false);
      }, 1500);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeOutProcessing(false);
    }
  };

  const formatTime = (date) => {
    let hour = date.getHours();
    let minute = date.getMinutes();
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12;
    minute = minute < 10 ? "0" + minute : minute;
    return hour + ":" + minute + " " + ampm;
  };

  useEffect(() => {
    console.log("TimeIn processing state changed:", timeInProcessing);
  }, [timeInProcessing]);

  useEffect(() => {
    console.log("TimeOut processing state changed:", timeOutProcessing);
  }, [timeOutProcessing]);

  return (
    <div
      id={id}
      className="mt-3 p-3"
      style={{
        border: "1px solid var(--orange)",
        borderRadius: "5px",
        marginBottom: "1rem",
        width: "100%",
      }}
    >
      <div className="d-flex flex-row align-items-center justify-content-between">
        <div className="d-flex flex-row align-items-center exeat">
          <div className="">
            <img
              src={profilePic}
              alt="Profile Picture"
              className=" profile-picture img-fluid rounded-circle"
            />
          </div>
          <div>
            <p className="mb-0 exeat-info">
              <span
                style={{
                  fontWeight: "lighter",
                  color: "var(--green)",
                  marginRight: "0.5rem",
                  fontSize: "0.8rem",
                }}
              >
                Driver:{" "}
              </span>
              {driver_name}
            </p>
            <p className="mb-0 exeat-info">
              <span
                style={{
                  fontWeight: "lighter",
                  color: "var(--orange)",
                  marginRight: "0.5rem",
                  fontSize: "0.8rem",
                }}
              >
                Accomp. Staff:{" "}
              </span>
              {accomp_staff_name}
            </p>
            <p className="mb-0 exeat-info">
              <span
                style={{
                  fontWeight: "lighter",
                  color: "var(--green)",
                  marginRight: "0.5rem",
                  fontSize: "0.8rem",
                }}
              >
                Vehicle No:{" "}
              </span>
              {vehicle_no}
            </p>
            <p className="mb-0 exeat-info">
              <span
                style={{
                  fontWeight: "lighter",
                  color: "var(--orange)",
                  marginRight: "0.5rem",
                  fontSize: "0.8rem",
                }}
              >
                Destination:{" "}
              </span>
              {destination}
            </p>
            <p className="mb-0 exeat-info">
              <span
                style={{
                  fontWeight: "lighter",
                  color: "var(--green)",
                  marginRight: "0.5rem",
                  fontSize: "0.8rem",
                }}
              >
                Time Logged:{" "}
              </span>
              {time_logged}
            </p>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-between">
          <div className="d-flex flex-row align-items-start">
            <p
              className="exeat-info d-inline-block w-30"
              style={{ marginRight: "0.5rem" }}
            >
              Time Out:
            </p>
            <button
              className="btn timeOut-btn mb-3 w-70"
              onClick={recordTimeOutFunction}
              disabled={timeOutProcessing || !recordTimeOut}
            >
              {(timeOutProcessing && "Processing...") || timeOutStatus}
            </button>
          </div>
          <div className="d-flex flex-row align-items-start gap-2">
            <p className="exeat-info w-30"> Time In:</p>
            <button
              className="btn timeIn-btn w-70"
              onClick={recordTimeInFunction}
              disabled={timeInProcessing || !recordTimeIn}
            >
              {(timeInProcessing && "Processing...") || timeInStatus}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ApprovedExeat.propTypes = {
  id: PropTypes.string.isRequired,
  driver_name: PropTypes.string.isRequired,
  vehicle_no: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired,
  time_logged: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  accomp_staff_name: PropTypes.string.isRequired,
  recordTimeIn: PropTypes.func,
  recordTimeOut: PropTypes.func,
  timeInStatus: PropTypes.string,
  timeOutStatus: PropTypes.string,
};
