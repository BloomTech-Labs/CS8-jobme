// node modules
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const morgan = require('morgan');
const strategies = require('./data/strategies');

// local files
const employerRouter = require('./data/users/employer/employerRoutes');
const seekerRouter = require('./data/users/seeker/seekerRoutes');
const billingRouter = require('./data/billing/routes/billingRoutes');
const jobRouter = require('./data/jobs/jobRoutes');
// const Employer = require('./server/users/employer/employerModel');

const server = express();

const originUrl = process.env.NODE_ENV === 'production'
  ? 'https:jobitduder.herokuapp.com' : 'http://localhost:3000';

const corsOptions = {
  origin: (originUrl),
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
server.use(morgan());
server.use(express.json());
server.use(cors(corsOptions));
server.use(helmet());
server.use(passport.initialize());
server.use(passport.session());
// server.use((req, res, next) => {
//   req.headers['if-none-match'] = 'no-match-for-this';
//   next();
// });

strategies();


// routes begin
server.use('/api/employers', employerRouter);
server.use('/api/jobseekers', seekerRouter);
server.use('/api/billing', billingRouter);
server.use('/api/jobs', jobRouter);
// routes end

module.exports = server;
