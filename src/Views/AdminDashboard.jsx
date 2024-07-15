import { useState } from "react";
import { GrUserAdmin } from "react-icons/gr";
import RegisterVehicle from "./RegisterVehicle";
import SecurityDashboard from "./SecurityDashboard";
import RequestExeat from "./RequestExeat";
import ManagerDashboard from "./ManagerDashboard";
import AdminVehiclesPage from "./AdminVehiclesPage";
import RegisterUser from "./RegisterUser";
import Users from "./Users";
import { Navigate } from "react-router-dom";

const requireAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  return true;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("vehicles");

  const renderActiveTab = () => {
    if (activeTab === "registerUser") {
      return <RegisterUser />;
    } else if (activeTab === "manageExeat") {
      return <ManagerDashboard />;
    } else if (activeTab === "requestExeat") {
      return <RequestExeat />;
    } else if (activeTab === "managerDashboard") {
      return <ManagerDashboard />;
    } else if (activeTab === "approveExeat") {
      return <SecurityDashboard />;
    } else if (activeTab === "vehicles") {
      return <AdminVehiclesPage />;
    } else if (activeTab === "registerVehicle") {
      return <RegisterVehicle />;
    } else if (activeTab === "employees") {
      return <Users />;
    }
  };

  return (
    <>
      {requireAuth() ? (
        <div>
          <div className="d-flex flex-row">
            <div
              className="col-4"
              id="admin-dash-side-nav"
              style={{
                maxHeight: "100vh",
                width: "250px",
                overflowY: "auto",
                background: "var(--grey)",
                position: "fixed",
                padding: "1.5rem",
                borderRight: "1px solid var(--deep-orange)",
              }}
            >
              <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                <GrUserAdmin
                  color="var(--green)"
                  className="mb-3"
                  style={{
                    fontSize: "3rem",
                    background: "var(--white)",
                    borderRadius: "20%",
                    padding: "0.5rem",
                    border: "1px solid var(--green)",
                    alignContent: "center",
                  }}
                />
                <h6 className="d-inline-block align-text-center mb-2">
                  <span style={{ color: "var(--orange)" }}>Admin</span>
                </h6>
              </div>

              <div className="admin-dash-nav d-flex flex-column align-items-center justify-content-center gap-3 overflow-scroll">
                <hr
                  className="w-100"
                  style={{
                    color: "var(--orange)",
                    marginTop: "0",
                    marginBottom: "0",
                  }}
                ></hr>
                <a
                  href="#"
                  onClick={() => {
                    setActiveTab("vehicles");
                    renderActiveTab();
                  }}
                  className={`sideNav ${
                    activeTab == "vehicles" ? "sideNav-active" : ""
                  }`}
                  id="vehicles"
                >
                  Vehicles
                </a>
                <hr
                  className="w-100"
                  style={{
                    color: "var(--orange)",
                    marginTop: "0",
                    marginBottom: "0",
                  }}
                ></hr>
                <a
                  href="#"
                  onClick={() => {
                    setActiveTab("registerVehicle");
                    renderActiveTab();
                  }}
                  className={`sideNav ${
                    activeTab == "registerVehicle" ? "sideNav-active" : ""
                  }`}
                  id="registerVehicle"
                >
                  Register Vehicle
                </a>
                <hr
                  className="w-100"
                  style={{
                    color: "var(--orange)",
                    marginTop: "0",
                    marginBottom: "0",
                  }}
                ></hr>
                <a
                  href="#"
                  onClick={() => {
                    setActiveTab("requestExeat");
                    renderActiveTab();
                  }}
                  className={`sideNav ${
                    activeTab == "requestExeat" ? "sideNav-active" : ""
                  }`}
                  id="requestExeat"
                >
                  Request Exeat
                </a>
                <hr
                  className="w-100"
                  style={{
                    color: "var(--orange)",
                    marginTop: "0",
                    marginBottom: "0",
                  }}
                ></hr>
                <a
                  href="#"
                  onClick={() => {
                    setActiveTab("manageExeat");
                    renderActiveTab();
                  }}
                  className={`sideNav ${
                    activeTab == "manageExeat" ? "sideNav-active" : ""
                  }`}
                  id="manageExeat"
                >
                  Manage Exeat
                </a>
                <hr
                  className="w-100"
                  style={{
                    color: "var(--orange)",
                    marginTop: "0",
                    marginBottom: "0",
                  }}
                ></hr>
                {/* <a
                  href="#"
                  onClick={() => {
                    setActiveTab("approveExeat");
                    renderActiveTab();
                  }}
                  className={`sideNav ${
                    activeTab == "approveExeat" ? "sideNav-active" : ""
                  }`}
                  id="approvedExeat"
                >
                  Approved Exeat
                </a>
                <hr
                  className="w-100"
                  style={{
                    color: "var(--orange)",
                    marginTop: "0",
                    marginBottom: "0",
                  }}
                ></hr> */}
                <a
                  href="#"
                  onClick={() => {
                    setActiveTab("employees");
                    renderActiveTab();
                  }}
                  className={`sideNav ${
                    activeTab == "employees" ? "sideNav-active" : ""
                  }`}
                  id="employees"
                >
                  Employees
                </a>
                <hr
                  className="w-100"
                  style={{
                    color: "var(--orange)",
                    marginTop: "0",
                    marginBottom: "0",
                  }}
                ></hr>
                <a
                  href="#"
                  onClick={() => {
                    setActiveTab("registerUser");
                    renderActiveTab();
                  }}
                  className={`sideNav ${
                    activeTab == "registerUser" ? "sideNav-active" : ""
                  }`}
                  id="approvedExeat"
                  style={{ marginBottom: "5rem" }}
                >
                  Add User
                </a>
                <hr
                  className="w-100 mb-5"
                  style={{
                    color: "var(--orange)",
                    marginTop: "0",
                    marginBottom: "0",
                  }}
                ></hr>
              </div>
            </div>

            <div
              className="col-8"
              style={{
                marginLeft: "250px",
                height: "calc(100vh - 50px)",
                width: "calc(100% - 250px)",
                padding: "1.5rem",
                overflowY: "auto",
              }}
            >
              <div
                className="d-flex flex-column align-items-center justify-content-center col-12"
                id="adminContent"
              >
                {renderActiveTab()}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
