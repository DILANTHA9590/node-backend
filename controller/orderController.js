
import Order from "../modules/order.js";
import { isadmin, isCustomer } from "./userController.js";
import Product from "../modules/product.js";



export async function createOrder(req,res){


    if(!isCustomer){
         return res.status(401).json({
            message : "Please login as administrator to create order"
         })
    }
    



    try {

        const latestOrder = await Order.find().sort
        ({date : -1}).limit(1)



       
        let orderId
        if(latestOrder.length==0){
            orderId ="cbc-0001"
        }

        else{

           
            const currentOrderId = latestOrder[0].orderId
          
           const numberString = currentOrderId.replace("CBC","") 
         
          const number =parseInt(numberString)


          const newNUmber = (number + 1).toString().padStart(4 , "0");


          orderId ="CBC" + newNUmber 


        }

       

        
    

        const newOrderData = req.body

        const newproductArrey = [];

       

        

        for(let i=0; i<newOrderData.orderedItems.length; i++){
           

            const product= await Product.findOne({
                productId : newOrderData.orderedItems[i].productId
            })


          
            if(product==null){

                console
               return res.status(404).json({
                    message : "product with id" + newOrderData.orderedItems[i].productId + " not found"
                })
            }


            newproductArrey[i] = {
                 productId : product.productId,
                name: product.productName,
                price : product.lastPrice,
                quantity : newOrderData.orderedItems[i].qty,
                image : product.images[0]


            }









        }

        



        newOrderData.orderedItems = newproductArrey



  


        newOrderData.orderId = orderId


        newOrderData.email = req.user.email
          const order = new Order(newOrderData)

        
         const saveOrder =   await order.save()
   
            res.status(200).json({
                message : "Order created",
             
                order :saveOrder
            })
   
          


        }


        

     




        


      
        
    catch (error) {

        res.status(500).json({

            message : error.message
        


        })
        
    }

}



export async function getOrderList(req,res){


  

    try {
      


        if(isCustomer(req)){
           
            console.log(req.user);
    
            const orders = await Order.find({email:req.user.email})
            
    
            res.status(200).json(orders);
            return;
    
        }
    
        else if(isadmin(req)){
            const orders = await Order.find({});
            res.status(200).json(orders);
        }
    
    
        else{
            res.status(401).json({
                message : "Please Login to view Order"
    
            })
        }
    
        
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }


}


export async function getQuotes(req,res){
    try {
        const newOrderData = req.body;
    
        const newProductArray = [];

console.log(req.body)
        let total =0;
        let labeldTotal =0;

    
        for (let i = 0; i < newOrderData.orderedItems.length; i++) {
            const product = await Product.findOne({
                productId: newOrderData.orderedItems[i].productId,
            });


            if (!product) {
                console.error(`Error: Product not found for ID ${newOrderData.orderedItems[i].productId}`);
                continue; // Skip this product and move to the next
            }
    
          

            labeldTotal+= product.price * newOrderData.orderedItems[i].qty

            total += product.lastPrice * newOrderData.orderedItems[i].qty

            newProductArray[i] = {
                name: product.productName,

               
                price: product.lastPrice,
                labeledPrice : product.price,

                quantity: newOrderData.orderedItems[i].qty,
                image: product.images[0],
            };
            
        }
            console.log(newProductArray);
            
            newOrderData.orderedItems = newProductArray;
            newOrderData.total = total;   
            
            res.json({

                orderedItems:newProductArray,
                total:total,
                labeldTotal:labeldTotal,

            });
        
        }catch(error){
            console.log(error);
            res.json({
                message : error.message
            });

        }
    }
        
        
    
//update notes and status
    export async function  updateOrder(req,res){
        if(!isadmin){
            return res.status(401).json({
                message : "Please login as admin to update order "
            })
        }

        try {
            const orderId = req.params.orderId;
            const order = await Order.findOne({
                orderId : orderId
            });

            if (order == null){
             return   res.status(404).json({
                    message:"Order Not Found"
                })
            }

            const notes = req.body.notes;
            const status = req.body.status;


            const updateOrder = await Order.findOneAndUpdate(
                {orderId:orderId},
                {notes:notes, status:status}

            );

            res.status(200).json({
                message : "Order updated"
            })
    
        } catch (error) {

            res.status(500).json({
                message : error.message
            })

          
            
        }

    }


    export async function  orderCount(req,res){

        let ordercount = await Order.find();

      ordercount =ordercount.length

        res.json({

            ordercount
        })


    }