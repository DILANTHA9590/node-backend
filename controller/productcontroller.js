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


  
    //apiata product id eka balala hadanna avshaya na mokada komoath id eka promary key eka ape 
    //api aye ekk add karath eka kohomath yanne catch block ekata habay yanne 200 e kiyanne ok 
    //api e nisa manuaklly vensa karanna oni 403 500 vge status eror4 vlata ethakota hari
    //nathtam front end eke try eka athulata thama meka yanne cartch ekata gihin erooor eka ahuvenne na
    //ethakota 200 neme yanne enisa apata message eka ganna puluvan
    // // Check if the product already exists
    // const productexist = await Product.findOne({ productId: req.body.productId });

    // if (productexist) {
    //   return res.json({
    //     message: "This product already exists",
    //   });
    // }

    // Create and save the new product
    const newProduct = new Product(req.body);
    await newProduct.save();

    // Respond with success
    res.json({
      message: "Product created successfully",
    });
  } catch (error) {
  

    // Catch and handle errors

    //apiata product id eka balala hadanna avshaya na mokada komoath id eka promary key eka ape 
    //api aye ekk add karath eka kohomath yanne catch block ekata habay yanne 200 e kiyanne ok 
    //api e nisa manuaklly vensa karanna oni 403 500 vge status eror4 vlata ethakota hari
    //nathtam front end eke try eka athulata thama meka yanne cartch ekata gihin erooor eka ahuvenne na
    //venne methgana status eka dala nathinisa meka kelinnama yavana front end eke try caTCH EKTH TRY EKATA
    ///API status eka dala thibbama eka 200 anthuva 403 erorr ekk vidihatra yanava eka allaganava front end catch eken

    // evagema loku loku project  if if if condtion dala  me vge error  ekk avoth api e ena error eka pilibadava
    //sampuranava vistharayk ho 
    //e eorr eka pilibadava status code eka  front end eka5ta yavana eka
    //ehema karanavanam eka mara quality
    res.status(403).json({
      message: "This product already exists "+error
 
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



//meka api token admin baklanne ana meka product ekata adala data tika ganna product overwiev ekata haduve
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



// api  metha na hadagannava search vena fucntion ekk podi vachana kallak avata passe search vena function ekk



export async function searchProduct(req,res){

  //api methanadi parameter valin pass vena search vennaoni de ganna oni
  // eya type karala thiuyenne mkona vage namakda/
  //kiyala query ekata thapa pass vela enne
  const query = req.params.query

  try {

    
// api  methana regex use karala thiyenne regex valin api karanne saralavama swtring ekkata string ekak smanda balana eka methan a nam 
//tha vidihatakata kiuvoth foramt ekkata thiyeda kiyala//eg vachana thiye formate ekka me vachanethiyeda kiyala 
// balanna thama me regex one meka loku padamak 
//ethakota methanadi ena query eka ape db eke prduct name ekata samanda kiyala balanava

// api  dan haduve product naeme eken gannavithrane dan api or dala kiyanava alt names valinuth gannakiyala
// or dapuvama apita kihimayak denna puluavamn ita passe api alt names valinuth hambunoth adala vachane ekenuth api agannava
//or dapuvama apta kihimayakma mehema check akraganna puluvan

  // const products = await Product.find({productName : {$regex :
  //   query, $options : "i"
 //me deken ekk hari giyoth eka apata denava
//  api mokk hri vachana kallak gahovoth names valata har altnames valata hari samana eka return karanava
  const products = await Product.find({
    $or: [
      { productName: { $regex: query, $options: "i" } },
      { altNames: { $elemMatch: { $regex: query, $options: "i" } } }
    ]
  });
  

    // me query eke ena vachana kalla product eke kohe hari thibboth ekia  ganna kiyala
// api  ala iriddeka gahuve wakye onima thanaka thiyenam eka galappala denna kioyala
// etha  kota api dena name eka thiyena onima thanak avada karanava eka api ain akra eka eya automa danava


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

 
   

