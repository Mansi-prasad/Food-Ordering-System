import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB = async () => {
  const dbURL = process.env.DB_CON;
  await mongoose
    .connect(dbURL)
    .then(() => {
      console.log("DB Connected.");
    })
    .catch((err) => {
      console.log("An error occured!"); //! use any one of them
      console.error(err);
    });
};
