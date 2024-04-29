import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
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

const requireAuth = () => {
  const navigate = Navigate();
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/");
  }
  return <Outlet />;
};

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
        canActivate: [requireAuth],
      },
      {
        path: "manager-dashboard",
        element: <ManagerDashboard />,
        canActivate: [requireAuth],
      },
      {
        path: "security-dashboard",
        element: <SecurityDashboard />,
        canActivate: [requireAuth],
      },
      {
        path: "request-exeat",
        element: <RequestExeat />,
        canActivate: [requireAuth],
      },
      {
        path: "register-vehicle",
        element: <RegisterVehicle />,
        canActivate: [requireAuth],
      },
      {
        path: "exeat-log",
        element: <ExeatsPage />,
        canActivate: [requireAuth],
      },
      {
        path: "vehicles",
        element: <VehiclesPage />,
        canActivate: [requireAuth],
      },
      {
        path: "register-employee",
        element: <RegisterUser />,
        canActivate: [requireAuth],
      },
      {
        path: "employees",
        element: <Users />,
        canActivate: [requireAuth],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<LoginPage />} />
  </React.StrictMode>
);
