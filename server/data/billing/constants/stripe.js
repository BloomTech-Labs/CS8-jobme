const configureStripe = require('stripe');

const stripe = configureStripe(process.env.STRIPE_PRIVATE);

module.exports = stripe;
