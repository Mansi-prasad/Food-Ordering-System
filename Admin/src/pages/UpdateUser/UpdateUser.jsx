import React, { useState, useEffect } from "react";
import "./UpdateUser.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cartData: {},
  });

  const url = `${import.meta.env.VITE_BACKEND_URL}`;

  useEffect(() => {
    const storedUser = localStorage.getItem("selectedUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Updating user with ID:", id);
    if (!id) {
      toast.error("User ID is missing!");
      return;
    }

    try {
      const response = await axios.put(
        `${url}/api/user/updateUsers/${id}`,
        {
          name: user.name,
          email: user.email,
          password: user.password,
          cartData: user.cartData,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        localStorage.removeItem("selectedUser");
        navigate("/listUsers");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating User:", error.response);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="update">
      <form onSubmit={handleSubmit} className="flex-col">
        <div className="update-product-name flex-col">
          <p>User's Name</p>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Type here"
          />
        </div>
        <div className="update-product-name flex-col">
          <p>User's Email</p>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Type here"
          />
        </div>
        <button type="submit" className="update-btn">
          UPDATE USER
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
