import React from "react";
import "./Footer.css";
import { assets } from "../../assets/FrontEnd/assets";
export const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo" className="footer-logo" />
          <p>
            We offers fresh, delicious meals delivered straight to your
            doorstep. We prepare high-quality food with the finest ingredients,
            ensuring great taste and convenience. Browse our menu, place your
            order, and enjoy hassle-free dining anytime with Fast delivery,
            great flavors.
          </p>
          <div className="footer-social-items">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul className="unordered-list">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul className="unordered-list">
            <li>+91 9546489077</li>
            <li>contact@me.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2025 @ FoodHub.com -All Rights Reserved.
      </p>
    </div>
  );
};
