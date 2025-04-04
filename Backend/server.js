import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config"; //.env file will be imported
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoutes.js";
//app config
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors()); // enable access from backend to frontend

//DB Connection
connectDB();

app.use("/uploads", express.static("uploads"));

//API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API working... on  / ");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
