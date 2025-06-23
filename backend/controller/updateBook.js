

//const uploadProductPermission = require('../../helpers/permission')
//const productModel = require('../../models/productModel')
const uploadProductPermission = require('../helpers/permission')
const productModel = require('../models/productModel')

async function updateBookController(req,res){
    try{

        if(!uploadProductPermission(req.userId)){
            throw new Error("Permission denied")
        }

        const { _id, ...resBody} = req.body

        const updateBook = await productModel.findByIdAndUpdate(_id,resBody)
        
        res.json({
            message : "Book updated successfully",
            data : updateBook,
            success : true,
            error : false
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}


module.exports = updateBookController