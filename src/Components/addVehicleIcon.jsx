// import React from "react";
import { FaCar } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";

const CarPlusIcon = () => {
  const iconStyle = {
    position: "relative",
    display: "inline-block",
    color: "#AD9415DD",
    cursor: "pointer",
    fontSize: "0.8rem",
  };

  const plusIconStyle = {
    position: "absolute",
    top: "-10px",
    right: "-10px",
    color: "gray",
    fontSize: "0.8rem",
    cursor: "pointer",
  };

  return (
    <div style={iconStyle}>
      <FaCar size={32} />
      <FaPlusCircle style={plusIconStyle} />
    </div>
  );
};

export default CarPlusIcon;
