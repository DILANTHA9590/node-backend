import express from "express";
import { createOrder, getOrderList, getQuotes, updateOrder } from "../controller/orderController.js";


const orderRouter = express.Router();



orderRouter.post("/",createOrder);
orderRouter.get("/",getOrderList);
orderRouter.post("/quote",getQuotes);

orderRouter.put("/:orderId",updateOrder);


export default orderRouter
