import * as Yup from "yup";

const RegisterValidation = Yup.object({
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
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords don't match")
    .required("Confirm Password is required"),
  role: Yup.string().required("Role is required"),
  profilePic: Yup.string("Profile Picture is invalid").required(
    "Profile Picture is required"
  ),
});

export { RegisterValidation };
