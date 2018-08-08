/* eslint prefer-const: 0 */
/* eslint consistent-return: 0 */
const express = require('express');
const passport = require('passport');
const Message = require('./messageModel');
const History = require('./historyModel');
const Employer = require('../users/employer/employerModel');
const Seeker = require('../users/seeker/seekerModel');


const router = express.Router();

router
  .all('*', passport.authenticate('bearer', { session: false }))
  .get('/', (req, res) => {
    const userId = req.user._id;
    const { userType } = req.user;
    const { partnerId, jobId } = req.query;
    const partnerType = userType === 'employer'
      ? 'seeker' : 'employer';
    // find message history and populate messages, users and matchedJob
    History
      .findOne({
        $and: [
          { [partnerType]: partnerId },
          { [userType]: userId },
          { matchedJob: jobId },
        ],
      })
      .populate({
        path: 'messages matchedJob',
        select: 'createdOn titleAndSalary title body fromId toId fromModel toModel',
        populate: { path: 'from to', select: 'firstName lastName companyName' },
      })
      .then((history) => {
        // mark messages as read for userType on history document
        const userHasNew = userType === 'seeker'
          ? 'seekerHasNew' : 'employerHasNew';
        history
          .update({ [userHasNew]: false })
          .then(() => res.status(200).json(history))
          .catch(err => res.status(500).json({ message: err.message }));
      }).catch(err => res.status(500).json({ message: err.message }));
  })
  .get('/conversations', (req, res) => {
    const userId = req.user._id;
    History
      .find({ $or: [{ seeker: userId }, { employer: userId }] })
      .populate({
        path: 'matchedJob seeker employer',
        select: 'titleAndSalary firstName lastName companyName',
      })
      .then(conversations => res.status(200).json(conversations))
      .catch(err => res.status(500).json({ message: err.message }));
  })
  .post('/', (req, res) => {
    const fromId = req.user._id;
    const {
      toId, title, body, matchedJob,
    } = req.body;
    let toModel;
    let fromModel;
    let searchModel;
    // determine refs for to/from models
    if (req.user.userType === 'employer') {
      fromModel = 'Employer';
      toModel = 'Seeker';
      searchModel = Seeker;
    } else {
      fromModel = 'Seeker';
      toModel = 'Employer';
      searchModel = Employer;
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
