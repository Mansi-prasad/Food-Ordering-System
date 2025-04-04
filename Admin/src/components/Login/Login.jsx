import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { toast } from "react-toastify";
export const Login = ({ url, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(url + "/api/user/admin", {
        email,
        password,
      });
      // console.log(response);
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="login-popup">
      <form onSubmit={onSubmitHandler} className="login-popup-container">
        <div className="login-popup-title">
          <h2>Admin Panel</h2>
        </div>
        <div className="login-popup-inputs">
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Youremail@gmail.com"
            required
          />
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Your Password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
