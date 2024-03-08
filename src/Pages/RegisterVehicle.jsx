import React from "react";

export default function RegisterVehicle() {
  return (
    <div className="body-wrapper">
      <div className="container d-flex flex-column align-items-center justify-content-center">
        <h4 className="page-title">Register Vehicle</h4>
        <p className="mb-4 page-guide">Add a new vehicle to Samara Database</p>
        <form action="">
          <div className="d-flex flex-row justify-content-between align-items-center mb-4">
            <div className="registerInputCluster">
              <h6>Vehicle Type</h6>
              <select className="formInput" name="vehicleType" id="vehicleType">
                <option value="select" selected disabled>
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
              <h6>Make</h6>
              <input
                className="formInput"
                type="text"
                placeholder="Toyota, Mercedes, etc"
              />
            </div>
          </div>
          <div className="d-flex flex-row mb-4">
            <div className="registerInputCluster">
              <h6>Model</h6>
              <input
                className="formInput"
                type="text"
                placeholder="Hilux, Sprinter, Land Cruiser,  etc"
              />
            </div>
            <div>
              <h6>Vehicle Year</h6>
              <input
                className="formInput"
                type="text"
                placeholder="Year of  Manufacture"
              />
            </div>
          </div>

          <div className="d-flex flex-row mb-4">
            <div className="registerInputCluster">
              <h6>Registration Number</h6>
              <input
                className="formInput"
                type="text"
                placeholder="License plate number"
              />
            </div>
            <div>
              <h6>Chassis Number</h6>
              <input
                className="formInput"
                type="text"
                placeholder="Chassis Number"
              />
            </div>
          </div>
          <div className="d-flex justify-content-center mb-4">
            <div>
              <h6>Vehicle Color</h6>
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
