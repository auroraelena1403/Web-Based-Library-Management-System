const addToFavModel = require("../models/favModel");
const productModel = require("../models/productModel");

const viewFavs=async(req,res)=>{
    try {
        const currentUser = req.userId;
        const allProduct=await addToFavModel.find({
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
module.exports=viewFavs;