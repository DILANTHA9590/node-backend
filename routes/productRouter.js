import express from "express"


import { createNewProduct,deleteProduct,getProduct, updateProduct } from "../controller/productcontroller.js"


const productRouter = express.Router();


productRouter.post("/",createNewProduct);

productRouter.get("/", getProduct);

productRouter.delete("/:productId", deleteProduct);


productRouter.put("/:productId", updateProduct);





export default productRouter