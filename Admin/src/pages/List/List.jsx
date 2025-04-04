import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const List = ({ url }) => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  // Fetch all food items
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching food list!");
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error("Server error! Please try again.");
    }
  };

  // Remove a food item
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodId,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // Refresh the list after deletion
      } else {
        toast.error("Error removing food item!");
      }
    } catch (error) {
      console.error("Error removing food:", error);
      toast.error("Server error! Please try again.");
    }
  };

  // Store selected food in localStorage and navigate to update page
  const handleUpdate = (food) => {
    const updatedFood = {
      ...food,
      foodImage: food.foodImage.startsWith("http")
        ? food.foodImage // If already a full URL, keep it
        : `${url}/images/${food.foodImage}`, // Otherwise, prepend base URL
    };

    localStorage.setItem("selectedFood", JSON.stringify(updatedFood)); // Store data
    navigate(`/update/${food._id}`); // Redirect to update page
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list-add flex-col">
      <p className="listTitle">All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Delete</b>
          <b>Update</b>
        </div>
        {list.map((item, index) => (
          <div className="list-table-format" key={index}>
            <img
              src={`${url}/images/${item.foodImage}`}
              alt={item.name}
              onError={(e) => (e.target.src = "default-image.jpg")}
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>Rs. {item.price}</p>
            <p className="cursor" onClick={() => removeFood(item._id)}>
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

export default List;
