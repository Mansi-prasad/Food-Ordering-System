import React, { useState } from "react";
import "./AddUsers.css";
import axios from "axios";
import { toast } from "react-toastify";
const AddUsers = ({ url }) => {
  const [userdata, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    cartData: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    //set the name with targeted value with the previous data
    setUserData((data) => ({ ...data, [name]: value }));
  };
  //to check wether our data is getting updated.

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  //to make the api call

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Check if any field is missing
    if (!userdata.name || !userdata.email || !userdata.password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/user/addUsers`,
        {
          name: userdata.name,
          email: userdata.email,
          password: userdata.password,
        },
        {
          headers: { "Content-Type": "application/json" }, // Ensure proper headers
        }
      );

      if (response.data.success) {
        setUserData({ name: "", email: "", password: "" }); // Reset form
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error response:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };
  return (
    <div className="add">
      <form
        onSubmit={onSubmitHandler}
        encType="multipart/form-data"
        method="post"
        className="flex-col"
      >
        <div className="add-product-name flex-col">
          <p>User name</p>
          <input
            onChange={onChangeHandler}
            value={userdata.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-name flex-col">
          <p>User Email</p>
          <input
            onChange={onChangeHandler}
            value={userdata.email}
            type="email"
            name="email"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-name flex-col">
          <p>User Password</p>
          <input
            onChange={onChangeHandler}
            value={userdata.password}
            type="password"
            name="password"
            placeholder="Type here"
          />
        </div>
        <button type="submit" className="add-btn">
          ADD USER
        </button>
      </form>
    </div>
  );
};
export default AddUsers;
