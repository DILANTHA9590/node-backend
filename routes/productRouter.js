import express from "express"


import { createNewProduct,deleteProduct,getProduct, getProductById, productCount, searchProduct, updateProduct, updateReviwes } from "../controller/productcontroller.js"


const productRouter = express.Router();


productRouter.post("/",createNewProduct);

productRouter.get("/", getProduct);

productRouter.get("/productcount",productCount);
productRouter.get("/search/:query", searchProduct);



productRouter.get("/:productId", getProductById);

productRouter.delete("/:productId", deleteProduct);

productRouter.put("/reviwes/:itemId",updateReviwes);
 productRouter.put("/:productId", updateProduct);








export default productRouter