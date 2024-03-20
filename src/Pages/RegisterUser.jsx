import "../App.css";
import logo from "/src/assets/logo.png";

export default function RegisterUser() {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column ">
      <img className="mt-5" src={logo} id="logo" alt="Company Logo" />
      <h5 className="mb-0 d-inline-flex">Vehicle Management System ( VMS )</h5>

      <h5 className="mb-3 page-title" style={{ textDecoration: "underline" }}>
        Add User
      </h5>

      <form className="mb-3 text-center">
        <input
          type="email"
          className="form-control mb-4 formInput"
          placeholder="Email"
          // style={{ width: "400px" }}
          // value={}
          // onChange={(e) => setItem(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-4 formInput"
          placeholder="Password"
          // style={{ width: "400px" }}
          // value={}
          // onChange={(e) => setItem(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-4 formInput"
          placeholder="Confirm Password"
          // style={{ width: "400px" }}
          // value={}
          // onChange={(e) => setItem(e.target.value)}
        />
        <button
          // onClick={addItem}
          className="btn mb-4 align-text-center submit-btn-green"
          style={{ fontSize: "0.8rem" }}
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}
