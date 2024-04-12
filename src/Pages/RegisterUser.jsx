import "../App.css";
import { useState } from "react";
import logo from "/src/assets/carLogo.png";
import axios from "axios";

export default function RegisterUser() {
  const [Id_No, setId_No] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/register", {
        Id_No,
        email,
        name,
        password,
      })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column ">
      <img
        style={{ marginTop: "4rem" }}
        src={logo}
        id="logo"
        alt="Company Logo"
      />
      <h5 className="mb-4 d-inline-flex">Vehicle Management System ( VMS )</h5>

      <h5 className="mb-3" style={{ textDecoration: "underline" }}>
        Add Employee
      </h5>

      <form className="mb-3 text-center" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-4 formInput"
          placeholder="ID No."
          value={Id_No}
          onChange={(e) => setId_No(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-4 formInput"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="form-control mb-4 formInput"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-4 formInput"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-4 formInput"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </form>
      <button
        className="btn mb-4 align-text-center submit-btn-green"
        style={{ fontSize: "0.8rem" }}
        type="submit"
      >
        Register
      </button>
    </div>
  );
}
