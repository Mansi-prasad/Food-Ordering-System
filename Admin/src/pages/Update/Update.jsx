import React, { useState, useEffect } from "react";
import "./Update.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodImage, setFoodImage] = useState(null);
  const [food, setFood] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    foodImage: "",
  });
  const url =`${import.meta.env.VITE_BACKEND_URL}`; //  backend URL
  
  useEffect(() => {
    const storedFood = localStorage.getItem("selectedFood");
    if (storedFood) {
      const parsedFood = JSON.parse(storedFood);
      setFood(parsedFood);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFoodImage(files[0]); // Set selected file
    } else {
      setFood({ ...food, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", food.name);
    formData.append("price", food.price);
    formData.append("description", food.description);
    formData.append("category", food.category);

    if (foodImage) {
      formData.append("foodImage", foodImage);
    }

    try {
      const response = await axios.put(
        `${url}/api/food/update/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        localStorage.removeItem("selectedFood");
        navigate("/list");
        toast.success(response.data.message);
      } else {
        alert("Error updating food item.");
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating food:", error);
      alert("Error updating food item.");
    }
  };

  return (
    <div className="update">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="flex-col"
      >
        <div className="update-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={
                foodImage
                  ? URL.createObjectURL(foodImage) // Show selected image if user uploads new one
                  : food.foodImage // Show stored image
                  ? food.foodImage
                  : "default-image.jpg" // Fallback if no image
              }
              alt="Food Preview"
            />
          </label>
          <input
            type="file"
            name="foodImage"
            id="image"
            onChange={handleChange}
            hidden
          />
        </div>
        <div className="update-product-name flex-col">
          <p>Product name</p>
          <input
            type="text"
            name="name"
            value={food.name}
            onChange={handleChange}
            placeholder="Type here"
          />
        </div>
        <div className="update-product-description flex-col">
          <p>Product description</p>
          <textarea
            name="description"
            value={food.description}
            onChange={handleChange}
            rows="6"
            placeholder="Write Content here..."
          ></textarea>
        </div>
        <div className="update-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              name="category"
              value={food.category}
              onChange={handleChange}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="update-price flex-col">
            <p>Product price</p>
            <input
              type="number"
              name="price"
              value={food.price}
              onChange={handleChange}
              placeholder="RS 20"
            />
          </div>
        </div>
        <button type="submit" className="update-btn">
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default Update;
