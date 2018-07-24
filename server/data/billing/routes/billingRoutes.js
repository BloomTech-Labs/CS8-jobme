const express = require('express');
const stripe = require('../constants/stripe');

const router = express.Router();

const postcharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    console.log(stripeErr)
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
}


router
.get('/', (req, res) => {
  res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
})
.post('/', (req, res) => {
  console.log(req.body);
  stripe.charges.create({
    amount: 100,
    currency: 'usd',
    description: 'example exchange',
    source: req.body,
  },
    postcharge(res));
});


module.exports = router;
