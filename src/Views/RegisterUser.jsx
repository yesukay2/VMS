// import "../App.css";
// import axios from "axios";
// import { useFormik } from "formik";
// import { RegisterValidation } from "./RegisterValidation.jsx";
// import { Navigate } from "react-router-dom";

// const initialValues = {
//   Id_No: "",
//   name: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
//   role: "",
//   profilePic: "",
// };

// const requireAuth = () => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     return false;
//   }
//   return true;
// };

// export default function RegisterUser() {
//   const formik = useFormik({
//     initialValues: initialValues,
//     validationSchema: RegisterValidation,
//     onSubmit: async (values) => {
//       registerEmployee(values);
//     },
//   });

//   const registerEmployee = async (data) => {
//     try {
//       formik.setSubmitting(true);
//       await axios
//         .post("http://localhost:3000/vms/employee/register-employee", data, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "multipart/form-data",
//           },
//         })
//         .then(() => {
//           formik.setSubmitting(false);
//           scrollTo(0, 0);
//           const badgeNotification =
//             document.getElementById("badgeNotification");
//           badgeNotification.innerHTML = "Employee Created Successfully!";
//           badgeNotification.style.display = "block";
//           setTimeout(() => {
//             badgeNotification.style.display = "none";
//           }, 3000);
//           formik.resetForm();
//         });
//     } catch (error) {
//       formik.setSubmitting(false);
//       scrollTo(0, 0);

//       const badgeNotification = document.getElementById("badgeNotification");
//       if (error.response.status == 400) {
//         badgeNotification.innerHTML = "Bad Request";
//         badgeNotification.style.display = "block";
//         setTimeout(() => {
//           badgeNotification.style.display = "none";
//         }, 3000);
//         formik.setSubmitting(false);
//       } else if (error.response.status == 409) {
//         badgeNotification.innerHTML = "User already exists";
//         badgeNotification.style.display = "block";
//         setTimeout(() => {
//           badgeNotification.style.display = "none";
//         }, 3000);
//         formik.setSubmitting(false);
//       } else if (error.response.status == 500) {
//         badgeNotification.innerHTML = "Server Error";
//         badgeNotification.style.display = "block";
//         setTimeout(() => {
//           badgeNotification.style.display = "none";
//         }, 3000);
//         formik.setSubmitting(false);
//       } else if (error.response.status == 503) {
//         badgeNotification.innerHTML = "Service Unavailable";
//         badgeNotification.style.display = "block";
//         setTimeout(() => {
//           badgeNotification.style.display = "none";
//         }, 3000);
//         formik.setSubmitting(false);
//       } else {
//         badgeNotification.innerHTML = "Something went wrong";
//         badgeNotification.style.display = "block";
//         setTimeout(() => {
//           badgeNotification.style.display = "none";
//         }, 3000);
//         formik.setSubmitting(false);
//       }
//     } finally {
//       formik.setSubmitting(false);
//     }
//   };
//   return (
//     <>
//       {requireAuth() ? (
//         <>
//           <div className="error-notification" id="badgeNotification"></div>
//           <div
//             className="d-flex justify-content-center align-items-center flex-column"
//             style={{ top: "auto", marginTop: "8rem" }}
//           >
//             <h5 className="mb-1" style={{ textDecoration: "underline" }}>
//               Register Employee
//             </h5>

//             <form
//               className="mb-3 text-center"
//               onSubmit={formik.handleSubmit}
//               encType="multipart/form-data"
//             >
//               <input
//                 type="text"
//                 name="Id_No"
//                 className="form-control formInput"
//                 placeholder="ID No."
//                 {...formik.getFieldProps("Id_No")}
//               />

//               {formik.touched.Id_No && formik.errors.Id_No ? (
//                 <small className="error-message">{formik.errors.Id_No}</small>
//               ) : null}

//               <input
//                 type="text"
//                 name="name"
//                 className="form-control  formInput"
//                 placeholder="Full Name"
//                 {...formik.getFieldProps("name")}
//               />

//               {formik.touched.name && formik.errors.name ? (
//                 <small className="error-message">{formik.errors.name}</small>
//               ) : null}
//               <input
//                 type="text"
//                 name="role"
//                 className="form-control  formInput"
//                 placeholder="Role"
//                 {...formik.getFieldProps("role")}
//               />
//               {formik.touched.role && formik.errors.role ? (
//                 <small className="error-message">{formik.errors.role}</small>
//               ) : null}

//               <input
//                 type="email"
//                 name="email"
//                 className="form-control  formInput"
//                 placeholder="Email"
//                 {...formik.getFieldProps("email")}
//               />
//               {formik.touched.email && formik.errors.email ? (
//                 <small className="error-message">{formik.errors.email}</small>
//               ) : null}

//               <input
//                 type="password"
//                 name="password"
//                 className="form-control formInput"
//                 placeholder="Password"
//                 {...formik.getFieldProps("password")}
//               />

//               {formik.touched.password && formik.errors.password ? (
//                 <small className="error-message">
//                   {formik.errors.password}
//                 </small>
//               ) : null}
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 className="form-control formInput"
//                 placeholder="Confirm Password"
//                 {...formik.getFieldProps("confirmPassword")}
//               />
//               {formik.touched.confirmPassword &&
//               formik.errors.confirmPassword ? (
//                 <small className="error-message">
//                   {formik.errors.confirmPassword}
//                 </small>
//               ) : null}

