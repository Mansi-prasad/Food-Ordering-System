import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlaceOlder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
export const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const [buttonDisable, setButtonDisable] = useState(true);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    const namee = name;
    const valuee = value;

    setData((data) => ({ ...data, [namee]: valuee }));
    if (Object.keys(data).length) {
      setButtonDisable(false);
    }
  };

  const PlaceOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 30 + (getTotalCartAmount() * 5) / 100,
    };
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url); //redirecting the user
    } else {
      alert("something went wrong");
    }
  };

  const cashOnDelevery = async () => {
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 30 + (getTotalCartAmount() * 5) / 100,
    };
    let response = await axios.post(
      url + "/api/order/placeCashOnDelevery",
      orderData,
      {
        headers: { token },
      }
    );

    if (response.data.success) {
      // navigate("/ordermyorders");
      navigate("/myorders");
    } else {
      alert("something went wrong");
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form className="place-order" onSubmit={PlaceOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="First name"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            required
          />
          <input
            type="text"
            placeholder="Last name"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            required
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          required
        />
        <input
          type="text"
          placeholder="Street"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            placeholder="City"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            required
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="Zip code"
            name="zipCode"
            onChange={onChangeHandler}
            value={data.zipCode}
            required
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            required
          />
        </div>
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>Rs.{getTotalCartAmount() === 0 ? 0 : 30}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Tax(5% GST)</p>
              <p>
                Rs.
                {getTotalCartAmount() === 0
                  ? 0
                  : (getTotalCartAmount() * 5) / 100}
              </p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                Rs.{" "}
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() +
                    30 +
                    (getTotalCartAmount() * 5) / 100}
              </b>
            </div>
          </div>

          {buttonDisable == true ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <button style={{ backgroundColor: "gray" }} type="submit">
                PROCEED TO PAYMENT ONLINE
              </button>
              <button
                style={{ backgroundColor: "gray" }}
                onClick={cashOnDelevery}
                type="button"
              >
                CASH ON DELIVERY
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <button type="submit">PROCEED TO PAYMENT ONLINE</button>
              <button onClick={cashOnDelevery} type="button">
                CASH ON DELIVERY
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};
