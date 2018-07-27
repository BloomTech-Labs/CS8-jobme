const configureStripe = require('stripe');

const testSecret = process.env.STRIPE_PRIVATE;

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
  ? 'sk_live_MY_SECRET_KEY'
  : testSecret;

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;
