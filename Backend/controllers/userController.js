import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import mongoose from "mongoose";

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User doesn't exists" });
    }
    //password matching
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid password." });
    }
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "ERROR!" });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//Register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  let errors = [];
  // checking for user already exists or not.
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    // return res.status(400).json({
    //   success: false,
    //   message: "Email already exists! Please use a different email.",
    // });
    errors.push("Email already exists! Please use a different email.");
  }
  // Validating User's email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    // return res.status(400).json({
    //   success: false,
    //   message: "Invalid email format!",
    // });
    errors.push("Invalid email format!");
  }
  const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!passwordRegex.test(password)) {
    // return res.status(400).json({
    //   success: false,
    //   message:
    //     "Password must be at least 8 characters long and contain at least one special character (!@#$%^&*).",
    // });
    // console.log();

    errors.push(
      "Password must be at least 8 characters long and contain at least one special character (!@#$%^&*)."
    );
  }
  // If there are validation errors, return them
  if (errors.length > 0) {
    console.log("Validation Errors:", errors); // Backend Console Debugging
    return res.status(400).json({ success: false, message: errors }); // Sending array
  }
  try {
    // hashing the user password.
    //5-15 range
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    //take the user id and generate one token
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

// Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

//add Users
const addUsers = async (req, res) => {
  try {
    // Validate input
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }
    // Check if the email already exists in the database
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists!" });
    }
    //validating email formate
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Validate the Password (minimum 8 characters and one special character allowed)
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long and contain at least one special character (!@#$%^&*).",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new userModel({
      name,
      email,
      password: hashedPassword, // Store hashed password
    });

    // Save user to the database
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "User Added Successfully!" });
  } catch (err) {
    console.error("Error adding user:", err);
    res
      .status(500)
      .json({ success: false, message: "ERROR! Failed to Add User" });
  }
};

// all Users list
const listUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json({ success: true, data: users });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error! to get the Users" });
  }
};
// remove the Users from DB
const removeUsers = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.id);
    //delete the users data
    await userModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "User Removed from the DB" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error! to remove the user" });
  }
};

// Update Food Item
const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User ID" });
    }

    const { name, email, password, cartData } = req.body;
    let userData = { name, email, password, cartData };

    const updatedUser = await userModel.findByIdAndUpdate(id, userData, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, food: updatedUser });
  } catch (error) {
    console.error("Error updating food:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
export {
  loginUser,
  registerUser,
  loginAdmin,
  addUsers,
  listUsers,
  UpdateUser,
  removeUsers,
};
