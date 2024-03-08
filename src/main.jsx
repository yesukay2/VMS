import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorPage from "./Pages/ErrorPage";
import LoginPage from "./Pages/LoginPage";
import AdminDashboard from "./Pages/AdminDashboard";
import ManagerDashboard from "./Pages/ManagerDashboard";
import SecurityDashboard from "./Pages/SecurityDashboard";
import RequestExeat from "./Pages/RequestExeat";
import RegisterVehicle from "./Pages/RegisterVehicle";
import ExeatsPage from "./Pages/ExeatsPage";
import VehiclesPage from "./Pages/VehiclesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "admin-dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "manager-dashboard",
        element: <ManagerDashboard />,
      },
      {
        path: "security-dashboard",
        element: <SecurityDashboard />,
      },
      {
        path: "request-exeat",
        element: <RequestExeat />,
      },
      {
        path: "register-vehicle",
        element: <RegisterVehicle />,
      },
      {
        path: "exeat-log",
        element: <ExeatsPage />,
      },
      {
        path: "vehicles",
        element: <VehiclesPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
