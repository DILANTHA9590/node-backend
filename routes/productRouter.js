import express from "express"


import { createNewProduct,getProduct } from "../controller/productcontroller.js"


const productRouter = express.Router();


productRouter.post("/",createNewProduct);

productRouter.get("/", getProduct);





export default productRouter