const express = require('express');
const Employer = require('./employerModel');

const router = express.Router();

router
  .get('/', (req, res) => {
    Employer
      .find().select('-password -_id')
      .then((employers) => {
        res.status(200).json(employers);
      }).catch(err => res.status(500).json(err));
  })
  .post('/register', (req, res) => {
    const {
      companyName,
      companyUrl,
      industry,
      description,
      username,
      password,
      email,
    } = req.body;

    const employer = new Employer({
      companyName,
      companyUrl,
      industry,
      description,
      username,
      password,
      email,
    });

    employer
      .save()
      .then((newUser) => {
        res.status(200).json(newUser);
      }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong. That much I know for sure' });
      });
  });

module.exports = router;
