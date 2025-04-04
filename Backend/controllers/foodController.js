import mongoose from "mongoose";
import foodModel from "../models/food_model.js";
import fs from "fs";
//add food items
const addFood = async (req, res) => {
  console.log("File:", req.file);
  console.log("Body:", req.body);
  if (!req.file) {
    console.error("Multer did not process the file upload.");
    return res
      .status(400)
      .json({ success: false, message: "File upload failed" });
  }

  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    foodImage: image_filename,
  });
  try {
    //food item saved to the database.

    await food.save();
    // res.setHeader("Content-Type", "image/jpeg");
    res.json({ success: true, message: "Food Added Successfully!" });
  } catch (err) {
    console.log(err);
    res.status({ success: false, message: "ERROR! Failed to add food item" });
  }
};

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error! to get the food item" });
  }
};
// remove the food item from DB
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    //delete the food image
    fs.unlink(`uploads/${food.foodImage}`, () => {});

    //delete the food item data
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed from the DB" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error! to remove the food item" });
  }
};

// Update Food Item
const updateFood = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Food ID" });
    }

    const { name, price, description, category } = req.body;
    let foodData = { name, price, description, category };

    if (req.file) {
      foodData.foodImage = `${req.file.filename}`;
    }

    const updatedFood = await foodModel.findByIdAndUpdate(id, foodData, {
      new: true,
    });

    if (!updatedFood) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    res.json({ success: true, food: updatedFood });
  } catch (error) {
    console.error("Error updating food:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

export { addFood, listFood, removeFood, updateFood };
