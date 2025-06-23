const mongoose=require('mongoose');
const product=require('../models/productModel')

const addToFav=mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
    userId:String,
},{
    timestamps:true
})

const addToFavModel=mongoose.model("addToFav", addToFav);

module.exports=addToFavModel;