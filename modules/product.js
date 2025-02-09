import mongoose from "mongoose";



const productSchema = mongoose.Schema({

    productId : {
        type : String,
        require : true,
        unique : true
    },

    productName : {//me json
        type : String,
        require : true

    },

    altNames :[ //me arrey eka athule thiyena eva thama
        //api pahala json ekk dala kiyanne 
    //  //api mekaa arrey ekakata  dagannav mokda alt name kiyanne apata eka product ekkata names 5,6 thiyenna puluvan
        {
            type : String
        }
    ],

    images : [ //mekath api damma arrey ekk vidihata mokda product vbala ta multiple image thiyenna puluvn nisa
        {
            type : String
        }
    ],



    price : {
        type : Number,
        require : true
    },

    lastPrice : {
        type : Number,
        require : true
    },


    stock : {

        type : Number,
        require : true
    },

    description : {
        type : String,
        require : true
    },

    reviews : [
        {
        type :String
        }
    ]


})


const Product = mongoose.model("products",productSchema)


export default Product