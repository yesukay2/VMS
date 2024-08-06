// import React from "react";
import "../App.css";
import { Navigate } from "react-router-dom";
import { useFormik } from "formik";
import { RegisterVehicleValidation } from "./RegisterVehicleValidation.jsx";
import axios from "axios";
import protectedRoute from "../Utility/ProtectedRoute.js";

const initialValues = {
  vehicle_type: "",
  make: "",
  model: "",
  make_year: "",
  reg_no: "",
  chassis_no: "",
  color: "",
  parking_lot: "",
  assigned_driver_id: "",
};

export default function RegisterVehicle() {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RegisterVehicleValidation,
    onSubmit: async (values) => {
      console.log(values);
      registerVehicle(values);
    },
  });

  const registerVehicle = async (values) => {
    try {
      formik.setSubmitting(true);
      const response = await axios.post(
        "http://localhost:3000/vms/vehicle/register-vehicle",
        values
      );
      if (response.status === 200) {
        formik.setSubmitting(false);
        scrollTo(0, 0);
        const badgeNotification = document.getElementById("badgeNotification");
        badgeNotification.innerHTML = "Vehicle Added Successfully!";
        badgeNotification.style.display = "block";
        setTimeout(() => {
          badgeNotification.style.display = "none";
        }, 3000);
        formik.resetForm();
      }
    } catch (error) {
      error;
      const badgeNotification = document.getElementById("badgeNotification");
      if (error.response.status == 400) {
        badgeNotification.innerHTML = "Bad Request";
        badgeNotification.style.display = "block";
        setTimeout(() => {
          badgeNotification.style.display = "none";
        }, 3000);
        formik.setSubmitting(false);
      } else if (error.response.status == 409) {
        badgeNotification.innerHTML = "Vehicle already exists";
        badgeNotification.style.display = "block";
        setTimeout(() => {
          badgeNotification.style.display = "none";
        }, 3000);
        formik.setSubmitting(false);
      } else if (error.response.status == 500) {
        badgeNotification.innerHTML = "Server Error";
        badgeNotification.style.display = "block";
        setTimeout(() => {
          badgeNotification.style.display = "none";
        }, 3000);
        formik.setSubmitting(false);
      } else if (error.response.status == 503) {
        badgeNotification.innerHTML = "Service Unavailable";
        badgeNotification.style.display = "block";
        setTimeout(() => {
          badgeNotification.style.display = "none";
        }, 3000);
        formik.setSubmitting(false);
      } else {
        badgeNotification.innerHTML = "Something went wrong";
        badgeNotification.style.display = "block";
        setTimeout(() => {
          badgeNotification.style.display = "none";
        }, 3000);
        formik.setSubmitting(false);
      }
    } finally {
      formik.setSubmitting(false);
    }
    formik.resetForm();
  };
  return (
    <>
      {protectedRoute("Admin") ? (
        <>
          <div className="error-notification" id="badgeNotification"></div>
          <div className="body-wrapper">
            <div className="container d-flex flex-column align-items-center justify-content-center">
              <h4 className="page-title">Register Vehicle</h4>
              <p className="mb-4 page-guide">
                Add a new vehicle to Samara Database
              </p>
              <form onSubmit={formik.handleSubmit}>
                <div className="d-flex mb-4 register-vehicle">
                  <div className="registerInputCluster">
                    <h6 className="form-label">Vehicle Type</h6>
                    <select
                      className="formInput form-control"
                      name="vehicle_type"
                      id="vehicleType"
                      // defaultValue="select"
                      {...formik.getFieldProps("vehicle_type")}
                    >
                      <option value="">Select</option>
                      <option value="SUV">SUV</option>
                      <option value="Sedan">Sedan</option>
                      <option value="Van">Van</option>
                      <option value="Bus">Bus</option>
                      <option value="Truck">Truck</option>
                      <option value="PickUp">Pick-Up</option>
                    </select>
                    {formik.touched.vehicle_type &&
                    formik.errors.vehicle_type ? (
                      <small className="error-message">
                        {formik.errors.vehicle_type}
                      </small>
                    ) : null}
                  </div>
                  <div>
                    <h6 className="form-label">Make</h6>
                    <input
                      className="formInput form-control"
                      name="make"
                      type="text"
                      placeholder="Toyota, Mercedes, etc"
                      {...formik.getFieldProps("make")}
                    />
                    {formik.touched.make && formik.errors.make ? (
                      <small className="error-message">
                        {formik.errors.make}
                      </small>
                    ) : null}
                  </div>
                </div>
                <div className="d-flex  mb-4 register-vehicle">
                  <div className="registerInputCluster">
                    <h6 className="form-label">Model</h6>
                    <input
                      className="formInput form-control"
                      name="model"
                      type="text"
                      placeholder="Hilux, Sprinter, Land Cruiser,  etc"
                      {...formik.getFieldProps("model")}
                    />
                    {formik.touched.model && formik.errors.model ? (
                      <small className="error-message">
                        {formik.errors.model}
                      </small>
                    ) : null}
                  </div>
                  <div>
                    <h6 className="form-label">Vehicle Year</h6>
                    <input
                      className="formInput form-control"
                      name="make_year"
                      type="text"
                      placeholder="Year of  Manufacture"
                      {...formik.getFieldProps("make_year")}
                    />
                    {formik.touched.make_year && formik.errors.make_year ? (
                      <small className="error-message">
                        {formik.errors.make_year}
                      </small>
                    ) : null}
                  </div>
                </div>

                <div className="d-flex mb-4 register-vehicle">
                  <div className="registerInputCluster">
                    <h6 className="form-label">Registration Number</h6>
                    <input
                      className="formInput form-control"
                      name="reg_no"
                      type="text"
                      placeholder="License plate number"
                      {...formik.getFieldProps("reg_no")}
                    />
                    {formik.touched.reg_no && formik.errors.reg_no ? (
                      <small className="error-message">
                        {formik.errors.reg_no}
                      </small>
                    ) : null}
                  </div>
                  <div>
                    <h6 className="form-label">Chassis Number</h6>
                    <input
                      className="formInput form-control"
                      name="chassis_no"
                      type="text"
                      placeholder="Chassis Number"
                      {...formik.getFieldProps("chassis_no")}
                    />
                    {formik.touched.chassis_no && formik.errors.chassis_no ? (
                      <small className="error-message">
                        {formik.errors.chassis_no}
                      </small>
                    ) : null}
                  </div>
                </div>
                <div className="d-flex justify-content-center mb-4">
                  <div>
                    <h6 className="form-label">Vehicle Color</h6>
                    <input
                      className="formInput form-control "
                      name="color"
                      type="text"
                      placeholder="Vehicle Color"
                      {...formik.getFieldProps("color")}
                    />
                    {formik.touched.color && formik.errors.color ? (
                      <small className="error-message">
                        {formik.errors.color}
                      </small>
                    ) : null}
                  </div>
                  <div className="registerInputCluster">
                    <h6 className="form-label">Parking Lot</h6>
                    <select
                      className="formInput form-control"
                      name="parking_lot"
                      id="parking_lot"
                      // defaultValue="select"
                      {...formik.getFieldProps("parking_lot")}
                    >
                      <option value="">Select</option>
                      <option value="Headquaters">Headquaters</option>
                      <option value="Kel Office">Kel Office</option>
                    </select>
                    {formik.touched.parking_lot && formik.errors.parking_lot ? (
                      <small className="error-message">
                        {formik.errors.parking_lot}
                      </small>
                    ) : null}
                  </div>
                </div>
                <div className="d-flex justify-content-center mb-4">
                  <input
                    type="text"
                    name="assigned_driver_id"
                    placeholder="Assigned Driver ID"
                    className="formInput form-control"
                    {...formik.getFieldProps("assigned_driver_id")}
                  />
                  {formik.touched.assigned_driver_id &&
                  formik.errors.assigned_driver_id ? (
                    <small className="error-message">
                      {formik.errors.assigned_driver_id}
                    </small>
                  ) : null}
                </div>
                <div className="d-flex justify-content-center mb-4">
                  <button
                    type="submit"
                    className="btn align-text-center submit-btn-green"
                    style={{ fontSize: "0.8rem" }}
                    disabled={formik.isSubmitting}
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
}
