import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../context/StoreContext";
import { FoodItem } from "../FoodItem/FoodItem";
export const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div className="food-display" id="food-display">
      <h2>Our Top dishes</h2>
      <div className="food-display-list">
        {/* {console.log(food_list)} */}

        {food_list.map((item, index) => {
          {
            // console.log(category, "|", item.category);
          }

          if (category === "All" || category === item.category) {
            // if (category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.foodImage}
              />
            );
          }
        })}
      </div>
    </div>
  );
};
