const addToCartModel = require("../models/cartModel");
const productModel = require("../models/productModel");

const viewCart=async(req,res)=>{
    try {
        const currentUser = req.userId;
        const allProduct=await addToCartModel.find({
            userId : currentUser
        }).populate({
            path: "bookId", 
            select: "bookTitle author bookImage", 
        });
        res.json({
            data : allProduct,
            success : true,
            error : false
        })
    } catch (err) {
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}
module.exports=viewCart;