import express from "express"


import { createNewProduct,deleteProduct,getProduct } from "../controller/productcontroller.js"


const productRouter = express.Router();


productRouter.post("/",createNewProduct);

productRouter.get("/", getProduct);

productRouter.delete("/:productId", deleteProduct);





export default productRouter