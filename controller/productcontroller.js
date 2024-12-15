import Product from "../modules/product.js";
import { isadmin } from "./userController.js"; 


  export async  function createNewProduct(req,res){


    if(!isadmin(req)){//api dan user controller eke hadagaththa function eka check karnava  product eka create karanna yanne admin ekenekk nemeida kiyala
      res.json({//methanin check kare is admin function eka flase nam
        message : "Please login as administartor to add product"//nemei nam false
      })

      return
    }

try {

    const  createproduct =  await new Product(req.body);
   createproduct.save()
   res.json({
    message : " product created Succesfully"
   })

    
} catch (error) {

  res.json({
    message : "Error :" + error //api nitharama  "product not created vge eva noyava nitharam eroor msg ekk front end ekata yavnna oni "
  })
    
}

const  createproduct =  await new Product(req.body);

createproduct.save().then(()=>{

    res.json("product created successfully");

   }).catch((erorr)=>{

    res.json({
        message : "Erorr :" + erorr
    })

   })

   }


  export  async function getProduct(req,json){

try {

  const productlist = await  Product.find({name : req.body.name})
  res.json({
    list : productlist
  })
  
  
} catch (error) {

  res.json({
    message : "Error" + error
  })
  
}
 




   }
   



    




