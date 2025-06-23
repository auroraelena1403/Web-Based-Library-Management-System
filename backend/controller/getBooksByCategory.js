const productModel=require("../models/productModel")

const getBooksByCategory=async(req,res)=>{
    try {
        const { category } = req?.body || req?.query;
        const book = await productModel.find({category});

        res.json({
            data : book,
            message : "Book by cat",
            success : true,
            error : false
        })
    } catch (err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
        
    }
}

module.exports=getBooksByCategory;