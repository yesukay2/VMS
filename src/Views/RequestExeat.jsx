import "../App.css";
import { PiCarLight } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { IoPersonAddOutline } from "react-icons/io5";
import { GoGoal } from "react-icons/go";
import { MdOutlinePersonalInjury } from "react-icons/md";
import { PiSignatureLight } from "react-icons/pi";
import { useState } from "react";
import { Axios } from "axios";
import { Navigate } from "react-router-dom";

const requireAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  return true;
};

export default function RequestExeat() {
  const [formData, setFormData] = useState({
    vehicle_no: "",
    destination: "",
    driver_id: "",
    accomp_staff_id: "",
    purpose: "",
    signatory: "select",
  });
  const handleSubmit = () => {
    try {
      Axios.post(
        "http://localhost:3000/vms/request-exeat",
        { formData },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {requireAuth() ? (
        <div className="body-wrapper">
          <div className="container d-flex flex-column align-items-center justify-content-cennter">
            <h4 className="mb-1 page-title">New Exeat Request</h4>
            <form className="form-wrapper" onSubmit={handleSubmit}>
              <div className="mb-4 ">
                <h6>Vehicle Details</h6>
                <div className="mb-4 d-flex flex-row align-items-center">
                  <PiCarLight className="form-icon" />
                  <input
                    type="text"
                    placeholder="Vehicle Number"
                    className="requestformInput mb-0"
                    name="vehicleNumber"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        vehicleNumber: e.target.value,
                      });
                    }}
                    value={formData.vehicleNumber}
                    required
                  />
                </div>
                <p className="mb-0 mt-0 form-text"> Example: GT 1122 24</p>
              </div>

              <div className="mb-4 ">
                <h6>Destination</h6>
                <CiLocationOn className="form-icon" />
                <input
                  className="requestformInput"
                  type="text"
                  placeholder="Destination"
                  name="destination"
                  onChange={(e) => {
                    setFormData({ ...formData, destination: e.target.value });
                  }}
                  value={formData.destination}
                  required
                />
              </div>
              <div className="mb-4">
                <h6>Driver ID</h6>
                <MdOutlinePersonalInjury className="form-icon" />
                <input
                  className="requestformInput"
                  type="text"
                  placeholder="Staff ID"
                  name="driverId"
                  onChange={(e) => {
                    setFormData({ ...formData, driverId: e.target.value });
                  }}
                  value={formData.driverId}
                  required
                />
              </div>
              <div className="mb-4 ">
                <h6>Accompanying Staff ID</h6>
                <IoPersonAddOutline className="form-icon" />
                <input
                  className="requestformInput"
                  type="text"
                  placeholder="Staff ID"
                  name="accompStaffId"
                  onChange={(e) => {
                    setFormData({ ...formData, accompStaffId: e.target.value });
                  }}
                  value={formData.accompStaffId}
                  required
                />
              </div>
              <div className="mb-4">
                <h6>Purpose of trip</h6>
                <GoGoal className="form-icon" />
                <input
                  type="text"
                  placeholder="Specify purpose of trip"
                  id="tripPurposeInput"
                  className="requestformInput"
                  name="purpose"
                  onChange={(e) => {
                    setFormData({ ...formData, purpose: e.target.value });
                  }}
                  value={formData.purpose}
                  required
                />
              </div>
              <div className="mb-4 ">
                <h6>Signatory</h6>
                <PiSignatureLight className="form-icon" />
                <select
                  className="formInput requestformInput"
                  name="vehicleType"
                  id="vehicleType"
                  // defaultValue="select"
                  onChange={(e) => {
                    setFormData({ ...formData, signatory: e.target.value });
                  }}
                  value={formData.signatory}
                  required
                >
                  <option value="select" disabled>
                    Select
                  </option>
                  <option value="General Manager">General Manager</option>
                  <option value="Financial Controller">
                    Financial Controller
                  </option>
                  <option value="Human Resource Manager">
                    Human Resource Manager
                  </option>
                  <option value="Transport Officer">Transport Officer</option>
                  <option value="Foriegn Operations Manager">
                    Foriegn Operations Manager
                  </option>
                  <option value="IT Manager">IT Manager</option>
                  <option value="Executive Chairman">Executive Chairman</option>
                </select>
              </div>

              <div className="submit-btn-wrapper mt-5">
                <button type="submit" className="btn submit-btn-orange">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
