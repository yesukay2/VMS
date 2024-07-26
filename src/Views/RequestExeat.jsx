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
import { useState } from "react";
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
  const [StaffData, setStaffData] = useState();

  try {
    axios.get("http://localhost:3000/vms/employees").then((res) => {
      setStaffData(res.data);
    });
  } catch (error) {
    console.log(error);
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RequestValidation,
    onSubmit: async (values) => {
      values.driver_name = StaffData.find(
        (info) => values.driver_id == info.Id_No
      ).name;
      values.accomp_staff_name = StaffData.find(
        (info) => values.accomp_staff_id == info.Id_No
      ).name;

      requestExeat(values);
    },
  });
  const requestExeat = async (values) => {
    try {
      formik.setSubmitting(true);
      await axios
        .post("http://localhost:3000/vms/request-exeat", values, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          scrollTo(0, 0);
          const badgeNotification =
            document.getElementById("badgeNotification");
          badgeNotification.innerHTML = "Request Added Successfully!";
          badgeNotification.style.display = "block";
          setTimeout(() => {
            badgeNotification.style.display = "none";
          }, 5000);
          formik.resetForm();
        });
    } catch (error) {
      scrollTo(0, 0);
      const badgeNotification = document.getElementById("badgeNotification");
      if (error.response.status == 400) {
        badgeNotification.innerHTML = "Bad Request";
        badgeNotification.style.display = "block";
        setTimeout(() => {
          badgeNotification.style.display = "none";
        }, 5000);
        formik.setSubmitting(false);
      } else if (error.response.status == 500) {
        badgeNotification.innerHTML = "Server Error";
        badgeNotification.style.display = "block";
        setTimeout(() => {
          badgeNotification.style.display = "none";
        }, 5000);
        formik.setSubmitting(false);
      } else if (error.response.status == 503) {
        badgeNotification.innerHTML = "Service Unavailable";
        badgeNotification.style.display = "block";
        setTimeout(() => {
          badgeNotification.style.display = "none";
        }, 5000);
        formik.setSubmitting(false);
      } else {
        badgeNotification.innerHTML = "Something went wrong";
        badgeNotification.style.display = "block";
        setTimeout(() => {
          badgeNotification.style.display = "none";
        }, 5000);
        formik.setSubmitting(false);
      }
    } finally {
      formik.setSubmitting(false);
    }
    formik.resetForm();
  };
  return (
    <>
      {protectedRoute("Receptionist") || protectedRoute("Admin") ? (
        <>
          <div className="error-notification" id="badgeNotification"></div>
          <div className="body-wrapper">
            <div className="container d-flex flex-column align-items-center justify-content-cennter">
              <h4 className="mb-3 page-title">New Exeat Request</h4>
              <form className="form-wrapper" onSubmit={formik.handleSubmit}>
                <div className="mb-4 ">
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

                <div className="mb-4 ">
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
                  <h6>Driver ID</h6>
                  <MdOutlinePersonalInjury className="form-icon" />
                  <input
                    className="requestformInput"
                    type="text"
                    placeholder="Staff ID"
                    name="driver_id"
                    onFocus={() => formik.setFieldTouched("driver_id", true)}
                    {...formik.getFieldProps("driver_id")}
                  />
                  {formik.touched.driver_id && formik.errors.driver_id ? (
                    <small className="error-message">
                      {formik.errors.driver_id}
                    </small>
                  ) : null}
                </div>
                <div className="mb-4 ">
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
                <div className="mb-4 ">
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
