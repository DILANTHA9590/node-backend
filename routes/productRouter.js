import express from "express"


import { createNewProduct,deleteProduct,getProduct, getProductById, updateProduct } from "../controller/productcontroller.js"


const productRouter = express.Router();


productRouter.post("/",createNewProduct);

productRouter.get("/", getProduct);

productRouter.get("/:productId", getProductById);
productRouter.delete("/:productId", deleteProduct);


productRouter.put("/:productId", updateProduct);






export default productRouter