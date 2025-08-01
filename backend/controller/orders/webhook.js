const stripe = require('../../config/stripe')
const addToCartModel=require('../../models/cartModel')
const orderModel=require('../../models/orderModel')


const endpointSecret = 'whsec_edc5e7cd022a8003107c11cea6b5752afabcbd73784e9de637cb1c16f84271c2'



async function getLIneItems(lineItems){
    let ProductItems = []

    if(lineItems?.data?.length){
        for(const item of lineItems.data){
            const product = await stripe.products.retrieve(item.price.product)
            const productId = product.metadata.productId

            const productData = {
                productId : productId,
                name : product.name,
                price : 0,
                quantity : 1,
                image : product.images
            }
            ProductItems.push(productData)
        }
    }

    return ProductItems
}

const webhooks = async(request,response) => {
    const sig = request.headers['stripe-signature'];

    const payloadString = JSON.stringify(request.body)

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret : endpointSecret,
    });

    let event;

    try {
        event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }


    // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;

      const lineItems = await stripe.checkout.sessions.listLineItems(session.id)

      const productDetails = await getLIneItems(lineItems)

      const orderDetails = {
         productDetails : productDetails,
         email : session.customer_email,
         userId : session.metadata.userId,
         orderType: session.metadata.orderType,
         paymentDetails : {
            paymentId : session.payment_intent,
            payment_method_type : session.payment_method_types,
            payment_status : session.payment_status,
        },
        shipping_options : session.shipping_options.map(s => {
            return{  
                ...s,
                shipping_amount : s.shipping_amount / 100
            }
        }),
        totalAmount : session.amount_total / 100
      }

    const order = new orderModel(orderDetails)
    const saveOrder = await order.save()

    if(saveOrder?._id){
        const deleteCartItem = await addToCartModel.deleteMany({ userId : session.metadata.userId })
    }
    break;

    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

    response.status(200).send();
}

module.exports = webhooks