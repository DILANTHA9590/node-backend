
import Order from "../modules/order.js";
import { isCustomer } from "./userController.js";
import Product from "../modules/product.js";

//api me order details okkoma nikan eliyen dila iisella balala inna oni
//ita passe thama request eken ena user ge data aran meka creaaste vena hati balanmne


export async function createOrder(req,res){

    if(!isCustomer){
         return res.status(401).json({
            message : "Please login as administrator to create order"
         })
    }
    


//apita order keata number ekk dennanam apita kalin order eke number ekk denna vena ehema denna nam apita 
// anithimata thiyena order eke id eka  hoyaganna venava api order id eke denna inne mul tika cbc-001
//ethaikota apita sort karala ganna venava dan thiyena order tika abnthima order ek aganna nam eka karanne

    try {
//take latestproduct id
//mekata enne arrey ekk order list ekk thama mekata enne
        const latestOrder = await Order.find().sort//api methana okkoma order tika aragena sort karanna kiyala kiyanava sort karala thama latst id eka oyagannme
        ({date : -1}).limit(1)//metahandi apata last order eka ganna oni nisa date pavichi karanava mokada hama order ekktama date ekk thiyenava ({date: -1}) methadi
        //-1 duunoth avanata dipu order eke idala kalindapu ordr valata enne +1 eka dammoth kali dapu order vala idala avsnata order ekata enakn thamai enne 
        // apita oni mulima oni avsanata dapu eka e nisa  api -1 danava
        //me limit(1) meken venne apata enne arrey list ekk nam api eka eka item ekkata lomit karagannava api methana 10 dunnoth 10kata limit karaganna puluavan
        //ethakota methana limit ekkata limit karala nisa eka item ekai enne  arrey ekata 



        // nitharama methanata ennne latestproduct veriable kata enne arrey ekak api ilagata balanna oni ava order list eke data thiyenvda kiyala

        //check arrey is emty

        let orderId
        if(latestOrder.length==0){
            orderId ="cbc-0001"
        }

        else{

            //methanadi api db eken ena latestorder object arrey eke ena OrderId eka dagannav currentOrder 
            const currentOrderId = latestOrder[0].orderId
            // apiata dan id order id eken id ekata number eka venas venna oni ekata cbc-0002 meka
            //mehema thiyeddi me vde karanna ba ekata api eka extract karaganna oni meke cbc kalla ain kartaganna oni

           const numberString = currentOrderId.replace("CBC","") //methandi apita CBC ain vela number eka labenava eth number ekath t hama String
          //dan api eka number ekkata convert karagannava

          const number =parseInt(numberString)

        //   mekedi api karanne number ekkata 1ekk etthau karanava evgema item 4 enne oni mulata 0 daganna kiyala kiyanava

          const newNUmber = (number + 1).toString().padStart(4 , "0");


          orderId ="CBC" + newNUmber //itappse api hadagatththa no eka
          // eka orderid ekata samanakara


        }

        //ITAPASSE API REQ.BODY EKE ENA ORDERID EKATA
        //api genarate karapu order id eka pass karanav


        // mahala danata api karala thiyenne order eka req eke userge body eke ennea thama dala thiyenne
        //eka api danneth postman eike
        // name": "Moisturizing Hand Cream",
    //   "price": 12.5,
    //   "quantity": 1,
    //   "image": "https://example.com/images/handcream.jpg"

    // mehema ehema evana eka varadi mokada ehema karana ape db eke nathi order ekk unath apita dala evnna puluvan
    //eka nisa api product ekk evanakota evanna oni product id ekai ekai quantity ekai vitharai me vidahata



      /* {
            "productId": "p2345",
            "quantity": 2
            
          },
          {
              "productId" : "p12345",
              "quantity" : 7
          }

          meheama vama apita puluvan e product id ekata adala product eka thiyenavda kiyaklla pata code karala balala ita passe db eken 
          aran price vge deval daganna


          ehema euvama apta enne product id eke arrey ekk api eka methnadi thama convert karaganana oni me vidihata


        name": "Moisturizing Hand Cream",
       "price": 12.5,
       "quantity": 1,
       "image": "https://example.com/images/handcream.jpg"
          */

    

        const newOrderData = req.body

        const newproductArrey = [];

        // methandi req eke ena order item tika veribale ekkkata dagaththa
        // ita passe api evanne orded item arrey ekk eka thiyenne api evana postmanb eka athule
        //thiyena attribute ekakk methana krala thiyennde req eke body eka athule thiena orderd item 

        //arrey eka athule thiyena iutem tika ganna api arre6y eka execute karanava 

        

        for(let i=0; i<newOrderData.orderedItems.length; i++){
            // console.log(newOrderData.orderedItems[i]);
            // newOrderArrey[i] = newOrderData.orderedItems[i];////mehema dalath ba dan api iklagata me orderitems arrey eke eva tika
            // balanna oni database eke eke thiyena product valata samanada kiyala

            const product= await Product.findOne({
                productId : newOrderData.orderedItems[i].productId//api balanava orderf eke ena id ekai product db eke id ekai same dakiyala
            })


            // console.log(product);

//  api ilagata balanna oni producrt eka null da kiyala
            if(product==null){

                console
               return res.status(404).json({
                    message : "product with id" + newOrderData.orderedItems[i].productId + " not found"
                })
            }


            newproductArrey[i] = {
                name: product.productName,
                price : product.lastPrice,
                quantity : newOrderData.orderedItems[i].qty,
                image : product.images[0]


            }

    /* onna dan api name": "Moisturizing Hand Cream",
       "price": 12.5,
       "quantity": 1,
       "image": "https://example.com/images/handcream.jpg"

       product db eken ganna product id ekata adala visthtra tika api  api me vidihat aconvert karagaththa dan api eka api daganav orderidtems ekata  
       

*/








        }

        

        console.log(newproductArrey);

        newOrderData.orderedItems = newproductArrey



  


        newOrderData.orderId = orderId


        newOrderData.email = req.user.email//api new .email ekata samana kragannava req.user eke enne email eka ekiyanne header eka ena eka api ethakota
       //     //balanava meya customerda kiyala // evagema methanin ape req.user eke ena email eken thama api identify karganne me user thama
       //     //me order eka danne evgema api e ena user va order module db eketh save karagannava ethakota methanin venne login vechcha request 
       //     // body eke ena email eka pass karnava order module eke ena email ekata ethandi api ee order eka damme meya kiyala danaganna eyage 
       //     //email eka module db eke save karagtannava
   
       //     // if the user is logged in, the system already knows their email.
       //    /* {
       //         "productId": "p2345",
       //         "quantity": 2
               
       //       },
       //       {
       //           "productId" : "p12345",
       //           "quantity" : 7
       //       }
   
       //       meheama vama apita puluvan e product id ekata adala product eka thiyenavda kiyaklla pata code karala balala ita passe db eken 
       //       aran price vge deval daganna
   
   
       //       ehema euvama apta enne product id eke arrey ekk api eka methnadi thama convert karaganana oni me vidihata
   
   
       //     name": "Moisturizing Hand Cream",
       //    "price": 12.5,
       //    "quantity": 1,
       //    "image": "https://example.com/images/handcream.jpg"
       //       */
   
   
          const order = new Order(newOrderData)
            await order.save()
   
            res.status(200).json({
                message : "Order created"
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
        const getorder = await Order.find({});
        res.status(200).json({
            list : getorder
        })
        
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
    
          
// meka eka rumak avata passe last price ekai label price ekai ekata ekathuvenava dan thiyena agatayata ekathukaranava

            labeldTotal+= product.price * newOrderData.orderedItems[i].qty
// api label priice eken uda eken pennuvata api gevanne me last price eke egana dan methandi venne 
//add tocart damu okkm aitem vakla uda price eka dsaha methata last price aragena thiyenne api
            total += product.lastPrice * newOrderData.orderedItems[i].qty

            newProductArray[i] = {
                name: product.productName,

                //api last price eika gaththa mokda api qty chckout venakota okkom a ekathuva ganne mejken
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
            res.json({
                message : error.message
            });

        }
    }
            