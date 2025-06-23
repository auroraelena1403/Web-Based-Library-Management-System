const productModel = require("../models/productModel")


const getBookController=async (req,res)=>{
    try {

        const allBooks=await productModel.find().sort({createdAt:-1});

        res.json({
            message:"All books",
            success:true,
            error:false,
            data:allBooks
        })
        
    } catch (err) {
        res.status(400).json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}

module.exports=getBookController;