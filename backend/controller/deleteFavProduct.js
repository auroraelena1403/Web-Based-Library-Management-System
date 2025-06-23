const addToFavModel = require("../models/favModel");

const deleteAddToFav = async(req,res)=>{
    try{
        const currentUserId = req.userId 
        const addToCartProductId = req.body._id

        const deleteProduct = await addToFavModel.deleteOne({ _id : addToCartProductId})

        res.json({
            message : "Product Deleted From Favorites",
            error : false,
            success : true,
            data : deleteProduct
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = deleteAddToFav