import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/FrontEnd/assets";
("../../assets/FrontEnd/assets");
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
export const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = (e) => {
    localStorage.removeItem("token"); //key name
    setToken("");
    navigate("/");
  };
  return (
    <>
      <div className="navbar">
        <Link to="/">
          <img src={assets.logo} alt="logoImg" className="logo" />
        </Link>
        <ul className="nav-items">
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            Menu
          </a>
          <a
            href="#app-download"
            onClick={() => setMenu("mobileApp")}
            className={menu === "mobileApp" ? "active" : ""}
          >
            Mobile-app
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("contactUs")}
            className={menu === "contactUs" ? "active" : ""}
          >
            Contact Us
          </a>
        </ul>
        <div className="nav-right">
          <Link to="/search">
            <img src={assets.search_icon} alt="searchIcon" />
          </Link>
          <div className="nav-search-icon">
            <Link to="/cart">
              <img src={assets.basket_icon} alt="" />
            </Link>

            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
          {!token ? (
            <button className="signin-btn" onClick={() => setShowLogin(true)}>
              sign in
            </button>
          ) : (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate("/myorders")}>
                  <img src={assets.bag_icon} alt="" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
