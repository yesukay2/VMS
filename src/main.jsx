import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorPage from "./Views/ErrorPage";
import LoginPage from "./Views/LoginPage";
import AdminDashboard from "./Views/AdminDashboard";
import ManagerDashboard from "./Views/ManagerDashboard";
import SecurityDashboard from "./Views/SecurityDashboard";
import RequestExeat from "./Views/RequestExeat";
import RegisterVehicle from "./Views/RegisterVehicle";
import ExeatsPage from "./Views/ExeatsPage";
import VehiclesPage from "./Views/VehiclesPage";
import RegisterUser from "./Views/RegisterUser";
import Users from "./Views/Users";

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
      {
        path: "register-employee",
        element: <RegisterUser />,
      },
      {
        path: "employees",
        element: <Users />,
      },
      {
        path: "/edit-user/:Id_No",
        element: <RegisterUser />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<LoginPage />} />
  </React.StrictMode>
);
