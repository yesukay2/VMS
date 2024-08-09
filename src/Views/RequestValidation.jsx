import * as Yup from "yup";

const RequestValidation = (isDriverChangeChecked) =>
  Yup.object({
    vehicle_no: Yup.string("Vehicle registration plate is invalid")
      .matches(
        /^[A-Z]{2}-\d{1,4}-\d{2}$/,
        "Vehicle registration should be in the format AB-1234-24"
      )
      .required("Vehicle registration plate is required"),
    destination: Yup.string("Destination is invalid").required(
      "Destination is required"
    ),
    driver_id: Yup.string("ID No. must be a 4 digits number")
      .matches(/^\d{4}$/, "ID No. invalid")
      .when("isDriverChangeChecked", {
        is: true,
        then: (schema) => schema.required("ID No. is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    accomp_staff_id: Yup.string("ID No. must be a 4 digits number").matches(
      /^\d{4}$/,
      "ID No. invalid"
    ),
    purpose: Yup.string("Purpose is invalid").required("Purpose is required"),
    signatory: Yup.string("Signatory is invalid").required(
      "Signatory is required"
    ),
  });

export { RequestValidation };
