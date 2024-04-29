import * as Yup from "yup";

const LoginValidation = Yup.object({
  email: Yup.string()
    .email("Email is invalid")
    .matches(
      /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)?@samaragroup\.net$/,
      "Email is invalid"
    )
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export { LoginValidation };
