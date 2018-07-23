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
const jobRouter = require('./data/jobs/jobRoutes');
// const Employer = require('./server/users/employer/employerModel');

const server = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'https://jobitduder.herokuapp.com'],
  credentials: true,
  methods: ['GET', 'PUT', 'POST'],
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
server.use('/api/seekers', seekerRouter);
server.use('/api/jobs', jobRouter);
// routes end

module.exports = server;
