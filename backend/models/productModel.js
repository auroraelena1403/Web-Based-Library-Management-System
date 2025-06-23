const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    bookTitle: String,
    author: String,
    publisher: String,
    category: [],
    bookImage: [],
    description: String,
    inStock: Number,
    pdf:String,
},{
    timestamps:true
})

const productModel=mongoose.model("product", productSchema);

module.exports=productModel;