// import React from "react";

export default function RegisterVehicle() {
  return (
    <div className="body-wrapper">
      <div className="container d-flex flex-column align-items-center justify-content-center">
        <h4 className="page-title">Register Vehicle</h4>
        <p className="mb-4 page-guide">Add a new vehicle to Samara Database</p>
        <form action="">
          <div className="d-flex mb-4 register-vehicle">
            <div className="registerInputCluster">
              <h6 className="form-label">Vehicle Type</h6>
              <select
                className="formInput"
                name="vehicleType"
                id="vehicleType"
                defaultValue="select"
              >
                <option value="select" disabled>
                  Select
                </option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Van">Van</option>
                <option value="Bus">Bus</option>
                <option value="Truck">Truck</option>
                <option value="PickUp">Pick-Up</option>
              </select>
            </div>
            <div>
              <h6 className="form-label">Make</h6>
              <input
                className="formInput"
                type="text"
                placeholder="Toyota, Mercedes, etc"
              />
            </div>
          </div>
          <div className="d-flex  mb-4 register-vehicle">
            <div className="registerInputCluster">
              <h6 className="form-label">Model</h6>
              <input
                className="formInput"
                type="text"
                placeholder="Hilux, Sprinter, Land Cruiser,  etc"
              />
            </div>
            <div>
              <h6 className="form-label">Vehicle Year</h6>
              <input
                className="formInput"
                type="text"
                placeholder="Year of  Manufacture"
              />
            </div>
          </div>

          <div className="d-flex mb-4 register-vehicle">
            <div className="registerInputCluster">
              <h6 className="form-label">Registration Number</h6>
              <input
                className="formInput"
                type="text"
                placeholder="License plate number"
              />
            </div>
            <div>
              <h6 className="form-label">Chassis Number</h6>
              <input
                className="formInput"
                type="text"
                placeholder="Chassis Number"
              />
            </div>
          </div>
          <div className="d-flex justify-content-center mb-4">
            <div>
              <h6 className="form-label">Vehicle Color</h6>
              <input
                className="formInput "
                type="text"
                placeholder="Vehicle Color"
              />
            </div>
          </div>
          <div className="d-flex justify-content-center mb-4">
            <button type="submit" className="btn submit-btn-green">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
