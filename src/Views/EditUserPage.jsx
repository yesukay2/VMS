import "../App.css";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import protectedRoute from "../Utility/ProtectedRoute";

const initialValues = {
  Id_No: "",
  name: "",
  email: "",
  role: "",
  password: "",
  confirmPassword: "",
  profilePic: "",
};

export default function EditUser() {
  const navigate = useNavigate();

  const { Id_No } = useParams();

  const [isInitialized, setIsInitialized] = useState(false);
  const [updateProfilePic, setUpdateProfilePic] = useState(null);
  const [image, setImage] = useState("");

  const EditValidation = Yup.object().shape({
    Id_No: Yup.string("ID No. must be a 4 digits number")
      .matches(/^\d{4}$/, "ID No. invalid")
      .required("ID No. is required"),
    name: Yup.string()
      .matches(/^[A-Za-z\s]{6,}$/, "Name is invalid")
      .required("Name is required"),
    email: Yup.string()
      .email("Email is invalid")
      .matches(
        /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)?@samaragroup\.net$/,
        "Email is invalid"
      )
      .required("Email is required"),
    role: Yup.string().required("Role is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .notRequired(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords don't match")
      .notRequired(),
    updateProfilePic: Yup.mixed().notRequired(),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: EditValidation,
    enableReinitialize: true,
    onSubmit: async (values) => {
      updateUserHandler(values);
    },
  });

  useEffect(() => {
    if (!isInitialized) {
      axios
        .get(`http://localhost:3000/vms/employee/get-user/${Id_No}`)
        .then((response) => {
          const user = response.data;
          formik.setValues({
            Id_No: user.Id_No,
            name: user.name,
            email: user.email,
            role: user.role,
          });
          setImage(user.profilePic);
          setIsInitialized(true);
        })
        .catch((error) => {
          handleApiError(error);
        });
    }
  }, [Id_No, isInitialized, formik]);

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

  const updateUserHandler = async (data) => {
    try {
      formik.setSubmitting(true);
      const formData = new FormData();
      formData.append("Id_No", data.Id_No);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("role", data.role);
      if (data.password) {
        formData.append("password", data.password);
      }
      if (data.updateProfilePic) {
        formData.append("profilePic", updateProfilePic);
      }
      await axios.put(
        `http://localhost:3000/vms/employee/update-user/${Id_No}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate("/employees");

      formik.resetForm();
      scrollTo(0, 0);
      const badgeNotification = document.getElementById("badgeNotification");
      badgeNotification.innerHTML = "User Updated Successfully!";
      badgeNotification.style.display = "block";
      setTimeout(() => {
        badgeNotification.style.display = "none";
      }, 3000);
    } catch (error) {
      handleApiError(error);
    } finally {
      formik.setSubmitting(false);
    }
  };
  const handleFileChange = (e) => {
    const file = e.currentTarget.files[0];
    setUpdateProfilePic(file);
    formik.setFieldValue("updateProfilePic", file);
  };

  return (
    <>
      {protectedRoute("Admin") ? (
        <>
          <div className="error-notification" id="badgeNotification"></div>
          <div
            className="d-flex justify-content-center align-items-center flex-column"
            style={{ marginTop: "8rem" }}
          >
            <h5 className="mb-1" style={{ textDecoration: "underline" }}>
              Edit User
            </h5>

            <form
              className="mb-3 text-center"
              encType="multipart/form-data"
              onSubmit={formik.handleSubmit}
            >
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
                type="text"
                name="role"
                className="form-control formInput"
                placeholder="Role"
                {...formik.getFieldProps("role")}
              />
              {formik.touched.role && formik.errors.role ? (
                <small className="error-message">{formik.errors.role}</small>
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

              <label htmlFor="updateProfilePic" className="d-flex mt-3 mb-1">
                <div style={{ fontSize: "0.7rem" }}>Change Profile Pic:</div>
              </label>
              <input
                type="file"
                id="updateProfilePic"
                name="updateProfilePic"
                accept="image/*"
                className="form-control formInput"
                onChange={handleFileChange}
                style={{ marginTop: "0rem" }}
              />
              {formik.touched.updateProfilePic &&
              formik.errors.updateProfilePic ? (
                <small className="error-message">
                  {formik.errors.updateProfilePic}
                </small>
              ) : null}

              {image ? (
                <img
                  src={`http://localhost:3000/${image}`}
                  alt="Profile Pic"
                  className="profile-picture"
                  style={{
                    width: "8rem",
                    height: "8rem",
                    objectFit: "cover",
                    margin: "1rem",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
              ) : null}

              <button
                className="btn mb-4 align-text-center submit-btn-green"
                style={{ fontSize: "0.8rem", display: "inline-block" }}
                type="submit"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Submitting..." : "Update"}
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
