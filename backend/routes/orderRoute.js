// import express from "express";


// const  orderRouter = express.Router();

// orderRouter.get("/allorders", getAllOrders);


// export default orderRouter;

import express from "express";
import authMiddleware from "../middleware/auth.js";      
import { placeOrder, verifyOrder, userOrders } from "../controllers/orderController.js";
import { getAllOrders } from "../controllers/orderController.js"; // ✅ Import function

const orderRouter = express.Router();

orderRouter.get("/allorders", getAllOrders);

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders",authMiddleware, userOrders)

export default orderRouter;
