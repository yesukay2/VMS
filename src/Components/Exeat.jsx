import PropTypes from "prop-types";
import "../App.css";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { CiUser } from "react-icons/ci";
import { MdOutlineAccessTime } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { TbLocationQuestion } from "react-icons/tb";
import { AiOutlineCar } from "react-icons/ai";

export default function Exeat({
  driverId,
  vehicleNo,
  driverName,
  accompStaffName,
  accompStaffId,
  destination,
  purpose,
  timeLogged,
}) {
  return (
    <div className="user-info">
      <div className="card p-3" style={{ borderColor: "var(--orange)" }}>
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
            {timeLogged.substring(0, 10) + " " + timeLogged.substring(11, 16)}
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
};
