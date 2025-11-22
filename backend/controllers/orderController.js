
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Get all orders (Admin side)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ date: -1 }); // latest first
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Place order (no Stripe)
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      payment: false, // default payment status
    });

    await newOrder.save();

    // Clear user cart after placing order
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    res.json({
      success: true,
      message: "Order placed successfully",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Error placing order" });
  }
};

// Verify order (simulate payment result manually)
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment marked as successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed, order removed" });
    }
  } catch (error) {
    console.error("Error verifying order:", error);
    res.status(500).json({ success: false, message: "Error verifying order" });
  }
};

// Get user orders (Frontend side)
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId }).sort({ date: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Error fetching user orders" });
  }
};

export { placeOrder, verifyOrder, userOrders };
