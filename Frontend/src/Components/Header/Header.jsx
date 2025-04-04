import React from "react";
import "./Header.css";
export function Header() {
  return (
    <div className="header">
      <div className="header-content">
        <h2>Order your favorite food here </h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingradients and culinary expertise.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
}
