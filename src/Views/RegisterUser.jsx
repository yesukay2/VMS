// import React from "react";
import "../App.css";
import axios from "axios";
import { useFormik } from "formik";
import { RegisterValidation } from "./RegisterValidation.jsx";
import { Navigate } from "react-router-dom";

const initialValues = {
  Id_No: "",
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  profilePic: "",
};

const requireAuth = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export default function RegisterUser() {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RegisterValidation,
    onSubmit: async (values) => {
      registerEmployee(values);
    },
  });

  const registerEmployee = async (data) => {
    try {
      formik.setSubmitting(true);
      const formData = new FormData();
      formData.append("Id_No", data.Id_No);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      formData.append("role", data.role);
      if (data.profilePic) {
        formData.append("profilePic", data.profilePic);
      }

      const response = await axios.post(
        "http://localhost:3000/vms/employee/register-employee",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        formik.setSubmitting(false);
        scrollTo(0, 0);
        const badgeNotification = document.getElementById("badgeNotification");
        badgeNotification.innerHTML = "Employee Created Successfully!";
        badgeNotification.style.display = "block";
        setTimeout(() => {
          badgeNotification.style.display = "none";
        }, 3000);
        formik.resetForm();
      }
    } catch (error) {
      formik.setSubmitting(false);
      scrollTo(0, 0);

      const badgeNotification = document.getElementById("badgeNotification");
      if (error.response) {
        if (error.response.status === 400) {
          badgeNotification.innerHTML = "Bad Request";
        } else if (error.response.status === 409) {
          badgeNotification.innerHTML = "User already exists";
        } else if (error.response.status === 500) {
          badgeNotification.innerHTML = "Server Error";
        } else if (error.response.status === 503) {
          badgeNotification.innerHTML = "Service Unavailable";
        } else {
          badgeNotification.innerHTML = "Something went wrong";
        }
        badgeNotification.style.display = "block";
        setTimeout(() => {
          badgeNotification.style.display = "none";
        }, 3000);
      } else {
        console.error("Error:", error);
        badgeNotification.innerHTML = "Something went wrong";
        badgeNotification.style.display = "block";
        setTimeout(() => {
          badgeNotification.style.display = "none";
        }, 3000);
      }
    } finally {
      formik.setSubmitting(false);
    }
  };

  return (
    <>
      {requireAuth() ? (
        <>
          <div className="error-notification" id="badgeNotification"></div>
          <div
            className="d-flex justify-content-center align-items-center flex-column"
            style={{ top: "auto", marginTop: "8rem" }}
          >
            <h5 className="mb-1" style={{ textDecoration: "underline" }}>
              Register Employee
            </h5>

            <form
              className="mb-3 text-center"
              onSubmit={formik.handleSubmit}
              encType="multipart/form-data"
              style={{ height: "100%", overflow: "auto" }}
            >
              <select
                className="formInput form-control"
                name="role"
                id="role"
                // defaultValue="select"
                {...formik.getFieldProps("role")}
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Staff">Staff</option>
                <option value="Manager">Manager</option>
                <option value="Receptionist">Receptionist</option>
                <option value="Security">Security</option>
              </select>

              {formik.touched.role && formik.errors.role ? (
                <small className="error-message">{formik.errors.role}</small>
              ) : null}
              <input
                type="text"
                name="Id_No"
                className="form-control formInput"
                placeholder="ID No."
                {...formik.getFieldProps("Id_No")}
              />
              {formik.touched.Id_No && formik.errors.Id_No ? (
                <small className="error-message">{formik.errors.Id_No}</small>
              ) : null}

              <input
                type="text"
                name="name"
                className="form-control formInput"
                placeholder="Full Name"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <small className="error-message">{formik.errors.name}</small>
              ) : null}

              <input
                type="email"
                name="email"
                className="form-control formInput"
                placeholder="Email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <small className="error-message">{formik.errors.email}</small>
              ) : null}

              <input
                type="password"
                name="password"
                className="form-control formInput"
                placeholder="Password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <small className="error-message">
                  {formik.errors.password}
                </small>
              ) : null}

              <input
                type="password"
                name="confirmPassword"
                className="form-control formInput"
                placeholder="Confirm Password"
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <small className="error-message">
                  {formik.errors.confirmPassword}
                </small>
              ) : null}

              <label htmlFor="profilePic" className="d-flex mt-3 mb-1">
                <div style={{ fontSize: "0.7rem" }}>
                  Upload Profile Picture:
                </div>
              </label>
              <input
                type="file"
                id="profilePic"
                name="profilePic"
                accept="image/*"
                className="form-control formInput"
                onChange={(e) => {
                  formik.setFieldValue("profilePic", e.currentTarget.files[0]);
                }}
                style={{ marginTop: "0rem" }}
              />
              {formik.touched.profilePic && formik.errors.profilePic ? (
                <small className="error-message">
                  {formik.errors.profilePic}
                </small>
              ) : null}

              <button
                className="btn mb-4 align-text-center submit-btn-green"
                style={{ fontSize: "0.8rem", marginBottom: "5rem" }}
                type="submit"
                disabled={formik.isSubmitting}
              >
                Register
              </button>
            </form>
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
