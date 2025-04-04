import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [foodImage, setFoodImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    //set the name with targeted value with the previous data
    setData((data) => ({ ...data, [name]: value }));
  };
  //to check wether our data is getting updated.

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  //to make the api call

  const onSubmitHanler = async (event) => {
    //to prevent the page reload when we add the food data / form submit
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("foodImage", foodImage);
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      //reset the field values
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setFoodImage(false);
      toast.success(response.data.message);
    } else {
      //when food item will not added to the DB.
      toast.error(response.data.message);
    }
  };
  return (
    <div className="add">
      <form
        onSubmit={onSubmitHanler}
        encType="multipart/form-data"
        method="post"
        className="flex-col"
      >
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={
                foodImage ? URL.createObjectURL(foodImage) : assets.upload_area
              }
              alt=""
            />
          </label>
          <input
            onChange={(e) => setFoodImage(e.target.files[0])}
            type="file"
            name="foodImage"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write Content here..."
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category">
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
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              type="number"
              name="price"
              value={data.price}
              placeholder="RS  20"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};
export default Add;
//use react-tostify for notification.
