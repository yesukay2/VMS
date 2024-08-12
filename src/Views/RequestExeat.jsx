import "../App.css";
import { PiCarLight } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { IoPersonAddOutline } from "react-icons/io5";
import { GoGoal } from "react-icons/go";
import { MdOutlinePersonalInjury } from "react-icons/md";
import { PiSignatureLight } from "react-icons/pi";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useFormik } from "formik";
import { RequestValidation } from "./RequestValidation.jsx";
import { useState, useEffect } from "react";
import protectedRoute from "../Utility/ProtectedRoute.js";

const initialValues = {
  vehicle_no: "",
  destination: "",
  driver_id: "",
  driver_name: "",
  accomp_staff_id: "",
  accomp_staff_name: "",
  purpose: "",
  signatory: "",
};

export default function RequestExeat() {
  const [StaffData, setStaffData] = useState([]);
  const [vehiclesData, setVehiclesData] = useState([]);
  const [isDriverChangeChecked, setIsDriverChangeChecked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const staffResponse = await axios.get(
          "http://localhost:3000/vms/employees"
        );
        const vehicleResponse = await axios.get(
          "http://localhost:3000/vms/vehicle/get-vehicles"
        );
        setStaffData(staffResponse.data);
        setVehiclesData(vehicleResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RequestValidation(isDriverChangeChecked),
    onSubmit: async (values) => {
      if (!isDriverChangeChecked) {
        const selectedVehicle = vehiclesData.find(
          (vehicle) => vehicle.reg_no === values.vehicle_no
        );
        if (selectedVehicle) {
          values.driver_id = selectedVehicle.assigned_driver_id;
        }
      }

      const selectedDriver = StaffData.find(
        (staff) => staff.Id_No === values.driver_id
      );
      if (selectedDriver) {
        values.driver_name = selectedDriver.name;
      }

      const selectedAccompStaff = StaffData.find(
        (staff) => staff.Id_No === values.accomp_staff_id
      );
      if (selectedAccompStaff) {
        values.accomp_staff_name = selectedAccompStaff.name;
      }

      requestExeat(values);
    },
  });

  useEffect(() => {
    if (formik.values.vehicle_no) {
      const selectedVehicle = vehiclesData.find(
        (vehicle) => vehicle.reg_no === formik.values.vehicle_no
      );
      if (selectedVehicle) {
        formik.setFieldValue("driver_id", selectedVehicle.assigned_driver_id);
      } else formik.setFieldValue("driver_id", "Null");
    }
  }, [formik.values.vehicle_no, vehiclesData]);

  const requestExeat = async (values) => {
    try {
      formik.setSubmitting(true);
      await axios.post("http://localhost:3000/vms/request-exeat", values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      scrollTo(0, 0);
      formik.resetForm();
      const badgeNotification = document.getElementById("badgeNotification");
      badgeNotification.innerHTML = "Request Added Successfully!";
      badgeNotification.style.display = "block";
      setTimeout(() => {
        badgeNotification.style.display = "none";
      }, 5000);
      formik.resetForm();
    } catch (error) {
      handleRequestError(error);
    } finally {
      formik.setSubmitting(false);
    }
  };

  const handleRequestError = (error) => {
    scrollTo(0, 0);
    const badgeNotification = document.getElementById("badgeNotification");
    let message = "Something went wrong";
    if (error.response) {
      if (error.response.status === 400) message = "Bad Request";
      else if (error.response.status === 500) message = "Server Error";
      else if (error.response.status === 503) message = "Service Unavailable";
    }
    badgeNotification.innerHTML = message;
    badgeNotification.style.display = "block";
    setTimeout(() => {
      badgeNotification.style.display = "none";
    }, 5000);
  };

  return (
    <>
      {protectedRoute("Receptionist") || protectedRoute("Admin") ? (
        <>
          <div className="error-notification" id="badgeNotification"></div>
          <div className="body-wrapper">
            <div className="container d-flex flex-column align-items-center justify-content-center">
              <h4 className="mb-3 page-title">New Exeat Request</h4>
              <form className="form-wrapper" onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <h6>Vehicle Details</h6>
                  <PiCarLight className="form-icon" />
                  <input
                    type="text"
                    placeholder="Vehicle Number"
                    className="requestformInput mb-0"
                    name="vehicle_no"
                    onFocus={() => formik.setFieldTouched("vehicle_no", true)}
                    {...formik.getFieldProps("vehicle_no")}
                  />
                  {formik.touched.vehicle_no && formik.errors.vehicle_no ? (
                    <small className="error-message">
                      {formik.errors.vehicle_no}
                    </small>
                  ) : null}
                </div>

                <div
                  className="d-flex gap-2"
                  style={{
                    border: "1px dashed red",
                    padding: "0.5rem",
                    marginBottom: "1rem",
                    borderRadius: "5px",
                    cursor: "pointer",
                    width: "fit-content",
                    alignItems: "center",
                    color: "var(--black)",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                  }}
                >
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="driverChangeCheckbox"
                    onChange={(e) => setIsDriverChangeChecked(e.target.checked)}
                  />
                  <label
                    className="form-check-label"
                    style={{
                      cursor: "pointer",
                      color: "var(--red)",
                      fontSize: "0.8rem",
                    }}
                    htmlFor="driverChangeCheckbox"
                  >
                    Change Driver
                  </label>
                </div>

                <div className="mb-4">
                  <h6>Driver ID</h6>
                  <MdOutlinePersonalInjury className="form-icon" />
                  <input
                    className="requestformInput"
                    type="text"
                    placeholder="Staff ID"
                    name="driver_id"
                    disabled={!isDriverChangeChecked}
                    onFocus={() => formik.setFieldTouched("driver_id", true)}
                    {...formik.getFieldProps("driver_id")}
                  />
                  {formik.touched.driver_id && formik.errors.driver_id ? (
                    <small className="error-message">
                      {formik.errors.driver_id}
                    </small>
                  ) : null}
                </div>
                <div className="mb-4">
                  <h6>Destination</h6>
                  <CiLocationOn className="form-icon" />
                  <input
                    className="requestformInput"
                    type="text"
                    placeholder="Destination"
                    name="destination"
                    onFocus={() => formik.setFieldTouched("destination", true)}
                    {...formik.getFieldProps("destination")}
                  />
                  {formik.touched.destination && formik.errors.destination ? (
                    <small className="error-message">
                      {formik.errors.destination}
                    </small>
                  ) : null}
                </div>

                <div className="mb-4">
                  <h6>Accompanying Staff ID</h6>
                  <IoPersonAddOutline className="form-icon" />
                  <input
                    className="requestformInput"
                    type="text"
                    placeholder="Staff ID"
                    name="accomp_staff_id"
                    onFocus={() =>
                      formik.setFieldTouched("accomp_staff_id", true)
                    }
                    {...formik.getFieldProps("accomp_staff_id")}
                  />
                  {formik.touched.accomp_staff_id &&
                  formik.errors.accomp_staff_id ? (
                    <small className="error-message">
                      {formik.errors.accomp_staff_id}
                    </small>
                  ) : null}
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
                    onFocus={() => formik.setFieldTouched("purpose", true)}
                    {...formik.getFieldProps("purpose")}
                  />
                  {formik.touched.purpose && formik.errors.purpose ? (
                    <small className="error-message">
                      {formik.errors.purpose}
                    </small>
                  ) : null}
                </div>

                <div className="mb-4">
                  <h6>Signatory</h6>
                  <PiSignatureLight className="form-icon" />
                  <select
                    className="formInput requestformInput"
                    name="signatory"
                    id="vehicleType"
                    onFocus={() => formik.setFieldTouched("signatory", true)}
                    {...formik.getFieldProps("signatory")}
                  >
                    <option value="">Select</option>
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
                    <option value="Marketing Manager">Marketing Manager</option>
                    <option value="Sales Manager">Sales Manager</option>
                    <option value="IT Manager">IT Manager</option>
                    <option value="Executive Chairman">
                      Executive Chairman
                    </option>
                  </select>
                  {formik.touched.signatory && formik.errors.signatory ? (
                    <small className="error-message">
                      {formik.errors.signatory}
                    </small>
                  ) : null}
                </div>

                <div className="submit-btn-wrapper mt-5">
                  <button type="submit" className="btn submit-btn-orange">
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
