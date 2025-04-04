import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false } // the cart data will not be created because the we are not provided any data here
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
