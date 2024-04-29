import { Navigate } from "react-router-dom";
import "../App.css";
import logo from "/src/assets/carLogo.png";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const loginAction = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:3000/vms/login",
          { email, password },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.data.token);
          navigate("/request-exeat", { replace: true });
        });
    } catch (error) {
      console.log(error);
      if (error.response) {
        document.getElementById("badgeNotification").innerHTML =
          error.response.data.message;
        document.getElementById("badgeNotification").style.display = "block";
        setTimeout(() => {
          document.getElementById("badgeNotification").style.display = "none";
        }, 3000);
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      id="loginPage"
    >
      <div className="error-notification" id="badgeNotification"></div>
      <img src={logo} id="logo" alt="Company Logo" />
      <h5 className="mb-4">Vehicle Management System ( VMS )</h5>
      <h5 className="mb-3" style={{ textDecoration: "underline" }}>
        Sign In
      </h5>

      <form
        className="mb-3 text-center"
        id="loginForm"
        onSubmit={(e) => loginAction(e)}
      >
        <input
          type="email"
          className="form-control mb-4 formInput"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-4 formInput"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn align-text-center submit-btn-green"
          style={{ fontSize: "0.8rem" }}
          type="submit"
          disabled={email && password ? false : true}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
