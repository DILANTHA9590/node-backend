import Product from "../modules/product.js";
import { isadmin } from "./userController.js"; 


export async function createNewProduct(req, res) {
  try {
    // Check if the user is an admin
    if (!isadmin(req)) {
      return res.json({
        message: "Please login as administrator to add product",
      });
    }

    // Check if the product already exists
    const productexist = await Product.findOne({ productId: req.body.productId });

    if (productexist) {
      return res.json({
        message: "This product already exists",
      });
    }

    // Create and save the new product
    const newProduct = new Product(req.body);
    await newProduct.save();

    // Respond with success
    res.json({
      message: "Product created successfully",
    });
  } catch (error) {
    // Catch and handle errors
    res.json({
      message: "Error: " + error.message,
    });
  }
}



 
  export  async function getProduct(req,res){

try {

  const productlist = await  Product.find({})//productList is an array because Product.find() 
  // in Mongoose returns an array of documents (even if it contains zero or one document). Here's how it works:
  res.json({
    list : productlist 
  })
  
  
} catch (error) {

  res.json({
    message : "Error" + error
  })
  
}
 




   }

 
  //  export async function deleteProduct(req,res){


  //   if(!isadmin(req)){

  //     res.json({
  //         message : " Please login as administartor to add product "
  //     })


  //     return
  //   }

  //   try {

  //     await Product.deleteOne({productId : req.body.productId});
      

  //     res.json({

  //       message : "product is deleted " +message.productId

  //     })
      
  //   } catch (error) {


  //     res.json({
  //        message : "product not found"
  //     })

     
      
  //   }

    























 
   

