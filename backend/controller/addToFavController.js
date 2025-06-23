const addToFavModel = require("../models/favModel");
const bookModel = require("../models/productModel");

const addToFavController = async (req, res) => {
    try {
        const { bookId } = req?.body;
        const currentUser = req.userId;
        const book = await bookModel.findById(bookId);
        
        
        const isAvailable = await addToFavModel.findOne({ bookId ,userId: currentUser});
        if (isAvailable) {
            return res.json({
                message: "Exista deja in favorite",
                error: true,
                success: false
            })
        }

        const payload = {
            bookId: bookId,
            userId: currentUser,
        }
        const newAddToCart = new addToFavModel(payload);
        const saveProduct=await newAddToCart.save();

        return res.json({
            data:saveProduct,
            message: "Carte adaugata la favorite",
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

module.exports=addToFavController;