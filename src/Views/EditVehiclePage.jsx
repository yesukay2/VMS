// import React from "react";
import "../App.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { RegisterVehicleValidation } from "./RegisterVehicleValidation.jsx";
import axios from "axios";
import { useEffect, useState } from "react";

const initialValues = {
  vehicle_type: "",
  make: "",
  model: "",
  make_year: "",
  reg_no: "",
  chassis_no: "",
  color: "",
  parking_lot: "",
};

const requireAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  return true;
};

export default function EditVehicle() {
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);

  const { reg_no } = useParams();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RegisterVehicleValidation,
    onSubmit: async (values) => {
      updateVehicleHandler(values);
    },
  });

  useEffect(() => {
    !isInitialized &&
      axios
        .get(`http://localhost:3000/vms/vehicle/get-vehicle/${reg_no}`)
        .then((res) => {
          // console.log(res.data);
          formik.setValues({
            ...res.data,
          });
          setIsInitialized(true);
        })
        .catch((err) => {
          handleApiError(err);
        });
  }, [reg_no, formik, isInitialized]);

  const handleApiError = (error) => {
    scrollTo(0, 0);
    const badgeNotification = document.getElementById("badgeNotification");

    if (error.response) {
      const status = error.response.status;
      let errorMessage = "Something went wrong";

      if (status === 400) errorMessage = "Bad Request";
      else if (status === 409) errorMessage = "User already exists";
      else if (status === 500) errorMessage = "Server Error";
      else if (status === 503) errorMessage = "Service Unavailable";

      badgeNotification.innerHTML = errorMessage;
      badgeNotification.style.display = "block";
      setTimeout(() => {
        badgeNotification.style.display = "none";
      }, 3000);
    } else {
      badgeNotification.innerHTML = "Something went wrong";
      badgeNotification.style.display = "block";
      setTimeout(() => {
        badgeNotification.style.display = "none";
      }, 3000);
    }
  };

  const updateVehicleHandler = async (values) => {
    try {
      formik.setSubmitting(true);
      const response = await axios.put(
        `http://localhost:3000/vms/vehicle/update-vehicle/`,
        values
      );
      if (response.status === 200) {
        formik.setSubmitting(false);
        scrollTo(0, 0);
        const badgeNotification = document.getElementById("badgeNotification");
        badgeNotification.innerHTML = "Vehicle Updated Successfully!";
        badgeNotification.style.display = "block";
        setTimeout(() => {
          badgeNotification.style.display = "none";
        }, 3000);
        formik.resetForm();
      }
      history.back();
    } catch (error) {
      handleApiError(error);
    } finally {
      formik.setSubmitting(false);
    }
    formik.resetForm();
  };
  return (
    <>
      {requireAuth() ? (
        <>
          <div className="error-notification" id="badgeNotification"></div>
          <div className="body-wrapper">
            <div className="container d-flex flex-column align-items-center justify-content-center">
              <h4 className="page-title">Update Vehicle</h4>
              <form onSubmit={formik.handleSubmit}>
                <div className="d-flex mb-4 register-vehicle">
                  <div className="registerInputCluster">
                    <h6 className="form-label">Vehicle Type</h6>
                    <select
                      className="formInput form-control"
                      name="vehicle_type"
                      id="vehicleType"
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
                  <button
                    type="submit"
                    className="btn align-text-center submit-btn-green"
                    style={{ fontSize: "0.8rem" }}
                    disabled={formik.isSubmitting}
                  >
                    Update
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
