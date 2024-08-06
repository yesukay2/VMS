import "../App.css";
import { useState, useEffect } from "react";
import ManageExeat from "../Components/ManageExeat.jsx";
import { Navigate } from "react-router-dom";
import protectedRoute from "../Utility/ProtectedRoute.js";
import axios from "axios";
import { Atom } from "react-loading-indicators";

const PUBLIC_VAPID_KEY =
  "BPi0KkQXj_Mdy3UaAghv6g3f8qoE1seZnr44CLFelwabDUcWNPsmy9TqFs5z-sOKoUO1qkz_cxVizDxCYNXcVCQ";

// const PRIVATE_VAPID_KEY = "p--tfWRT3ChCmerXa_bEGp_0_6C9nwh2fwwkyGHWEtM";

export default function ManagerDashboard() {
  const [manageExeatData, setManageExeatData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        setIsSubscribed(!!subscription);
      } catch (error) {
        console.error("Error checking subscription:", error);
      }
    };

    checkSubscription();
  }, []);

  const requestNotificationPermission = async () => {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) {
      console.error(
        "Notifications or Service Workers are not supported in this browser."
      );
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.error("Notification permission not granted.");
        return;
      }
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log(
              "Service Worker registered with scope:",
              registration.scope
            );
          })
          .catch((error) => {
            console.error("Service Worker registration failed:", error);
          });
      }
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY), // Convert VAPID key
      });

      await axios.post(
        "http://localhost:3000/vms/subscribe/store-subscription",
        { subscription }
      );
      setIsSubscribed(true);
    } catch (error) {
      console.error("Failed to subscribe the user: ", error);
    }
  };

  // Convert VAPID key to Uint8Array
  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [manageExeatData, employeeData]);

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
      {protectedRoute("Admin") ? (
        <>
          <div className="error-notification" id="badgeNotification"></div>
          <div className="success-notification" id="badgeNotification"></div>
          <div className="container body-wrapper">
            <h4 className="page-title d-flex justify-content-center align-items-center mt-5">
              Manager Dashboard
            </h4>
            <div className="notification">
              <button
                className="enableNotification"
                onClick={requestNotificationPermission}
                style={{
                  display: isSubscribed ? "none" : "block",
                }}
              >
                Enable Notification
              </button>
            </div>
            <h5 className="time-title mt-5">Logged Exeats</h5>
            {loading && (
              <div className="d-flex justify-content-around align-items-center text-center">
                <Atom
                  size={50}
                  color="var(--orange)"
                  text="Loading Exeats..."
                  textColor="var(--red)"
                />
              </div>
            )}
            <ul className="list-group list-unstyled" id="exeat-list">
              {manageExeatData.length > 0
                ? manageExeatData.map((exeat) => {
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
                  })
                : !loading &&
                  manageExeatData.length === 0 && (
                    <div className="text-center">No Exeats Logged!</div>
                  )}
            </ul>
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
