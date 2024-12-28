import express from "express";
import { createOrder, getOrderList } from "../controller/orderController.js";


const orderRouter = express.Router();



orderRouter.post("/",createOrder);
orderRouter.get("/",getOrderList);


export default orderRouter
