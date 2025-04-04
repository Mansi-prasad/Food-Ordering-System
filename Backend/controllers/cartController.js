import userModel from "../models/userModel.js";
// add item to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId); 
    let cartData = await userData?.cartData;
    if (!cartData[req.body.itemId]) {
      //add item to the cart
      cartData[req.body.itemId] = 1;
    } else {
      //create a new entry
      //if cart id is available then increase.
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "ERROR!" });
  }
};

// remove items from user cart.
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Cart Item Removed Successfully!" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "ERROR!" });
  }
};
// fetch user cart data
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData?.cartData;
    res.json({ success: true, cartData });
  } catch (err) {
    console.log(err);
    res.json({ success: false, msg: "ERROR!" });
  }
};
export { addToCart, removeFromCart, getCart };