//               <label htmlFor="profilePic" className="d-flex mt-3  mb-1">
//                 <div style={{ fontSize: "0.7rem" }}>
//                   Upload Profile Picture:
//                 </div>
//               </label>
//               <input
//                 type="file"
//                 id="profilePic"
//                 name="profilePic"
//                 accept="image/*"
//                 className="form-control formInput"
//                 onChange={(e) => {
//                   formik.setFieldValue("profilePic", e.currentTarget.files[0]);
//                 }}
//                 style={{ marginTop: "0rem" }}
//                 {...formik.getFieldProps("profilePic")}
//               />

//               {formik.touched.profilePic && formik.errors.profilePic ? (
//                 <small className="error-message">
//                   {formik.errors.profilePic}
//                 </small>
//               ) : null}
//               <button
//                 className="btn mb-4 align-text-center submit-btn-green"
//                 style={{ fontSize: "0.8rem" }}
//                 type="submit"
//                 disabled={formik.isSubmitting}
//               >
//                 Register
//               </button>
//             </form>
//           </div>
//         </>
//       ) : (
//         <Navigate to="/" />
//       )}
//     </>
//   );
// }

import "../App.css";
import axios from "axios";
import { useFormik } from "formik";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Yup from "yup";

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
  const { Id_No } = useParams();
  const isEditMode = !!Id_No;
  const [currentProfilePic, setCurrentProfilePic] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const RegisterValidation = Yup.object().shape({
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
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .when("isEditMode", {
        is: false,
        then: Yup.string().required("Password is required"),
        otherwise: Yup.string().notRequired(),
      }),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords don't match")
      .when("isEditMode", {
        is: false,
        then: Yup.string().required("Confirm Password is required"),
        otherwise: Yup.string().notRequired(),
      }),
    role: Yup.string().required("Role is required"),
    // profilePic: Yup.mixed().test(
    //   "required",
    //   "Profile Picture is required",
    //   function (value) {
    //     return isEditMode || value;
    //   }
    // ),
    profilePic: Yup.mixed().when("isEditMode", {
      is: true,
      then: Yup.mixed(),
      otherwise: Yup.mixed().required("Profile Picture is required"),
    }),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RegisterValidation,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log("submitting form");
      try {
        setSubmitting(true);
        const formData = new FormData();
        formData.append("Id_No", values.Id_No);
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("confirmPassword", values.confirmPassword);
        formData.append("role", values.role);
        if (values.profilePic) {
          formData.append("profilePic", values.profilePic);
        }

        if (isEditMode) {
          console.log("edit mode active");
          await axios.put(
            `http://localhost:3000/vms/employee/update-user/${Id_No}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else {
          await axios.post(
            "http://localhost:3000/vms/employee/register-employee",
            formData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }

        console.log("form submitted");
        resetForm();
        scrollTo(0, 0);
        const badgeNotification = document.getElementById("badgeNotification");
        badgeNotification.innerHTML = isEditMode
          ? "User Updated Successfully!"
          : "Employee Created Successfully!";
        badgeNotification.style.display = "block";
        setTimeout(() => {
          badgeNotification.style.display = "none";
        }, 3000);
      } catch (error) {
        handleApiError(error);
        console.error("Error submitting form:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (isEditMode && !isInitialized) {
      console.log("Fetching user data");
      axios
        .get(`http://localhost:3000/vms/employee/get-user/${Id_No}`)
        .then((response) => {
          const user = response.data;
          formik.setValues({
            Id_No: user.Id_No,
            name: user.name,
            email: user.email,
            role: user.role,
            profilePic: "",
          });
          setCurrentProfilePic(user.profilePic);
          setIsInitialized(true);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          handleApiError(error);
        });
    }
  }, [isEditMode, Id_No, isInitialized, formik]);

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
      console.error("Error registering employee:", error);
      badgeNotification.innerHTML = "Something went wrong";
      badgeNotification.style.display = "block";
      setTimeout(() => {
        badgeNotification.style.display = "none";
      }, 3000);
    }
  };

  return (
    <>
      {requireAuth() ? (
        <>
          <div className="error-notification" id="badgeNotification"></div>
          <div
            className="d-flex justify-content-center align-items-center flex-column"
            style={{ marginTop: "8rem" }}
          >
            <h5 className="mb-1" style={{ textDecoration: "underline" }}>
              {isEditMode ? "Edit User" : "Register Employee"}
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

              {isEditMode ? null : (
                <>
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
                </>
              )}

              <label htmlFor="profilePic" className="d-flex mt-3 mb-1">
                <div style={{ fontSize: "0.7rem" }}>
                  {isEditMode ? "Change Profile Pic:" : "Upload Profile Pic:"}
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
                {...formik.getFieldProps("profilePic")}
              />

              {currentProfilePic && (
                <div className="mb-3">
                  <img
                    src={`http://localhost:3000/${currentProfilePic}`}
                    alt="Current Profile Pic"
                    style={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "cover",
                      marginTop: "1rem",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              )}
              {formik.touched.profilePic && formik.errors.profilePic ? (
                <small className="error-message">
                  {formik.errors.profilePic}
                </small>
              ) : null}

              <button
                className="btn mb-4 align-text-center submit-btn-green"
                style={{ fontSize: "0.8rem" }}
                name="submit"
                value="submit"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting
                  ? "Submitting..."
                  : isEditMode
                  ? "Update"
                  : "Register"}
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
