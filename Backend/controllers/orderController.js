import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//Stripe Node library provides convenient access to the Stripe API from applications written in server-side JavaScript.
//Collecting customer and payment information
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//placing user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  try {
    //creating new order
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    //saving order in the database.
    await newOrder.save();
    //reset or clear the users cart data
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    // Calculate subtotal (excluding delivery charge)
    const subtotal = req.body.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    // Calculate GST (5% on subtotal)
    const gstAmount = Math.round(subtotal * 0.05); // 5% GST

    // using the items (get from user) to create the line_items , necessary for the strip payment
    //create the payment link using stripe
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr", // !for indian stripe account
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Convert to paise
      },
      quantity: item.quantity,
    }));
    // Add GST as a separate line item
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "GST (5%)",
        },
        unit_amount: gstAmount * 100, // Convert to paise
      },
      quantity: 1,
    });

    // adding one mor entry which is delivery charges.
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery charges",
        },
        unit_amount: 30 * 100,
      },
      quantity: 1, // GST for always single charge
    });

    // create a session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });
    //sent the session to the response.
    res.json({ success: true, session_url: session.url });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "ERROR!" });
  }
};

const placeCashOnDelevery = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      paymentType: "CASH ON DELIVERY",
    });
    //saving order in the database.
    await newOrder.save();
    //reset or clear the users cart data
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    res.json({ success: true, message: "Order Successful" });
  } catch (error) {
    res.json({ success: false, msg: "error" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "not paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "error" });
  }
};

// user Orders for Frontend

const userOrder = async (req, res) => {
  try {
    const orders = await orderModel
      .find({
        userId: req.body.userId,
        $or: [
          { $and: [{ payment: true }, { paymentType: "ONLINE" }] },
          { paymentType: "CASH ON DELIVERY" },
        ],
      })
      .sort({ createdAt: 1 });

    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error occured" });
  }
};

//Listing orders for admin panel

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

//updating order status

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error occurred" });
  }
};

export {
  placeOrder,
  placeCashOnDelevery,
  verifyOrder,
  userOrder,
  listOrders,
  updateStatus,
};
