import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name :String,
    count : Number,
    price : Number,
    detail : String,
})


const Product = mongoose.model("products",productSchema

)

export default Product;