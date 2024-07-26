import PropTypes from "prop-types";
import "../App.css";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { CiUser } from "react-icons/ci";
import { MdOutlineAccessTime } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { TbLocationQuestion } from "react-icons/tb";
import { AiOutlineCar } from "react-icons/ai";
import { FaFileSignature } from "react-icons/fa6";
import { FaRegDotCircle } from "react-icons/fa";

export default function Exeat({
  driverId,
  vehicleNo,
  driverName,
  profilePic,
  accompStaffName,
  accompStaffId,
  destination,
  purpose,
  timeLogged,
  status,
}) {
  return (
    <div className="exeat-card">
      <div className="card p-3" style={{ borderColor: "var(--orange)" }}>
        <div className="d-flex justify-content-end align-items-right">
          <span
            style={{
              color: `${
                status == "Pending"
                  ? "gold"
                  : status == "Approved" || status == "Resolved"
                  ? "green"
                  : status == "Declined" || status == "Rejected"
                  ? "red"
                  : "black"
              } `,
            }}
          >
            <FaRegDotCircle />
          </span>
        </div>
        <img
          src={`http://localhost:3000/${profilePic}`}
          alt="profilePic"
          className="profilePic mb-3 img-fluid rounded-circle align-self-center"
          style={{
            borderRadius: "5%",
            width: "10rem",
            height: "10rem",
            objectFit: "cover",
          }}
        />
        <div className="exeat-info">
          <div className="">
            <span className="exeat-icon">
              <CiUser />{" "}
            </span>
            {driverId
              ? `${driverId} - ${driverName ? driverName : "Void"}`
              : "N/A"}
          </div>
          <div className="exeat-time">
            <span className="exeat-icon">
              <MdOutlineAccessTime />{" "}
            </span>
            {timeLogged.substring(0, 10) + " " + timeLogged.substring(11, 20)}
          </div>
        </div>
        <div className="exeat-info">
          <div className="exeat-name">
            <span className="exeat-icon">
              <HiOutlineUserPlus />
            </span>
            {accompStaffId
              ? `${accompStaffId} - ${
                  accompStaffName ? accompStaffName : "Void"
                }`
              : "N/A"}
          </div>
          <div className="exeat-info">
            <span className="exeat-icon">
              <AiOutlineCar />
            </span>
            {vehicleNo ? vehicleNo : "N/A"}
          </div>
          <div className="exeat-time">
            <span className="exeat-icon">
              <CiLocationOn />{" "}
            </span>
            {destination ? destination : "N/A"}
          </div>
        </div>
        <div className="exeat-info">
          <div className="exeat-name">
            <span className="exeat-icon">
              <TbLocationQuestion />{" "}
            </span>
            {purpose ? purpose : "N/A"}
          </div>
        </div>
        <div className="exeat-info">
          <div className="exeat-name">
            <span className="exeat-icon">
              <FaFileSignature />{" "}
            </span>
            {status ? status : "N/A"}
          </div>
        </div>
      </div>
      {/* <hr className="w-100" style={{ color: "var(--orange)" }}></hr> */}
    </div>
  );
}

Exeat.propTypes = {
  driverId: PropTypes.string,
  accompStaffId: PropTypes.string,
  destination: PropTypes.string,
  purpose: PropTypes.string,
  timeLogged: PropTypes.string,
  vehicleNo: PropTypes.string,
  driverName: PropTypes.string,
  accompStaffName: PropTypes.string,
  status: PropTypes.string,
  profilePic: PropTypes.string,
};
