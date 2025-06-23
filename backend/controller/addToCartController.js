const addToCartModel = require("../models/cartModel");
const bookModel = require("../models/productModel");

const addToCartController = async (req, res) => {
    try {
        const { bookId } = req?.body;
        const currentUser = req.userId;
        const book = await bookModel.findById(bookId);
        if (book.inStock <= 0) {
            return res.json({
                message: "Out of stock",
                error: true,
                success: false
            });
        }
        
        const isAvailable = await addToCartModel.findOne({ bookId ,userId: currentUser});
        if (isAvailable) {
            return res.json({
                message: "Already in cart",
                error: true,
                success: false
            })
        }

        const payload = {
            bookId: bookId,
            userId: currentUser,
        }
        const newAddToCart = new addToCartModel(payload);
        const saveProduct=await newAddToCart.save();

        return res.json({
            data:saveProduct,
            message: "Book added",
            error: false,
            success: true
        })

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
}

module.exports=addToCartController;