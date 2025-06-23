const mongoose=require('mongoose');
const product=require('../models/productModel')

const addToCart=mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
    userId:String,
},{
    timestamps:true
})

const addToCartModel=mongoose.model("addToCart", addToCart);

module.exports=addToCartModel;