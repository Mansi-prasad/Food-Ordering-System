import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
// import { assets } from "../../assets/FrontEnd/assets";
import { assets } from "../../../assets/FrontEnd/assets";
import "./myOrders.css";
import axios from "axios";
export const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userOrders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
    // console.log(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);
  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p>Rs. {order.amount}</p>
              <p>Items: {order.items.length}</p>

              <p>
                <span>&#x25cf;</span>
                <b>{order.status}</b>
              </p>
              <button onClick={() => fetchOrders()}>Check Status</button>
              <p>Method : </p>
              {order.paymentType == "CASH ON DELIVERY" ? (
                <p style={{ color: "red" }}>{order.paymentType}</p>
              ) : (
                <p style={{ color: "green" }}>{order.paymentType}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
