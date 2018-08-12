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
const messageRouter = require('./data/messages/messageRoutes');
// const Employer = require('./server/users/employer/employerModel');

const server = express();

const originUrl = process.env.NODE_ENV === 'production'
  ? 'https://rcruit.app' : 'http://localhost:3000';

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

strategies();


// routes begin
server.use('/api/employers', employerRouter);
server.use('/api/jobseekers', seekerRouter);
server.use('/api/billing', billingRouter);
server.use('/api/jobs', jobRouter);
server.use('/api/messages', messageRouter);
// routes end

module.exports = server;
