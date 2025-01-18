import express from "express";
import { createOrder, getOrderList, getQuotes } from "../controller/orderController.js";


const orderRouter = express.Router();



orderRouter.post("/",createOrder);
orderRouter.get("/",getOrderList);
orderRouter.post("/quote",getQuotes);


export default orderRouter
