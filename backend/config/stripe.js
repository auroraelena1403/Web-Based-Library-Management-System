//https://docs.stripe.com/payments?payments=popular
//https://docs.stripe.com/get-started/development-environment

const Stripe=require('stripe');

const stripe=Stripe(process.env.STRIPE_SECRET_KEY);

module.exports=stripe;