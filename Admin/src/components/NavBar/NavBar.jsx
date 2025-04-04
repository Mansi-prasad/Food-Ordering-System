import React from "react";
import "./NavBar.css";
import { assets } from "../../assets/assets.js";
import { useNavigate } from "react-router-dom";

const NavBar = ({ setToken }) => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="" />
      {/* <img className="profile" src={assets.profile_image} alt="" /> */}
      <button
        onClick={() => {
          setToken("");
          navigate("/");
        }}
        className="logout-btn"
      >
        Logout
      </button>
    </div>
  );
};
export default NavBar;
