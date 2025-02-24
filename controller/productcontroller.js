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


 

    // Create and save the new product
    const newProduct = new Product(req.body);
    await newProduct.save();

    // Respond with success
    res.json({
      message: "Product created successfully",
    });
  } catch (error) {
  

    
    res.status(403).json({
      message: "This product already exists "+error
 
    });
  }
}



 
  export  async function getProduct(req,res){

  

try {

  const productlist = await  Product.find({})
  res.json({
    list : productlist 
    
  })
  
  
} catch (error) {

  res.json({
    message : "Error" + error
  })
  
}
 




   }

 
    export async function deleteProduct(req,res){


    if(!isadmin(req)){

    return  res.status(403).json({
          message : " Please login as administartor to delete product "
     })

   }

    try {

       await Product.deleteOne({productId : req.params.productId});
      

       res.json({

        message : "product is deleted " +message.productId

     })
      
     } catch (error) {


     res.json({
        message : "product not found"
       })

     
      
    }

  }




export async function updateProduct(req,res){
  if(!isadmin){
    return res.status(403).json({

        message : " Please login as administrator to update product "

    })

    
  }

  try {

    const productId = req.params.productId
    const newProductData = req.body

    await Product.updateOne(
      {productId:productId},
      newProductData

    )

    res.json({
      message : "Product Updated Successfully"
    })
    
  } catch (error) {

    res.json({
      message: "Fail to update product"
    })
    
  }
}




export async function getProductById(req, res) {
  try {
    const productId = req.params.productId; // Get ID from request params
    console.log(productId);

    // Find product by `_id` instead of `productId`
    const product = await Product.findOne({ productId: productId });

    console.log(product);

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
}







export async function searchProduct(req,res){

  
  const query = req.params.query

  try {

    

  const products = await Product.find({
    $or: [
      { productName: { $regex: query, $options: "i" } },
      { altNames: { $elemMatch: { $regex: query, $options: "i" } } }
    ]
  });
  

   

  res.status(200).json(
    products
  )
    
  } catch (error) {

    res.status(500).json({
       e
    
    })
    
  }




}



export async function updateReviwes(req,res){

  const id = req.params.itemId
  const reviews = req.body.reviwes

  console.log(id);
  console.log(reviews);

  try {


    const product = await Product.findOne({ productId: id });
    console.log("getproduct",product);



   product.reviews.push(reviews);




   product.save();



  res.json({
    message : "Reviews upadated"
  })



 
    
  } catch (error) {



    res.json({
      message : error
    })


    
  }


  
 




 



  

}






export async function productCount(req, res) {

  try {
    let products = await Product.find(); 

    products = products.length
    console.log(products);
    

    res.status(200).json({

      products


  
    })
   
   
  } catch (error) {

    res.json({
      message : error
    })
    
  }
}

 
   

