const express = require('express');
const passport = require('passport');
const configureStripe = require('stripe');

const router = express.Router();
const stripe = configureStripe(process.env.STRIPE_PRIVATE);

const postcharge = (res, user, cart) => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).json({ message: stripeErr });
  } else {
    let { credits, postsAvailable } = user;
    if (cart.indexOf('100') !== -1) {
      credits += 100;
    } if (cart.indexOf('5') !== -1) {
      credits += 5;
    } if (cart.indexOf('job') !== -1) {
      postsAvailable += 1;
    }
    user.update({ credits, postsAvailable })
      .then(() => {
        res.status(200).json({ credits, postsAvailable });
      }).catch((err) => {
        res.state(500).json({ message: err.message });
      });
  }
};


router
  .all('*', passport.authenticate('bearer', { session: false }))
  .get('/', (req, res) => {
    res.json({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() });
  })
  .post('/', (req, res) => {
    const { total, source, cart } = req.body;
    stripe.charges.create({
      amount: Number(total),
      currency: 'usd',
      source,
    },
    postcharge(res, req.user, cart));
  });


module.exports = router;
