const express=require('express');

const router=express.Router();

const userSignUpController=require('../controller/userSignUp');
const userSignInController = require('../controller/userSignIn');
const userDetailsController = require('../controller/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/userLogout');
const allUsers = require('../controller/AllUsers');
const updateUser = require('../controller/UpdateUser');
const uploadProductController = require('../controller/uploadProduct');
const getBookController = require('../controller/getBook');
const updateBookController = require('../controller/updateBook');
const getBookCategory = require('../controller/getBookCategory');
const getBooksByCategory = require('../controller/getBooksByCategory');
const getBookDetails = require('../controller/getBookDetails');
const addToCartController = require('../controller/addToCartController');
const countAddToCart = require('../controller/countAddToCart');
const viewCart = require('../controller/viewCart');
const deleteAddToCartProduct = require('../controller/deleteCartProduct');
const searchProduct = require('../controller/searchBook');
const paymentController = require('../controller/orders/paymentController');
const webhooks = require('../controller/orders/webhook');
const orderController = require('../controller/orders/orderController');
const allOrdersController = require('../controller/orders/allOrdersController');
const addToFavController = require('../controller/addToFavController');
const viewFavs = require('../controller/viewFavs');
const deleteAddToFav = require('../controller/deleteFavProduct');
const filterProductController = require('../controller/filters');

router.post("/sign-up", userSignUpController);
router.post("/sign-in", userSignInController);
router.get("/user-details",authToken, userDetailsController);
router.get("/userLogout", userLogout);

//admin panel
router.get("/all-users",authToken, allUsers);
router.post("/update-user", authToken,updateUser);

//books
router.post("/upload-book",authToken,uploadProductController);
router.get("/get-book", getBookController);
router.post("/update-book",authToken,updateBookController);
router.get("/get-category", getBookCategory);
router.post("/get-books-by-category", getBooksByCategory);
router.post("/book-details",getBookDetails);
router.get("/search",searchProduct);
router.post("/filter-product",filterProductController);


//add to cart
router.post("/addToCart", authToken,addToCartController);
router.get("/countAddToCart",authToken, countAddToCart);
router.get("/view-cart",authToken, viewCart);
router.post("/delete-cart-product", authToken,deleteAddToCartProduct);

//add to favs
router.post("/addToFav", authToken,addToFavController);
router.get("/view-favs",authToken, viewFavs);
router.post("/delete-fav-product", authToken,deleteAddToFav);

//payment and orders

router.post("/checkout",authToken,paymentController);
router.post("/webhook",webhooks);
router.get("/orders",authToken,orderController);
router.get("/adminOrders", authToken, allOrdersController);


module.exports=router;