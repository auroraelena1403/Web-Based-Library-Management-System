const productModel = require("../models/productModel")


const getBookCategory = async(req,res)=>{
    try {
        const bookCategories=await productModel.distinct("category");

        //console.log(bookCategory,"bookCat"); OK
        const selectedCategories=bookCategories.slice(0,12);
        //array to store one book from each cat
        const bookByCategory = [];

        for(const category of selectedCategories){
            const book=await productModel.findOne({category});
            if(book){
                bookByCategory.push({category,book});
            }
        }

        res.json({
            message:"12 categories of books",
            data:bookByCategory,
            success:true,
            error:false
        })


    } catch (err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
        
    }
}

module.exports=getBookCategory;