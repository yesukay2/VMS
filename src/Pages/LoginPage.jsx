import "../App.css";
import logo from "/src/assets/carLogo.png";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      id="loginPage"
    >
      <img src={logo} id="logo" alt="Company Logo" />
      <h5 className="mb-4">Vehicle Management System ( VMS )</h5>
      <h5 className="mb-3" style={{ textDecoration: "underline" }}>
        Sign In
      </h5>

      <form className="mb-3 text-center">
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
      </form>
      <button
        // onClick={addItem}
        className="btn align-text-center submit-btn-green"
        style={{ fontSize: "0.8rem" }}
        type="submit"
      >
        Sign In
      </button>
    </div>
  );
}
