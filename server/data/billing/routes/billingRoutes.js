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
  const { total, source } = req.body
  stripe.charges.create({
    amount: Number(total),
    currency: 'usd',
    source,
  },
    postcharge(res));
});


module.exports = router;
