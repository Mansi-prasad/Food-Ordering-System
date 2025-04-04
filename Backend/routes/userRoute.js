import express from "express";
import {
  loginUser,
  registerUser,
  loginAdmin,
  addUsers,
  listUsers,
  UpdateUser,
  removeUsers,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", loginAdmin);
userRouter.post("/addUsers", addUsers);
userRouter.get("/listUsers", listUsers);
userRouter.put("/updateUsers/:id", UpdateUser);
userRouter.post("/removeUsers", removeUsers);

export default userRouter;
