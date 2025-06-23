
const stripe=require('../../config/stripe');
const userModel = require('../../models/userModel');

const paymentController=async(req,res)=>{
    try {
        const {cartItems,orderType}=req.body;
        const user = await userModel.findOne({ _id : req.userId });
        const shippingOptions = orderType === "ridicare personala" ? [] : [
            {
                shipping_rate: 'shr_1R1P1WIPaK9Bh8syiHksvIl9' // Transport pentru livrare
            }
        ];
        const params = {
            submit_type : 'pay',
            mode : "payment",
            payment_method_types : ['card'],
            billing_address_collection : 'auto',
            shipping_options: shippingOptions,
            customer_email : user.email,
            metadata : {
                userId : req.userId,
                orderType: orderType
            },
            line_items : cartItems.map((item,index)=>{
                return{
                    price_data : {
                      currency : 'RON',
                      product_data : {
                        name : item.bookId.bookTitle,
                        images : item.bookId.bookImage,
                        metadata : {
                            productId : item.bookId._id
                        }
                      },
                      unit_amount : 0
                    },
                    
                    quantity : 1

                }
            }),
            success_url : `${process.env.FRONTEND_URL}/success`,
            cancel_url : `${process.env.FRONTEND_URL}/cancel`,
        }
        const session = await stripe.checkout.sessions.create(params);
        res.status(303).json(session);
        
    } catch (error) {
        res.json({
            message : error.message || error,
            error : false,
            success : false,
        })
    }
}

module.exports=paymentController;