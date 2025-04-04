import express from "express";
import {
  addFood,
  listFood,
  removeFood,
  updateFood,
} from "../controllers/foodController.js";
import multer from "multer";
import searchFoodController from "../controllers/searchFoodController.js";
import adminAuth from "../middleware/adminAuth.js"; // not used.
const foodRouter = express.Router();
//save image in to the upload folder
//image Storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  // destination: (req, file, cb) => {
  //   cb(null, "uploads");
  // }, // Ensure the folder exists
  // return a callback that rename the file(stored in uploads folder)
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
//storage configuration
const upload = multer({ storage: storage });
//upload food image
foodRouter.post("/add", upload.single("foodImage"), addFood);

//route to list all the food items
foodRouter.get("/list", listFood);
//route to remove the food item
foodRouter.post("/remove", removeFood);

// Update food item (PUT request)
foodRouter.put("/update/:id", upload.single("foodImage"), updateFood);

// route for search foods
foodRouter.post("/search", searchFoodController);
export default foodRouter;
