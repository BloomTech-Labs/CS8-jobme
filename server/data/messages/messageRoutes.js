/* eslint prefer-const: 0 */
/* eslint consistent-return: 0 */
const express = require('express');
const passport = require('passport');
const Message = require('./messageModel');


const router = express.Router();

router
  .all('*', passport.authenticate('bearer', { session: false }))
  .get('/', (req, res) => {
    const userId = req.user._id;
    const { partnerId, page, results } = req.query;
    Message
      .find({
        $or: [
          { $and: [{ toId: userId }, { fromId: partnerId }] },
          { $and: [{ toId: partnerId }, { fromId: userId }] },
        ],
      })
      .limit(Number(results))
      .populate({ path: 'to from', select: 'firstName lastName companyName' })
      .then(messages => res.status(200).json({ messages }))
      .catch(err => res.status(500).json({ message: err.message }));
  })
  .get('/sent', (req, res) => {
    const userId = req.user._id;
    const { page, results } = req.query;
    Message
      .find({ fromId: userId })
      .limit(Number(results))
      .populate({ path: 'to from', select: 'firstName lastName companyName' })
      .then(messages => res.status(200).json({ messages }))
      .catch(err => res.status(500).json({ message: err.message }));
  })
  .get('/received', (req, res) => {
    const userId = req.user._id;
    const { page, results } = req.query;
    Message
      .find({ toId: userId })
      .limit(Number(results))
      .populate({ path: 'from to', select: 'firstName lastName companyName' })
      .then(messages => res.status(200).json({ messages }))
      .catch(err => res.status(500).json({ message: err.message }));
  })
  .post('/', (req, res) => {
    const fromId = req.user._id;
    const {
      toId, title, body, matchedJob,
    } = req.body;
    let toModel;
    let fromModel;
    // determine refs for to/from models
    if (req.user.userType === 'employer') {
      fromModel = 'Employer';
      toModel = 'Seeker';
    } else {
      fromModel = 'Seeker';
      toModel = 'Employer';
    }
    const message = new Message({
      fromId,
      toId,
      fromModel,
      toModel,
      title,
      body,
      matchedJob,
    });
    message
      .save()
      .then((savedMessage) => {
        res.status(200).json(savedMessage);
      })
      .catch(err => res.status(500).json({ message: err.message }));
  });

module.exports = router;
