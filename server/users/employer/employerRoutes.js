const express = require('express');
const Employer = require('./employerModel');

const router = express.Router();

router
  .get('/', (req, res) => {
    Employer
      .find().select('-password -_id')
      .then((employers) => {
        res.status(200).json(employers)
          .catch(err => res.status(500).json(err));
      });
  });

module.exports = router;
