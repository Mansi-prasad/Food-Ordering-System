import React, { useContext, useState } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/FrontEnd/assets";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

// import { Toaster, toast } from 'sonner';

export const LoginPopUp = ({ setShowLogin }) => {
  const { url, token, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");

  const [data, setData] = useState({ name: "", email: "", password: "" });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const notify = () => toast("Wow so easy!");

  const onLogin = async (e) => {
    // to prevent the page reload after login/submitting data.
    e.preventDefault();
    console.log("onLogin function executed!");
    //make the api call
    let newUrl = url;
    // console.log(currS);

    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    try {
      const response = await axios.post(newUrl, data);


      if (response.data.success) {
        setToken(response.data.token);
        // storing the token in localStorage of browser, provided key-value pair.
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
        toast.success(
          currState === "Login"
            ? "Login Successful!"
            : "Registration Successful!"
        );
      }
    } catch (error) {
      console.log("Full Error Object:", error);
      console.log("Axios Error Response:", error.response);
      console.log("Axios Error:", error.response.data.message);

      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        if (Array.isArray(errorMessage)) {
          errorMessage.forEach((msg) => toast.error(msg));
        } else {
          // alert("check")
          toast.error(errorMessage); // Single error case
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  //for the varification purpose.
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              placeholder="Your Name"
              required
            />
          )}

          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            placeholder="Your Email"
            required
          />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            placeholder="Your Password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
        {/* <button onClick={()=>toast.success("hello")}>toast</button> */}
      </form>
    </div>
  );
};
