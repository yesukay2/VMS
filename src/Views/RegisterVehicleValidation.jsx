import * as Yup from "yup";

const RegisterVehicleValidation = Yup.object().shape({
  vehicle_type: Yup.string("Vehicle type is invalid").required(
    "Vehicle type is required"
  ),
  model: Yup.string("Vehicle model is invalid").required(
    "Vehicle model is required"
  ),
  make_year: Yup.string("Vehicle make year is invalid")
    .matches(/^\d{4}$/, "Vehicle make year must be 4 digits")
    .required("Vehicle make year is required"),
  reg_no: Yup.string("Vehicle registration plate is invalid")
    .matches(
      /^[A-Z]{2}-\d{1,4}-\d{2}$/,
      "Vehicle registration should be in the format AB-1234-24"
    )
    .required("Vehicle registration plate is required"),
  make: Yup.string("Vehicle make is invalid").required(
    "Vehicle make is required"
  ),
  color: Yup.string("Vehicle color is invalid")
    .matches(/^[a-zA-Z\s]*$/, "Color invalid")
    .required("Vehicle color is required"),
  chassis_no: Yup.string("Chassis Number is invalid")
    .matches(/^\d{17}$/, "Chassis Number must be 17 digits")
    .required("Chassis Number is required"),
  parking_lot: Yup.string("Parking lot is invalid").required(
    "Parking lot is required"
  ),
});

export { RegisterVehicleValidation };
