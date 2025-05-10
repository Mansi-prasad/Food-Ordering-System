import mongoose from "mongoose";
export const connectDB = async () => {
  await mongoose

    .connect(
      // mongodb connection url
      ""
    )
    .then(() => {
      console.log("DB Connected.");
    })
    .catch((err) => {
      console.log("An error occured!"); //! use any one of them
      console.error(err);
    });
};
