import mongoose from "mongoose";
export const connectDB = async () => {
  await mongoose

    .connect(
      // project name--> FinalYearProject in mongodb atlas and the cluster-> FoodOrder, database-> foodorderdb, collection->foods
      "mongodb+srv://mansi111:mansi_647@foodorder.tlwgu.mongodb.net/foodorderDB?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("DB Connected.");
    })
    .catch((err) => {
      console.log("An error occured!"); //! use any one of them
      console.error(err);
    });
};
