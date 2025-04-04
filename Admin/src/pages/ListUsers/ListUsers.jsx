import React, { useEffect, useState } from "react";
import "./ListUsers.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ListUsers = ({ url }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  // Fetch all Users
  const fetchUsersList = async () => {
    try {
      const response = await axios.get(`${url}/api/user/listUsers`);
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        toast.error("Error fetching Users list!");
      }
    } catch (error) {
      console.error("Error fetching User List:", error);
      toast.error("Server error! Please try again.");
    }
  };
  // Remove a Users
  const removeUser = async (userId) => {
    try {
      const response = await axios.post(`${url}/api/user/removeUsers`, {
        id: userId,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchUsersList(); // Refresh the User list after deletion
      } else {
        toast.error("Error removing User!");
      }
    } catch (error) {
      console.error("Error removing user:", error);
      toast.error("Server error! Please try again.");
    }
  };

  // Store selected food in localStorage and navigate to update page
  const handleUpdate = (userData) => {
    const updatedUser = {
      ...userData,
    };
    localStorage.setItem("selectedUser", JSON.stringify(updatedUser)); // Store data
    navigate(`/updateUsers/${userData._id}`); // Redirect to update page
  };

  useEffect(() => {
    fetchUsersList();
  }, []);
  return (
    <div className="list-add flex-col">
      <p className="listTitle">All Users List</p>
      <div className="list-table">
        <div className="Userlist-table-format title">
          <b>Name</b>
          <b>Email</b>
          {/* <b>Cart Data</b> */}
          <b>Delete</b>
          <b>Update</b>
        </div>
        {users.map((item, index) => (
          <div className="Userlist-table-format" key={index}>
            <p>{item.name}</p>
            <p>{item.email}</p>
            {/* <p>{JSON.stringify(item.cartData)}</p> */}
            {/* Product: {item.cartData.name} {item.cartData.price}{" "} */}
            <p className="cursor" onClick={() => removeUser(item._id)}>
              X
            </p>
            <button className="update-btn" onClick={() => handleUpdate(item)}>
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListUsers;
